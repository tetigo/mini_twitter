import React, { useState, useEffect } from "react";
import axios from "axios";

import TweetForm from "../../components/TweetForm";
import TweetList from "../../components/TweetList";
import Layout from "../../components/Layout";

export default function Home() {
    
  const [tweets, setTweets] = useState([])
  
  useEffect(()=>{
    const url=`${process.env.REACT_APP_SERVER_URL}/tweets`
    const url2=`${process.env.REACT_APP_SERVER_URL}/users`
    const token = localStorage.getItem('SESSION_TOKEN')
    const auth = {headers:{'auth_token': token}}

    const teste = async () =>{
      let resp = []
      let resp2 = []
      try {
        resp = await axios.get(url, auth)
        resp2 = await axios.get(url2, auth)
      } catch (error) {
        console.log(error)
      }
      const tweetss = resp.data.map(t=>{
        const u = resp2.data.filter(us => us._id == t.owner)[0]
        return {...t, username: u.username}
      })
      setTweets(tweetss)
      console.log(tweets)
    }
    teste()
  },[])
  

  const handleLike = (ownerID, tweetID) => {
    console.log(ownerID, tweetID);

    const newTweets = tweets.map(tweet => {
      if (tweet._id === tweetID) {
        const tweetLiked = tweet.likes.find(owner => owner === ownerID);

        if (tweetLiked) {
          return {
            ...tweet,
            likes: tweet.likes.filter(owner => owner !== ownerID)
          };
        }
        return { ...tweet, likes: [...tweet.likes, ownerID] };
      }
      return tweet;
    });

    setTweets(newTweets.reverse());
  };

  return (
    <Layout>
    <TweetList tweets={tweets} onLike={handleLike}/>
    <TweetForm />
    </Layout>
  );
}