import React, {useState} from 'react'
import axios from 'axios'
import {Container} from './styles'

export default function TweetForm(){
  const [text, setText] = useState('')

  const handleTweet = async event =>{
    event.preventDefault()
    try {
      const token = await localStorage.getItem('SESSION_TOKEN')
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/tweets`,
        {content: text},
        {headers: {'auth_token': token}}
      )
      setText('')
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <Container>
      <textarea required 
                placeholder="O que vc está pensando?"
                value={text} 
                onChange={e=>setText(e.target.value)}
                rows={4} />
      <div>
        <button onClick={handleTweet}>Enviar</button>
      </div>
    </Container>
  )
}
