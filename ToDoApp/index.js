const express = require('express');
const app = express();

// load config from env file
// i. npm i dotenv
// require('dotenv').config();
require('dotenv').config();
const PORT = process.env.PORT || 4000;

// middleware to parse json request body
app.use(express.json());


// import routes for TODO API
const todoRoutes = require('./routes/todos');
// mount the todo API routes
app.use('/api/v1', todoRoutes);
// app.use('api/v1', todoRoutes); //i wasted almost 1hr on this error 'app/v1', not putting / in start 😭


app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});

// connect to the databse
const dbConnect = require('./config/database');
dbConnect();

// default route
app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1>')
});