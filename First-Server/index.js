const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import express from 'express';
const app = express();
app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/wikiDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => {console.log("Connection Successful");})
// .catch(() => {console.log("Received an Error");});
////////////////////////////////////////////////////////
async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');
    }
    main()
    .then(() => {console.log("Successful")})
    .catch(err => console.log(err));
////////////////////////////////////////////////////////
// async function main() {
//     try {
//         await mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');
//         console.log("Successful")
//     }
//     catch (err) {
//         console.log(err)
//     }
// }
// main()


app.get('/', (req, res) => {
    res.send('Welcome');
})

app.post('/api/data', (req, res) => {
    const {name, brand} = req.body;
    console.log(name, brand);
    res.send('Car submitted successfully');
})


app.listen(8000, () => {
    console.log('Server listening on port 3000');
});
