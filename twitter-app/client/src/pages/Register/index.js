import React, {useState} from "react";
import {useHistory} from 'react-router-dom'
import { Container, Content, Input, Button, ErrorWarning } from "./styles";
import Layout from "../../components/Layout";
import axios from "axios";

export default function Register() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const history = useHistory()

  const handleRegister = async e => {
    const url = `${process.env.REACT_APP_SERVER_URL}/register`

    e.preventDefault()
    if(!username || !password) return
    try {
      const test = await axios.post(url, {username, password})
      // console.log(test)
      return history.push('/')
    } catch (error) {
      console.error(error)
      setError("Nome de usuário já existe")
      setUsername('')
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
          <Input type="password" required
                  value={password}
                  onChange={e=>setPassword(e.target.value)}/>
        </div>

        <div>
          <a href="/">Cancelar</a>
          <Button type="submit" onClick={handleRegister}>Registrar</Button>
        </div>
      </Content>
    </Container>
    </Layout>
  );
}