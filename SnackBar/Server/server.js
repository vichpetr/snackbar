const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1/snack';
const Avatar = require('./model/avatar');
const Snack = require('./model/snack');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));

app.post('/api/avatar/get', (req, res) => {
  mongoose.connect(url, {} , function(err){
    if(err) throw err;
    Avatar.find({},[],{},(err, avatars) => {
      if(err) throw err;
      return res.status(200).json({
        status: 'success',
        data: avatars
      });
    });
  });
});

app.post('/api/avatar/find', (req, res) => {
  mongoose.connect(url,{}, function(err){
    if(err) throw err;
    console.log('Searching for ' + req.body.id);
    Avatar.find({
      id: req.body.id
    }, function(err, avatar){
      if(err) throw err;
      if(avatar.length === 1){
        console.log('Returning ' + avatar);
        return res.status(200).json({
          status: 'success',
          data: avatar
        })
      } else {
        return res.status(200).json({
          status: 'fail',
          message: 'Search Failed'
        });
      }
    });
  });
});

app.post('/api/avatar/add', (req, res) => {
    mongoose.connect(url, {}, function (err) {
        if (err) throw err;
        console.log('Adding ' + req.body.id);
        const avatar = new Avatar({
            id: req.body.id,
            name: req.body.name,
            pictype: req.body.pictype,
            pic: req.body.pic
        })
        avatar.save((err, doc) => {
            if (err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        });
    });
});

app.post('/api/snack/get', (req, res) => {
  mongoose.connect(url, {} , function(err){
    if(err) throw err;
    Snack.find({},[],{},(err, snacks) => {
      if(err) throw err;
      return res.status(200).json({
        status: 'success',
        data: snacks
      });
    });
  });
});

app.post('/api/snack/find', (req, res) => {
  mongoose.connect(url,{}, function(err){
    if(err) throw err;
    console.log('Searching for ' + req.body.id);
    Snack.find({
      id: req.body.id
    }, function(err, snack){
      if(err) throw err;
      if(snack.length === 1){
        console.log('Returning ' + snack);
        return res.status(200).json({
          status: 'success',
          data: snack
        })
      } else {
        return res.status(200).json({
          status: 'fail',
          message: 'Search Failed'
        });
      }
    });
  });
});

app.post('/api/snack/add', (req, res) => {
    mongoose.connect(url, {}, function (err) {
        if (err) throw err;
        console.log('Adding ' + req.body.owner);
        const snack = new Snack({
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            owner: req.body.owner,
            pictype: req.body.pictype,
            pic: req.body.pic
        });
        snack.save((err, doc) => {
            if (err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        });
    });
});

app.listen(3000, () => console.log('SnackAPI server running on port 3000!'));