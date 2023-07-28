const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());

require('./config/database')();
// if exports.functionName = () => {body}
// then functionName is imported via distructuring: const {functionName} = require('path/...')
// Note: In case of object destructuring, variable name while importing should be same as name in the object (functionName)
// if module.exports = functionName
// then functionName can be imported as a default export: const functionName = require('path/...')
 
const user = require('./routes/user');
app.use('/api/v1', user);

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});