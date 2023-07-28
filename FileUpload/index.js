// app create
const express = require('express');
const app = express();

// PORT find
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// add middleware
app.use(express.json());
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// connect db
require('./config/database').connect();

// connect with cloud
require('./config/cloudinary').cloudinaryConnect();

// mount api routes
const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload', Upload)

// activate server
app.listen(PORT, () => {
    console.log('server listening on port ',PORT);
});