const Post = require('../models/postModel');

exports.createPost = async (req, res) => {
    try {
        const {title, body} = req.body;
        //.////// post model creation
        const post = new Post({
            title, body
        })
        const savedPost = await post.save();
        // const response = await Post.create({title, body}); //can also be done like this
        ////////
        res.json({
            post: savedPost
        });
    }
    catch (err) {
        return res.status(400).json({
            error: "Error while creating post"
        });
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
                        // .populate('likes')
                        // .populate('comments')
                        // .exec();
        res.json({
            post: posts
        });
    }
    catch (err) {
        return res.status(400).json({
            error: "Error while fetching all posts"
        });
    }
}