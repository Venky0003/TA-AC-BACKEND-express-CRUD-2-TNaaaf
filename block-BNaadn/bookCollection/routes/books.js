var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var Author = require('../models/author');

// to list all the books
router.get('/', (req, res, next) => {
  Book.find()
    .then((books) => {
      res.render('books', { books: books });
    })
    .catch((err) => {
      if (err) return next(err);
    });
});

// Adding  new book details
router.get('/new', (req, res) => {
  res.render('addBooks');
});

// render the addbooks
router.get('/addBooks', (req, res) => {
  Author.find()
    .then((author) => {
      console.log(author);
      res.render('addBooks', { authors});
    })
    .catch((err) => {
      console.log(err);
    });
});

// to post book details
router.post('/', (req, res) => {
  Book.create(req.body)
    .then((result) => {
      res.redirect('/books');
    })
    .catch((error) => {
      console.log(error);
    });
});



router.get('/:id', (req, res, next) => {
  var id = req.params.id;

  Book.findById(id)
    .then((book) => {
      res.render('bookDetails', { book: book });
    })
    .catch((err) => {
      console.log(err);
      if (err) return next(err);
    });
});

// Edit book form
router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Book.findById(id)
    .then((book) => {
      res.render('editBookForm', { book: book });
    })
    .catch((err) => {
      console.log(err);
      if (err) return next(err);
    });
});

router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  Book.findByIdAndUpdate(id, req.body)
    .then((book) => {
      res.redirect('/books/' + id);
    })
    .catch((err) => {
      console.log(err);
      if (err) return next(err);
    });
});

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Book.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/books');
    })
    .catch((err) => {
      console.log(err);
      if (err) return next(err);
    });
});




module.exports = router;
