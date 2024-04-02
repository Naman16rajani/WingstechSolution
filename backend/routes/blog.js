var express = require("express");
var fs = require('fs');
var path = require('path');
var router = express.Router();
let bcrypt = require("bcrypt");
let { User } = require("../schemas/User");
let { Blog } = require("../schemas/Blog");
let {checkLogin} = require('../middleware/checkLogin')

var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

router.get("/blogs", async (req, res, next) => {
  try {
    let blogs = await Blog.find();
    res.send(blogs);
  } catch (err) {
    res.status(500).send("can't fetch blogs data : " + err);
  }
});

router.get("/blog/:id", async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);
    res.send(blog);
  } catch (err) {
    res.status(500).send("can't fetch blog data : " + err);
  }
});

router.post("/blog",checkLogin, async (req, res, next) => {
  try {
    var obj = {
      title: req.body.title,
      description: req.body.description,
      user:req.body.user,
      image: {
          data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.body.title)),
          contentType: 'image/png'
      }
  }
    let blog = new Blog(obj);
    blog.save();
    res.send("blog saved");
  } catch (err) {
    res.status(500).send("can't save blog : " + err);
  }
});

router.put("/blog",[checkLogin,upload.single('image')], async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.body.id);
    blog.title = req.body.title;
    blog.description = req.body.description;
    fs.rm(path.join(__dirname + '/uploads/' + req.body.title))
    blog.image = {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + blog.title)),
      contentType: 'image/png'
    }
    blog.save();
    res.send("blog updated");
  } catch (err) {
    res.status(500).send("can't update blog : " + err);
  }
});

router.delete("/blog",checkLogin, async (req, res, next) => {
  try {
    let blog = await Blog.findByIdAndDelete(req.body.id);
    fs.rm(path.join(__dirname + '/uploads/' + req.body.title))

    res.send("blog is deleted");
  } catch (err) {
    res.status(500).send("can't delete blog : " + err);
  }
});



module.exports = router;
