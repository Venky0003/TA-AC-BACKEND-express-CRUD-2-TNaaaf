var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var Author = require('../models/author');

// to list all the authorsauthors
router.get('/', (req, res, next) => {
  Author.find({})
    .then((author) => {
        console.log(author)
      res.render('authors', { authors: author });
    })
    .catch((err) => {
      console.log(err);
    });
});

// to add a new author
router.get('/new', (req, res) => {
  res.render('addAuthor');
});

// Adding a new author
router.post('/', (req, res, next) => {
  Author.create(req.body)
    .then((author) => {
      res.redirect('/authors');
    })
    .catch((err) => {
      console.log(err);
      if (err) return next(err);
    });
});

// Getting author details by ID
router.get('/:id', (req, res, next) => {
  var id = req.params.id;

  Author.findById(id)
    .then((author) => {
      res.render('authorDetails', { author: author });
    })
    .catch((err) => {
      console.log(err);
      if (err) return next(err);
    });
});

// to render form to edit an author
router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Author.findById(id)
    .then((author) => {
      res.render('editAuthorForm', { author: author });
    })
    .catch((err) => {
      console.log(err);
      if (err) return next(err);
    });
});

// to update an author
router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  Author.findByIdAndUpdate(id, req.body)
    .then((author) => {
      res.redirect('/authors/' + id);
    })
    .catch((err) => {
      console.log(err);
      if (err) return next(err);
    });
});

// to delete an author
router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Author.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/authors');
    })
    .catch((err) => {
      console.log(err);
      if (err) return next(err);
    });
});

module.exports = router;


