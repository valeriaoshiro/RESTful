var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/restful_blog_app");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// SCHEMA SETUP
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "https://s.abcnews.com/images/US/cute-dogs-gty-01-jpo-171116_12x5_992.jpg",
//     body: "Hello, this is a blog post"
// });

// LANDING
app.get('/', function(req, res){
    res.redirect('/blogs');
})

// INDEX
app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err) {
            console.log(err);
        } else {
            res.render('index', { blogs: blogs});
        }
    });
});

// NEW
app.get('/blogs/new', function(req, res){
    res.render('new');
});

// CREATE
app.post('/blogs', function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render('new');
        } else {
            res.redirect('/blogs');
        }
    });
});

// SHOW
app.get('/blogs/:id', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('show', {blog: foundBlog});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server has started');
});