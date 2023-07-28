const mongoose = require('mongoose');
require('dotenv').config()

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("DB Connection Successful"))
    .catch((err) => {
        console.log("Error connecting with DB");
        console.error(err);
        process.exit(1);
    });
}