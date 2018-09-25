const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The Comments Model
var commentsModel = new Schema({
    blog_id: {
        type: Schema.Types.ObjectId,
        ref: "blogModel"
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "userModel"
    },
    comment: {
        type: String,
        default: ""
    },
    date_created: {
        type: Date
    }
});

module.exports = mongoose.model("commentsModel", commentsModel, "commentsModel");
