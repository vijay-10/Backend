const vision = require('@google-cloud/vision');
const express = require('express');
const app = express();

const CREDENTIALS = require('./doc-recognition-393406-75eece193880.json');

const CONFIG = {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email
    }
};

const client = new vision.ImageAnnotatorClient(CONFIG);

const detectText = async (file_path) => {
    let [result] = await client.textDetection(file_path);
    app.get('/', (req, res) => {
        res.send(result);
    })
    app.listen(3000)
    return result;
};

let result = detectText('./certificate.png');
