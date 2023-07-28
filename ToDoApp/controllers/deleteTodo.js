// import model
const Todo = require('../models/Todo');

exports.deleteTodo = async (req, res) => {
    try {
        // extract todo items based on id
        // const id = req.params.id;
        const {id} = req.params;

        // can be done in both ways
        await Todo.findByIdAndDelete(id); //1
        // await Todo.findByIdAndDelete({_id: id}); //2
        
        res.status(200)
        .json({
            success: true,
            message: 'Todo successfully deleted'
        })

    }
    catch (err) {
        console.error(err);
        res.status(500)
        .json({
            success: false,
            error: 'Internal Server Error',
            message: err.message
        })
    }
}