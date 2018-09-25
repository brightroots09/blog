const jwt = require("jsonwebtoken");


exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.userProfile = userProfile;

exports.getBlogs = getBlogs;
exports.myBlogs = myBlogs;
exports.getBlog = getBlog;
exports.addBlog = addBlog;
exports.editBlog = editBlog;
exports.removeBlog = removeBlog;

exports.addComment = addComment;
exports.getComments = getComments;
exports.removeComment = removeComment;


// register function
function registerUser(db, condition, cb) {
    let model = new db();
    let date = new Date();

    model.email = condition.email;
    model.profile.name = condition.name;
    model.password = condition.password;
    model.date_created = date;

    db.findOne({ email: condition.email }, function (error, exists) {
        if (error) callback(error);
        if (exists) cb(null, "Email Already Exists");
        else {
            model.save(function (error, result) {
                if (error) callback(error);
                else {
                    cb(null, result)
                }
            })
        }
    })
}

// login function
function loginUser(db, condition, cb) {
    console.log(condition)
    db.findOne({ email: condition.email }, function (error, user) {
        if (error) cb(error)
        if (!user) {
            return cb(null, "No User")
        }

        if (!user.comparePassword(condition.password)) {
            return cb(null, "Wrong Password")
        }

        else {
            let payload = { subject: user._id }
            let token = jwt.sign(payload, "secretKey")
            console.log(token)
            return cb(null, {
                user: user,
                token: token
            })
        }

    })
}

// profile function
function userProfile(db, condition, cb) {
    db
        .findById({ _id: condition.id })
        .exec(function (error, result) {
            if (error) return cb(error)
            else {
                return cb(null, result)
            }
        })
}

//all blogs function
function getBlogs(blogModel, userModel, cb) {
    blogModel
        .find({})
        .populate({path: "user_id", model: userModel})
        .exec(function (error, result) {
            if (error) cb(error)
            else {
                cb(null, result)
            }
        })
}

//my blogs function
function myBlogs(blogModel, condition, cb) {
    blogModel
        .find({user_id: condition.user_id})
        .exec(function (error, result) {
            if (error) cb(error)
            else {
                cb(null, result)
            }
        })
}

//blog details
function getBlog(blogModel, id, userModel, cb){
    blogModel
        .findById({_id: id})
        .populate({path: "user_id", model: userModel})
        .exec(function(error, result){
            if(error) cb(error)
            else{
                cb(null, result)
            }
        })
}

//add blogs function
function addBlog(db, condition, cb) {
    let model = new db();
    let date = new Date();

    model.user_id = condition.user_id;
    model.title = condition.title;
    model.description = condition.description;
    model.date_created = date;

    model.save(function (error, result) {
        if (error) cb(error)
        else {
            cb(null, result)
        }
    })

}

// edit blog function
function editBlog(db, condition, cb){
    let obj = {
        title: condition.title,
        description: condition.description
    }
    db
        .findByIdAndUpdate({_id: condition.blog_id}, { $set: obj })
        .exec(function(error, result){
            if(error){
                cb(error)
            }
            else{
                cb(null, result)
            }
        })
}

// delete blog function
function removeBlog(db, id, cb){
    db
        .deleteOne({_id: id})
        .exec(function(error, result){
            if(error) cb(error)
            else{
                cb(null, result)
            }
        })
}

// add comment function
function addComment(db, condition, cb) {
    let model = new db();
    let date = new Date();
    model.blog_id = condition.blog_id;
    model.user_id = condition.user_id;
    model.comment = condition.comment;
    model.date_created = date;
    model.save(function(error, result){
        if(error) cb(error)
        else{
            cb(null, result)
        }
    })

}

function getComments(commentModel, userModel, id, cb){
    commentModel
        .find({blog_id: id})
        .populate({path: "user_id", model: userModel})
        .exec(function(error, result){
            if(error) cb(error)
            else{
                cb(null, result)
            }
        })
}

function removeComment(db, condition, cb){
    db
        .deleteOne({_id: condition.comment_id})
        .exec(function(error, result){
            if(error) cb(error)
            else{
                cb(null, result)
            }
        })
}