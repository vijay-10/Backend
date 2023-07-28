const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    },
    url: {
        type: String,
    }
});

// post middleware: invoked just post(after) the action on schema
fileSchema.post('save', async function (doc){
    // doc arg in function is the document thats gonna be saved in the db
    try {

        // transporter (beter way is to define this in config section)
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        // send mail
        let info = await transporter.sendMail({
            from: 'VJ',
            to: doc.email,
            subject: 'New File Uploaded on Cloudinary',
            html: `<h2>Hello buddy!</h2> <p>File Uploaded.</p> <p>View Here: <a href=${doc.url}>${doc.url}</a></p>`
        })
        console.log('info ', info);

    }
    catch (err) {
        console.error(err);
    }
})

const File = mongoose.model('File', fileSchema);
module.exports = File;