var express = require("express");
let jwt = require("jsonwebtoken");
let { JWT_SECRET } = require("../constants");
let {User} = require("../schemas/User")

let checkLogin = async (req, res, next) => {
  try {
    let token = req.header["authorisation"].split(" ")[1];
    token = jwt.verify(token, JWT_SECRET);
    let user = await User.findById(token.id);
    if(user){
        res.body.user=user.username;
        next()
    }
    else{
        res.redirect('/user/login')
    }

  } catch (err) {
    res.redirect("/user/login");
  }
};
module.exports.checkLogin = checkLogin