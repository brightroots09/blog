const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The Blog Model
var blogModel = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "userModel"
    },
    title: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    date_created: {
        type: Date
    }
});

module.exports = mongoose.model("blogModel", blogModel, "blogModel");
