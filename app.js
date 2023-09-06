var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
const connectdb = require("./config");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

connectdb();

// Database Schema
var blogSchema = new mongoose.Schema(
    {
        title: String,
        image: String,
        body: String,
        created: {type: Date,default: Date.now}
    }
);

var Blog = mongoose.model("Blog",blogSchema);

//- - - RESTful Routes - - -

app.get("/",function(req,res){
    res.redirect("/blogs");
});

// Index Route
app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index.ejs",{blogs:blogs});
        }
    });
});

// New Route
app.get("/blogs/new",function(req,res){
    res.render("new.ejs");
});

// Create Route
app.post("/blogs",function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err,newBlog){
        if(err){
            console.log(err);
            res.render("/blogs/new");
        }
        else{
            res.redirect("/blogs");
        }
    });
});

// Show Route
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err)
        {
            console.log(err);
            res.redirect("/blogs");
        }else{
            res.render("show.ejs",{blog:foundBlog});
        }
    });
});

// Edit Route
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit.ejs", {blog: foundBlog});
        }
    });
});

// Update Route
app.put("/blogs/:id", function(req, res){
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
      if(err){
          res.redirect("/blogs");
      }  else {
          res.redirect("/blogs/" + req.params.id);
      }
   });
});

// Destroy Route
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
 });

//- - - Start Server - - -
app.listen(3000,function(){
    console.log("Restful Blog App server listening at port 3000");
});