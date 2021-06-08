const express = require("express");
const signupRouter = express.Router();
let alert = require('alert'); 
// const bcrypt = require("bcrypt")
const Signupdata = require('../model/Signupdata');

function router(nav){
    signupRouter.get('/', function(req,res){
        res.render("signup",{
            nav,
            title: "Library"
        });
    });

    signupRouter.post('/register', function(req,res){

            // password: bcrypt.hash(req.body.password)

        var item = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
        // item.password = bcrypt.hash(item.password);
        var register = Signupdata(item);

        Signupdata.findOne({email: req.body.email}, function(err, user){
            if(err) {
              console.log(err);
            }
            var message;
            if(user) {
                // console.log(user)
                // message = "user exists";
                // console.log(message);
                alert("User already exists");
                res.redirect('/signup');
    
            } else {
                message= "user doesn't exist";
                console.log(message);
                register.save(); //saving to database
                res.redirect('/login');
            }
            // res.json({message: message});
        });          

    });

    return signupRouter;
}

module.exports = router;
