var express = require('express');
var router = express.Router();
var Event = require('../models/Event');
const { body, validationResult } = require('express-validator');
const moment = require('moment');
const auth = require('../config/passport-setup').isAuth;

/* GET home page. */
router.get('/:pageNum?', auth, function (req, res) {
  let pageNum = 1;
  let docSizeAtPage = 6;
  if (req.params.pageNum > 0) {
    pageNum = req.params.pageNum;
  }
  let query = {
    skip: docSizeAtPage * (pageNum - 1),
    limit: docSizeAtPage
  }
  let totalDocs = 0;
  Event.countDocuments({}).then((response) => {
    totalDocs = parseInt(response);
    console.log(totalDocs);
    Event.find({}, {}, query, (err, data) => {
      if (!err) {
        let chunk = []
        for (let i = 0; i < data.length; i += 3) {
          chunk.push(data.slice(i, 3 + i))
        }
        res.render('event/index', {
          chunks: chunk,
          message: req.flash('doneMsg'),
          total: totalDocs,
          page: pageNum
        });
      } else {
        console.log(err);
      }
    })
  })
});

router.get('/one/:id', (req, res) => {
  Event.findOne({ _id: req.params.id }, (err, data) => {
    if (!err) {
      res.render('event/showOne', {
        data: data
      })
    } else {
      console.log(err);
    }
  })
});

router.get('/create/one', auth, (req, res) => {
  // with flash connect
  res.render('event/add', {
    errors: req.flash('errors') //key name is errors, any name is possible
  });
  //without flash connect
  // res.render('event/add', {
  //   errors: false
  // });
});

router.post('/create/one', [
  body('title').isLength({ min: 5 }).withMessage('Title mustn\'t be empty'),
  body('description').isLength({ min: 5 }),
  body('date').isLength({ min: 1 }).withMessage('Date mustn\'t be empty')
], (req, res) => {
  const error = validationResult(req)
  if (error.errors.length > 0) {
    //without flash connect
    // res.render('event/add', {
    //   errors: error.errors
    // })
    //with flash connect
    req.flash('errors', error.errors);
    res.redirect('/index/create/one');
  } else {
    let newEvent = new Event({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      userID: req.user.id
    });
    newEvent.save((err) => {
      if (!err) {
        req.flash('doneMsg', 'The Event was added');
        res.redirect('/index/');
      } else {
        console.log(err);
      }
    })
  }
});

router.get('/edit/:id', (req, res) => {
  console.log("edit");
  Event.findOne({ _id: req.params.id }, (err, data) => {
    if (!err) {
      let date = moment(data.date).format('YYYY-MM-DD');
      res.render('event/edit', {
        data: data,
        date: date,
        errors: req.flash('errors')
      });
    } else {
      console.log(err);
    }
  });
});

router.post('/update/update/update', [
  body('title').isLength({ min: 5 }).withMessage('Title must be more than 5 characters'),
  body('description').isLength({ min: 5 }).withMessage('Description must be more than 5 characters'),
  body('date').isLength({ min: 5 }).withMessage('Date is required')
], (req, res) => {
  console.log("update");
  const errors = validationResult(req)
  if (errors.errors.length > 0) {
    console.log(errors.errors);
    req.flash('errors', errors.errors);
    res.redirect('/index/edit/' + req.body.id);
  } else {
    let edit = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date
    }
    Event.updateOne({ _id: req.body.id }, edit, (err) => {
      if (!err) {
        req.flash('info', 'Edited !');
        res.redirect('/index/edit/' + req.body.id);
      } else {
        console.log(err);
      }
    })
  }
});

router.delete('/deleteEvent/:id', (req, res) => {
  Event.deleteOne({ _id: req.params.id }, (err, data) => {
    if (!err) {
      res.status(200).send({
        message: "Deleted !"
      })
    } else {
      res.status(400).send({
        message: "Failed to delete :-("
      })
    }
  })
});

module.exports = router;
