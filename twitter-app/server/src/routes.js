const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authenticate = require("./auth");
const User = require("./models/user");
const Tweet = require("./models/tweet");

const router = new Router();

router.get("/", authenticate, (_, res) => {
  return res.send('Funcionando...');
});

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const userExists = await User.findOne({ username });

    if (userExists)
      return res.status(400).send({ error: "Username already in use." });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      password: hash
    });
    return res.status(201).send({
      id: user.id,
      username: user.username
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(400).send({ error: "Username not found" });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(400).send({ error: "Invalid Password" });

    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);

    return res.header("auth-token", token).send({token});
  } catch (err) {
    res.status(400);
    next(err);
  }
});

router.post("/tweets", authenticate, async (req, res, next) => {
  const { content } = req.body;
  try {
    const tweet = await Tweet.create({ owner: req.user, content });
    if (!tweet) res.status(400).send({ error: "Unable to create tweet" });
    return res.status(201).send(tweet);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

router.delete("/tweets/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  try {
    await Tweet.deleteOne(id);
    return res.status(200).send({ message: "Tweet deleted" });
  } catch (error) {
    res.status(400);
    next(error);
  }
});

router.put("/tweets/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  try {
    const tweet = await Tweet.findById(id);
    if (!tweet){
      return res.status(400).send({ error: "Tweet not found" });
    } 
   
    // if (tweet.owner == req.user._id){
    //   return res.status(400).send({ error: "Unable to update tweet" });
    // }
   
    if (tweet.likes == undefined) {
      tweet.likes = [];
    }

    const tweetAlreadyLiked = tweet.likes.some(like => like == req.user._id);

    if (tweetAlreadyLiked) {
      tweet.likes = tweet.likes.filter(like => like != req.user._id);
    } else {
      tweet.likes.push(req.user._id);
    }

    tweet.save();
    return res.status(200).send(tweet);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

router.get("/users", authenticate, async (_, res, next) => {
  try {
    const users = await User.find({});
    if (!users.length)
      return res.status(400).send({ error: "Unable to get users" });
    return res.status(200).send(
      users.map(user => ({
        _id: user._id,
        username: user.username
      }))
    );
  } catch (error) {
    res.status(400);
    next(error);
  }
});

router.get("/tweets", authenticate, async (req, res, next) => {
  try {
    const tweets = await Tweet.find({});
    return res.status(200).send(tweets);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

router.get("/tweets/:id", authenticate, (req, res, next) => {
  const { id } = req.params;
  try {
    const tweet = Tweet.findById(id);
    if (!tweet) return res.status(400).send({ error: "Tweet not found" });
    return res.status(200).send(tweet);
  } catch (error) {
    res.status(400);
    next(error);
  }
});


module.exports = router;
