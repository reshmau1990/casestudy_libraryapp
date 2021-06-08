const express = require("express");
const app = new express();
const port = process.env.PORT || 3000;
const methodOverride = require("method-override");

const nav = [
    {link:"/admin", name:"HOME"}, 
    {link:"/admin/books", name:"BOOKS"}, 
    {link:"/admin/authors", name:"AUTHORS"},
    {link:"/admin/addBook", name:"ADD BOOK"},
    {link:"/admin/addAuthor", name:"ADD AUTHOR"}
    ];
    const nav1 = [
        {link:"/user", name:"HOME"}, 
        {link:"/user/books", name:"BOOKS"}, 
        {link:"/user/authors", name:"AUTHORS"}
        ];
    
const adminRouter = require("./src/routes/adminRoutes")(nav);
const userRouter = require("./src/routes/userRoutes")(nav1);

const loginRouter = require("./src/routes/loginRoutes")(nav);
const signupRouter = require("./src/routes/signupRoutes")(nav);


app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
  }));

app.use(express.urlencoded({extended:true}));

app.use(express.static("./public"));    // app.use(express.static(__dirname+ "/public"))
app.set("view engine", "ejs");
app.set("views",__dirname+ "/src/views"); // app.set("views", "./src/views");
app.use('/images', express.static('./public/images'));


app.use("/login", loginRouter);
app.use("/signup", signupRouter);

app.use("/admin",adminRouter);
app.use("/admin/books", adminRouter);
app.use("/admin/authors", adminRouter);
app.use("/admin/addBook", adminRouter);
app.use("/admin/addAuthor", adminRouter);
app.use("/admin/updateBook", adminRouter);
app.use("/admin/updateAuthor", adminRouter);
app.use("/admin/updateBook", adminRouter);
app.use("/admin/updateBook", adminRouter);


app.use("/user",userRouter);
app.use("/user/books", userRouter);
app.use("/user/authors", userRouter);


app.get("/", function(req,res){
    res.render("index", 
            {
                nav,
                title:"Library"
            });
});


app.listen(port, ()=>{
    console.log("Server is ready at "+port);
});
