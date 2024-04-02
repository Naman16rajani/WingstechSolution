var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let salt = bcrypt.genSaltSync(10);
let {JWT_SECRET} = require('../constants');
let {User} = require('../schemas/User')

router.post("/login", async (req, res, next) => {
  try {
    let user = await User.find({
      username: req.body.username,
    });
    let compare = bcrypt.compareSync(user.password, req.body.password);
    if (user && compare) {
      let token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

      res.setCookie(token);

      res.send({status:true,token:token});
    } else {
      res.send({status:false});
    }
  } catch (err) {
    console.error("can't login", err);
    res.send("can't login" + err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    let user = await User.find({
      username: req.body.username,
    });
    if (user) {
      res.send("User exist");
    }
    user = new User(req.body);
    user.password = bcrypt.hashSync(req.body.password, salt);
    user.save();
    let token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.setCookie(token);
    res.send({status:true,token:token});
  } catch (err) {
    console.error("can't register", err);
    res.send("can't register" + err);
  }
});

router.post('/logout',(req,res)=>{
  try{
    let token = req.header["authorisation"].split(" ")[1];
    res.send(true)
  }catch(err){
    res.send("can't logout "+err)
  }
})
module.exports = router;
