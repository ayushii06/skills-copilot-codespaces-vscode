//create web server
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Comment = require('../models/comment');
const config = require('../config/database');

//add comment
router.post('/addComment', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let newComment = new Comment({
        comment: req.body.comment,