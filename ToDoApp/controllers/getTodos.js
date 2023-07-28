// import model
const Todo = require('../models/Todo');

// define route handler
exports.getTodos = async (req, res) => {
    try {
        // fetch all todo items from the database
        const todos =  await Todo.find({});

        // send response
        res.status(200)
        .json({
            success: true,
            data: todos,
            message: 'Entire todo has been fetched successfully'
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

exports.getTodoById = async (req, res) => {
    try {
        // extract todo items based on id
        const id = req.params.id;
        const todo = await Todo.findById({_id: id});

        // data for given id not found:
        if (!todo) {
            // basically this if block isn't needed cuz while executing
            // the above findById statement, if there is no data found,
            // control flow will automatically go into catch block
            return res.status(404).json({
                success: false,
                message: `No data found for the given id - ${id}`
            })
        }
        // if data for given id found:
        res.status(200).json({
            success: true,
            data: todo,
            message: `Todo data for id - ${id} successfully fetched`
        })
    }
    catch (err) {
        console.error(err);
        return res.status(500)
        .json({
            success: false,
            error: 'Internal Server Error',
            message: err.message
        })
    }
}