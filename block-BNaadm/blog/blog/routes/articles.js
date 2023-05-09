var express = require('express');
var router = express.Router();
let Article = require('../models/article');
let Comment = require('../models/comment');

// to find the articles listing all in article.ejs
router.get('/', (req, res, next) => {
  Article.find({})
    .then((articles) => {
      // console.log(articles);
      res.render('articles', { articles: articles });
    })
    .catch((err) => {
      if (err) return next(err);
    });
});

router.get('/new', (req, res) => {
  res.render('addArticle');
});

// posting article in the articles.ejs page
router.post('/', (req, res, next) => {
  Article.create(req.body)
    .then((result) => {
      res.redirect('/articles');
    })
    .catch((err) => {
      if (err) return next(err);
    });
});



router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id)
    .populate('comments')
    .then((article) => {
      // console.log(article);
      res.render('articleDetails', { article: article });
    })
    .catch((err) => console.log(err));
});

// to edit we need to find the artcile
router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id)
    .then((article) => {
      res.render('editArticleForm', { article: article });
    })
    .catch((err) => {
      if (err) return next(err);
    });
});

// to update the edited article
router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id, req.body)
    .then((article) => {
      res.redirect('/articles/' + id);
    })
    .catch((err) => {
      if (err) return next(err);
    });
});

// to delete the article
router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndDelete(id)
    .then((article) => {
      return Comment.deleteMany({ articleId: article.id })
        .then((article) => {
          res.redirect('/articles');
        })
        .catch((err) => {
          if (err) return next(err);
        });
    })
    .catch((err) => {
      if (err) return next(err);
    });
});

// for likes on the article
router.get('/:id/likes', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }).then((article) => {
    res.redirect('/articles/' + id);
  });
});

// add comments
router.post('/:id/comments', (req, res, next) => {
  // console.log(req.body)
  var id = req.params.id;
  req.body.articleId = id;
  Comment.create(req.body)
    .then((comment) => {
      // update article with comment id into comments section
      Article.findByIdAndUpdate(id, { $push: { comments: comment._id } }).then(
        (result) => {
          res.redirect('/articles/' + id);
        }
      );
    })
    .catch((err) => {
      if (err) return next(err);
    });
});

module.exports = router;
