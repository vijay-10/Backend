const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

exports.createComment = async (req, res) => {
    try {
        // fetch data from req body
        const {post, user, body} = req.body;
        // create a comment object
        const comment = new Comment({
            post, user, body
        });
        // save the new comment in the database
        const savedComment = await comment.save()

        // find the post ID, add the new comment to its comment array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id}}, {new: true})
                            .populate('comments') // populate the comments array with comment documment
                            .exec(); //  without populating, the comments array will only contain comments ids
        res.json({
            post: updatedPost
        })
    }
    catch (err) {
        return res.status(500).json({
            error: "Error while creating comment"
        });
    }
}