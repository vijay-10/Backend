const Post = require('../models/postModel');
const Like = require('../models/likeModel');

exports.likePost = async (req, res) => {
    try {
        // fetch data from req body
        const {post, user} = req.body;
        // create a like object
        const like = new Like({
            post, user
        });
        // save the new comment in the database
        const savedLike = await like.save()

        // find the post ID, add the new comment to its comment array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new: true})
                            .populate('likes') // populate the likes array with like documment
                            .exec(); //  without populating, the likes array will only contain likes ids
        res.json({
            post: updatedPost
        })
    }
    catch (err) {
        return res.status(500).json({
            error: "Error while liking post"
        });
    }
}

exports.unlikePost = async (req, res) => {
    try {
        // like to delete like docuument, post to delete like from likes array of post
        const {post, like} = req.body;
        // const deletedLike = await Like.findOneAndDelete({post: post, _id: like}); //delete post with post id = post and like id = like
        const deletedLike = await Like.findOneAndDelete({_id: like}); // delete post with like id = like. Both above & this do the same job
        
        // update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id}}, {new: true})
                            .populate('likes') // populate the likes array with like documment
                            .exec(); //  without populating, the likes array will only contain likes ids
        res.json({
            post: updatedPost
        })         
    }
    catch (err) {
        return res.status(500).json({
            error: "Error while unliking post"
        });
    }
}