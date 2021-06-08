const express = require("express");
const loginRouter = express.Router();
let alert = require('alert'); 
const Signupdata = require('../model/Signupdata');
const Logindata = require('../model/Logindata');

function router(nav){
    loginRouter.get('/', function(req,res){
        res.render("login",{
            nav,
            title: "Library"
        });
    });

    loginRouter.post('/enter', function(req,res){

        var item = {
            email: req.body.email,
            password: req.body.password
        }
        Logindata(item);
        
        if(item.email == "admin123@gmail.com" && item.password == "Case@123"){
            res.redirect('/admin');
        }
        else{
            Signupdata.findOne({email: item.email, password: item.password}, function(err, user){
                if(err) {
                    console.log(err);
                  }
                if(user) {
                        res.redirect('/user');
                      }                    
                else{
                    alert("Email-id or password is incorrect");
                    res.redirect('/login');
                }
              });
        }

        

    })
    return loginRouter;
}

module.exports = router;
