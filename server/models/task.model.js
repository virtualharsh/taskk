const mongoose = require("mongoose");

const STATUS = {
    ACTIVE: 1,
    TRASHED: 0,
    DELETED: -1,
};

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String },
        user: { type: String, required: true }, // creator's ID or username

        collaborators: [{ type: String, default:[]}] ,

        status: {
            type: Number,
            enum: [STATUS.DELETED, STATUS.TRASHED, STATUS.ACTIVE],
            default: STATUS.ACTIVE,
            required: true
        },

        favorite:{
            type:Boolean,
            default:false,
        }
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = { Task, STATUS };
