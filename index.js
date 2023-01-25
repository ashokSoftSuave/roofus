const express = require("express");
const app = express();
const cors = require('cors')
const helmet = require('helmet');


app.use(cors());

app.use(express.json({ limit: "10kb" }));

app.use(helmet());

module.exports = app;
