var express = require ('express');
var mongoApi  = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Object = require('../models/Object.model');
const Sequelize = require('sequelize');
var sequelize = require('./postgres').sequelize;

var db = 'mongodb://localhost/minibappo';

mongoose.connect(db);

mongoApi.use(bodyParser.json());
mongoApi.use(bodyParser.urlencoded({
  extended: true
}))

var port = 3000;

mongoApi.use(express.static('public'));

mongoApi.get('/',function(req, res){
  console.log('hello world');
});

mongoApi.get('/objects', function(req, res){
  console.log('retriving all the objects');
  Object.find({})
    .exec(function(err, objects){
      if(err){
        res.send('error has occured when retriving all objects');
      }else{
        console.log(objects);
        res.json(objects);
      }
    });
});

mongoApi.get('/objects/:name', function(req, res){
  console.log("retriving one particular type of obejct");
  Object.find({
    name: req.params.name
  })
    .exec(function(err, objects){
      if(err){
        res.send('error occured retriving one particular type of obejct');
      }else{
        console.log(objects);
        res.json(objects);
      }
    });
});

mongoApi.post('/objects',function(req ,res){
  let newObject = new Object();

  newObject.name = req.body.name;
  newObject.key = req.body.name.toLowerCase();
  newObject.color = req.body.color;
  newObject.comments= req.body.comments;

  newObject.save(function(err, object){
    if(err){
      res.send('error occurrent when create a new object');
    }else{

      const modelName = object.key;
      const newModel = sequelize.define(modelName, {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: true,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING
        },
        color: {
          type: Sequelize.STRING,
        },
        comments: {
          type: Sequelize.STRING,
        }
      })

      newModel.sync().then(function(){
            console.log('new model/table created');
            console.log(sequelize.models);
            res.send(object);
      });
    }
  });
});

mongoApi.put('/objects/:id',function(req, res){
  Object.findOneAndUpdate({
    _id: req.params.id
  },
  {$set: { name:req.body.name, color:req.body.color, comments:req.body.comments}},
    {upsert:true},
      function(err, newObject){
        if(err){
          console.log('error occured when updating');
        }else{
          console.log(newObject);
          res.send(newObject);
        }
    });
});

mongoApi.delete('/objects/:id', function(req, res){
  Object.findOneAndRemove({
    _id:req.params.id
  }, function (err, object){
    if(err){
      res.send('error occurred when deleting');
    }else{
      console.log(object);
      res.send(object);
    }
  })
})

module.exports = mongoApi;
