# Mini Projeto Twitter Clone

Mini simulação do Twitter Original.


Servidor local rodando na porta 3333.


Cliente local rodando na porta 3000.



Criar arquivo .env na raiz do Server contendo as seguintes variáveis de ambiente:

```
NODE_ENV=development ou production
DB_URL= caminho pro mongodb no atlas
JWT_SECRET= senha secreta que fica no server para decodificar token jwt
CORS_ORIGIN=endereço pra aceitar requisições (http://localhost:3000)
```

Na raiz do Cliente deve haver arquivo .env contendo:


REACT_APP_SERVER_URL= caminho do Server (http://localhost:3333)


Criar conta no Atlas do MongoDB. Copiar String de Conexão:
mongodb+srv://user:password@cluster0-jhonq.mongodb.net/twitter?retryWrites=true&w=majority
substituir user, password, e banco para twitter

Rodar o Server.
Rodar o Client.

tetigo@gmail.com
