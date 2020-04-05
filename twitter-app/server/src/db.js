require('dotenv').config()

const mongoose = require("mongoose");

mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log("Connected to the Database")
);

