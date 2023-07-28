const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const blog = require('./routes/blog');
// mount routes
app.use('/api/v1', blog);

const connectWithDb = require('./config/database');
connectWithDb();

app.listen(PORT, () => {
    console.log('App started on port no. ' + PORT);
})
// app.listen(PORT)
// .then( () => {
//     console.log('App started on port no. ' + PORT);
// })

app.get('/', (req, res) => {
    res.send("Welcome");
})