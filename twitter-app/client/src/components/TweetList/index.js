import React from "react";

import { Container } from "./styles";
import Tweet from '../../components/Tweet'

export default function TweetList(props) {
  return (
    <Container>
      <ul>
        {props.tweets.reverse().map((tweet, index) => (
          // <li key={index}>{tweet.content}</li>
          <Tweet  key={index}
                  tweetId={tweet._id}
                  owner={tweet.owner}
                  content={tweet.content}
                  likes={tweet.likes}
                  username={tweet.username}  
                  onLike={props.onLike}
          />
        ))}
      </ul>
    </Container>
  );
}