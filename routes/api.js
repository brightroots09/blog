const express = require("express");
const router = express.Router();

const path = require("path");

const moment = require("moment");

const commonFunction = require("../services/common_functions");
const mongoose = require("mongoose");
const async = require("async")
const jwt = require("jsonwebtoken");

// Models
const userModel = require("../models/userModel");
const blogModel = require("../models/blogModel");
const commentModel = require("../models/commentsModel");


/**
 * --------------------------
 * MIDDLEWARE TO VERIFY TOKEN
 * --------------------------
 */
function verifyToken(req, res, callback) {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized Request")
    }
    let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
    if (token === 'null') {
        return res.status(401).send('Unauthorized Request')
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send('Unauthorized Request')
    }
    req.userId = payload.subject;
    callback()
}

/**
 * --------------
 * resgiter route
 * --------------
 */

router.post("/register", function (req, res, callback) {
    let condition = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    }

    commonFunction.registerUser(userModel, condition, function (error, result) {
        if (error) callback(error)
        else {
            res.json(result)
        }
    })

})

/*
* -----------
* login route
* -----------
* */
router.post("/login", function (req, res, callback) {
    let condition = {
        email: req.body.email,
        password: req.body.password
    }
    commonFunction.loginUser(userModel, condition, function (error, result) {
        if (error) callback(error)
        else {
            res.json(result)
        }
    })
});


/*
* -------------
* profile route
* -------------
* */
router.get("/profile", verifyToken, function (req, res, callback) {
    let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
    let payload = jwt.verify(token, 'secretKey');
    let condition = {
        id: payload.subject
    };

    commonFunction.userProfile(userModel, condition, function (error, result) {
        if (error) callback(error)
        else {
            res.json(result)
        }
    })

});


/**
 * --------------
 * my blogs route
 * --------------
 */

router.get("/myBlogs", verifyToken, function(req, res, callback){
    let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
    let payload = jwt.verify(token, 'secretKey');

    let condition = {
        user_id: payload.subject
    }

    commonFunction.myBlogs(blogModel, condition, function(error, result){
        if(error) callback(error)
        else{
            res.json(result)
        }
    })
 })

/**
 * ---------------
 * all blogs route
 * ---------------
 */

router.get("/blogs", function (req, res, callback) {
    let asyncTasks = []

    asyncTasks.push(getBlogs.bind(null))

    async.parallel(asyncTasks, function(error, result){
        if(error) callback(error)
        else{
            res.json(result)
        }
    })

    function getBlogs(cb){
        commonFunction.getBlogs(blogModel, userModel, function (error, blogs) {
            if (error) callback(error)
            else {
                cb(null, blogs)
            }
        })
    }

})

/**
 * ------------------
 * blog details route
 * ------------------
 */

 router.get("/blog/:id", function(req, res, callback){
    let asyncTasks = []
     
    asyncTasks.push(blogDetails.bind(null, req.params.id))
    asyncTasks.push(blogComments.bind(null, req.params.id))

    async.parallel(asyncTasks, function(error, result){
        if(error) callback(error)
        else{
            res.json(result)
        }
    })

    function blogDetails(id, cb){
        commonFunction.getBlog(blogModel, id, userModel, function(error, result){
            if(error) cb(error)
            else{
                cb(null, result)
            }
        })
    }

    function blogComments(id, cb){
        commonFunction.getComments(commentModel, userModel, id, function(error, result){
            if(error) cb(error)
            else{
                cb(null, result)
            }
        })
    }


 })


/**
 * ----------------
 * add blogs routes
 * ----------------
 */

router.post("/blogs", verifyToken, function (req, res, callback) {
    let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
    let payload = jwt.verify(token, 'secretKey');

    let condition = {
        user_id: payload.subject,
        title: req.body.title,
        description: req.body.description
    }

    commonFunction.addBlog(blogModel, condition, function(error, result){
        if(error) callback(error)
        else{
            res.json({
                title: result.title,
                description: result.description
            })
        }
    })

})

/**
 * ---------------
 * edit blog route
 * ---------------
 */

router.post("/edit_blog/:id", verifyToken, function(req, res, callback){
    let condition = {
        blog_id: req.params.id,
        title: req.body.title,
        description: req.body.description
    }

    commonFunction.editBlog(blogModel, condition, function(error, result){
        if(error) callback(error)
        else{
            res.json(result)
        }
    })

})


/**
 * -----------------
 * delete blog route
 * -----------------
 */

 router.post("/delete_blog/:id", verifyToken, function(req, res, callback){
     commonFunction.removeBlog(blogModel, req.params.id, function(error, result){
         if(error) callback(error)
         else{
            res.json(result)
         }
     })
 })

/**
 * ------------------
 * add comments route
 * ------------------
 */
router.post("/comments/:id", verifyToken, function(req, res, callback){
    let token = req.headers.authorization.split(" ")[1] ? req.headers.authorization.split(" ")[1] : req.headers.authorization
    let payload = jwt.verify(token, 'secretKey');
    let condition = {
        blog_id: req.params.id,
        user_id: payload.subject,
        comment: req.body.description
    }

    commonFunction.addComment(commentModel, condition, function(error, result){
        if(error) callback(error)
        else{
            res.json(result)
        }
    })

})

/**
 * --------------------
 * delete comment route
 * --------------------
 */
router.post("/delete_comment/:id", verifyToken, function(req, res, callback){
    let condition = {
        comment_id: req.params.id
    }

    commonFunction.removeComment(commentModel, condition, function(error, result){
        if(error) callback(error)
        else{
            res.json(result)
        }
    })

})

module.exports = router;