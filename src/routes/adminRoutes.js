const express = require("express");
const adminRouter = express.Router();
const Bookdata = require('../model/Bookdata');
const Authordata = require('../model/Authordata');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) 
  }
 
});

var upload = multer({ storage: storage });


function router(nav){

    adminRouter.get('/', function(req,res){
        res.render("admin",{
            nav,
            title: "Library"
        });
    });

    

adminRouter.get("/books",function(req,res){
  Bookdata.find()
  .then(function(books){
    res.render("books",
    {
      nav,
      title:"Library",
      books
    });
  });
});



adminRouter.get("/books/:id", function(req,res){
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

adminRouter.get("/authors",function(req,res){
    Authordata.find()
    .then(function(authors){
      res.render("authors",
      {
        nav,
        title:"Library",
        authors
      });
    })
  
  });
  
  
  
  adminRouter.get("/authors/:id", function(req,res){
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

adminRouter.get('/addBook', function(req,res){
    res.render('addBook',{
        nav,
        title: "Library"
    });
});

adminRouter.post('/addBook/add', upload.single('image'), function(req,res){
    // res.send("Hey am added");
    var item = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
    }
    
    
    if(req.file){

      item.image = req.file.originalname
    }
    else{
      item.image = req.body.image;
    }
 


    var book = Bookdata(item);
    book.save(); //saving to database
    res.redirect('/admin/books');
});


adminRouter.get('/addAuthor', function(req,res){
    res.render("addAuthor",{
        nav,
        title: "Library"
    });
});

adminRouter.post('/addAuthor/add', upload.single('image'), function(req,res){

    // res.send("Hey am added");
    var item = {
        author: req.body.author,
        about: req.body.about
    }
    if(req.file){

      item.image = req.file.originalname
    }
    else{
      item.image = req.body.image;
    }
 

    var author = Authordata(item);
    author.save(); //saving to database
    res.redirect('/admin/authors');
});

adminRouter.get('/updateBook/:id', function(req,res){
  const id = req.params.id;
 
  Bookdata.findById(id)
  .then(function(book){
    res.render("updateBook",
    {
      nav,
      title:"Library",
      book
    });
  });
  });
  


adminRouter.put('/updateBook/:id/update', upload.single('image'), function(req,res){

  const id = req.params.id;

  var item = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre
}

if(req.file){

  item.image = req.file.originalname
}
else{
  item.image = req.body.image;
}


Bookdata.findByIdAndUpdate(id,item)
.then(function(book){
  res.redirect('/admin/books')
});

});

adminRouter.delete('/books/:id/delete', function(req,res){

const id = req.params.id;

Bookdata.findByIdAndDelete(id)
.then(()=>{
  res.redirect('/admin/books')
});

});

adminRouter.get('/updateAuthor/:id', function(req,res){
  const id = req.params.id;
 
  Authordata.findById(id)
  .then(function(author){
    res.render("updateAuthor",
    {
      nav,
      title:"Library",
      author
    });
  });
  });
  


adminRouter.put('/updateAuthor/:id/update', upload.single('image'), function(req,res){

  const id = req.params.id;

  var item = {
    author: req.body.author,
    about: req.body.about
}
if(req.file){

  item.image = req.file.originalname
}
else{
  item.image = req.body.image;
}

Authordata.findByIdAndUpdate(id,item)
.then(function(author){
  res.redirect('/admin/authors')
})

});
adminRouter.delete('/authors/:id/delete', function(req,res){

  const id = req.params.id;
  
  Authordata.findByIdAndDelete(id)
  .then(()=>{
    res.redirect('/admin/authors')
  });
  
  });

return adminRouter;
}

module.exports = router;


