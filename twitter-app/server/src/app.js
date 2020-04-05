const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require('dotenv').config()

const PORT = 3333;
const db = require('./db')
const router = require('./routes')
const middlewares = require('./middlewares')

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(morgan("common"));

app.use(router)

app.use(middlewares.notFound)
app.use(middlewares.errorHandling)

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
