require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoDB = require('./db/db');
const cors = require('cors');

app.get('/try', (req, res)=> {
res.send("Try Successfull")})
app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/CreateUser'))
app.use('/api', require('./routes/DisplayData'))
app.use('/api', require('./routes/OrderData'))
app.use('/api', require('./routes/Contact'))
app.use('/api', require('./routes/CreateAdmin'))

app.listen(PORT, ()=> {
    console.log(`Server listening to port ${PORT}`)
})
