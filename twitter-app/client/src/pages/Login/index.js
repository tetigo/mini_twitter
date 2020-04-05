import React, { useState } from "react";
import axios from 'axios'
import Layout from "../../components/Layout";
import {Container, Content, Input, Button, ErrorWarning} from './styles'
import {useHistory} from 'react-router-dom'
import jwt from 'jsonwebtoken'

export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const history = useHistory()

  // console.log(username, password)
  // console.log('tigo_url===>>',process.env.REACT_APP_SERVER_URL)
  const handleLogin = async event => {
    const login = `${process.env.REACT_APP_SERVER_URL}/login`
    event.preventDefault()
    // console.log({username, password})
    // console.log(login)
    if(!username || !password) return

    try {
      const resp = await axios.post(login, {username, password})
      console.log(jwt.decode(resp.data.token))
      localStorage.setItem('SESSION_TOKEN', resp.data.token)
      // console.log(resp)
      return history.push('/home')
    } catch (error) {
      console.error(error)
      if(error.response.status === 404){
        setError('Nome de usuário não encontrado')
      }else if(error.response.status === 400){
        setError('Senha incorreta')
      }
      setPassword('')
    }
  }

  return (
    <Layout>
      <Container>
        <Content>
          {error && <ErrorWarning>{error}</ErrorWarning>}
          <div>
            <label>Nome do usuário</label>
            <Input  type="text" required
                    value={username}
                    onChange={e=>setUsername(e.target.value)} />
          </div>
          <div>
            <label>Senha</label>
            <Input  type="password" required
                    value={password}
                    onChange={e=>setPassword(e.target.value)}/>
          </div>

          <div>
            <a href="/register">Criar conta</a>
            <Button onClick={handleLogin} type="submit">Entrar</Button>
          </div>
        </Content>
      </Container>
    </Layout>
  );
}
