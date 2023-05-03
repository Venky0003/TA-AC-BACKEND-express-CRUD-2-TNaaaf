var express = require('express');
var router = express.Router();
let Article = require('../models/article');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', (req, res) => {
  Article.find({}).then((articles) => {
    // console.log(articles);
    res.render('articles', { articles: articles });
  });
});

router.get('/new', (req, res) => {
  res.render('addArticle');
});

router.post('/', (req, res) => {
  Article.create(req.body).then((result) => {
    res.redirect('/articles');
  });
  //send response
});

router.get('/:id', (req, res) => {
  let id = req.params.id;

  Article.findById(id)
    .then((article) => {
      // console.log(article);
      res.render('articleDetails', { article: article });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/:id/edit', (req, res) => {
  let id = req.params.id;

  Article.findById(id)
    .then((article) => {
      // console.log(article);
      res.render('editFormArticles', { article: article });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/:id', (req, res, next) => {
  // capture the upadted data from form
  let id = req.params.id;
  // using id find the book and update it with the data coming from form
  Article.findByIdAndUpdate(id, req.body)
    .then((article) => {
      res.redirect('/articles/' + id);
    })
    .catch((err) => {
      if (err) return next(err);
    });
});

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndDelete(id).then((article) => {
    res.redirect('/articles');
  });
});

router.get('/:id/likes', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }).then((article) => {
    res.redirect('/articles/' + id);
  });
});

module.exports = router;
