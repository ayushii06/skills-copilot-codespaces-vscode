//create web server
const express = require('express');
const app = express();
const port = 3000;
//connect to mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/express-demo', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));
//create schema
const commentsSchema = new mongoose.Schema({
    name: String,
    email: String,
    comment: String
});
//create model
const Comment = mongoose.model('Comment', commentsSchema);
//use body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
//use ejs
app.set('view engine', 'ejs');
//use public
app.use(express.static('public'));
//route
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log('Error');
        } else {
            res.render('comments', {comments: comments});
        }
    });
});
app.get('/comments/new', (req, res) => {
    res.render('new');
});
app.post('/comments', (req, res) => {
    Comment.create(req.body.comment, (err, newComment) => {
        if (err) {
            res.render('new');
        } else {
            res.redirect('/comments');
        }
    });
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});