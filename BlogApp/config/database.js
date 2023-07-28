const mongoose = require('mongoose');

// loads configuration in .env to process object
require('dotenv').config();

const connectWithDb = async () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("DB connection established"))
    .catch( (error) => {
        console.log("Error connecting to database");
        console.error(error);
        process.exit(1);
    })
}

module.exports = connectWithDb;