const express = require("express");
const userRouter = express.Router();
const Bookdata = require('../model/Bookdata');
const Authordata = require('../model/Authordata');

function router(nav1){

  let nav = nav1;

    userRouter.get('/', function(req,res){
        res.render("welcome",{
            nav,
            title: "Library"
        });
    });

    userRouter.get("/books",function(req,res){
        Bookdata.find()
        .then(function(books){
          res.render("books1",
          {
            nav,
            title:"Library",
            books
          });
        });
      });

      userRouter.get("/books/:id", function(req,res){
        const id = req.params.id;
        Bookdata.findOne({_id:id})
        .then(function(book){
          res.render("book",
          {
            nav,
            title:"Library",
            book
          });
        });
        });
        
        userRouter.get("/authors",function(req,res){
            Authordata.find()
            .then(function(authors){
              res.render("authors1",
              {
                nav,
                title:"Library",
                authors
              });
            })
          
          });
          
          
          
          userRouter.get("/authors/:id", function(req,res){
          const id = req.params.id;
          Authordata.findOne({_id:id})
          .then(function(author){
            res.render("author",
            {
              nav,
              title:"Library",
              author
            });
          });
        });
        
        return userRouter;
};
module.exports = router;