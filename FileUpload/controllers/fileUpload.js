const File = require("../models/File");
const cloudinary = require('cloudinary').v2;

//localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
    try {
        //fetch filefrom request
        const file = req.files.file;
        console.log("FILE DEAILS -> ",file);

        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path)

        //add path to the move fucntion
        file.mv(path , (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message:'Local File Uploaded Successfully',
        });

    }
    catch(error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality=100) {
    const options = {folder, quality};
    // if (quality) options.quality = quality;
    options.resource_type = 'auto';
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try {
        // data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        // imageFile is the key
        const file = req.files.imageFile;

        // validate
        const supportedTypes = ['jpg', 'jpeg', 'png'];
        const fileType = file.name.split('.')[1].toLowerCase();
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid file type'
            })
        }
        
        // save entry on cloudinary
        const response = await uploadFileToCloudinary(file, "vjUploads");
        console.log(response);
        
        // save entry on database
        const fileData = await File.create({
            name, tags, email, url: response.secure_url
        })
        
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image successfully uploaded'
        })
        
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}

exports.videoUpload = async (req, res) => {
    try {
        // data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);
        
        const file = req.files.videoFile;
        
        // validate
        const supportedTypes = ['mp4', 'mkv', 'mov'];
        const fileType = file.name.split('.')[1].toLowerCase();
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid file type'
            })
        }
        
        // save entry on cloudinary
        const response = await uploadFileToCloudinary(file, "vjUploads");
        console.log(response);
        
        // save entry on database
        const fileData = await File.create({
            name, tags, email, url: response.secure_url
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Video successfully uploaded'
        })
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}

exports.imageSizeReducer = async (req, res) => {
    try {
        // data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        // imageFile is the key
        const file = req.files.imageFile;

        // validate
        const supportedTypes = ['jpg', 'jpeg', 'png'];
        const fileType = file.name.split('.')[1].toLowerCase();
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid file type'
            })
        }
        
        // save entry on cloudinary
        const response = await uploadFileToCloudinary(file, "vjUploads", 10);
        console.log(response);
        
        // save entry on database
        const fileData = await File.create({
            name, tags, email, url: response.secure_url
        })
        
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image successfully uploaded'
        })
        
    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}