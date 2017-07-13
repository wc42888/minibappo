var express = require('express');
var postApi = express.Router();
var bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('minibappo', 'chao','1234', {
  host: 'localhost',
  dialect: 'postgres',
});

postApi.use(bodyParser.json());
postApi.use(bodyParser.urlencoded({
  extended: true
}))

sequelize
  .authenticate()
  .then(()=>{
    console.log('Connection has been established successfully.');
  })
  .catch(err=>{
    console.log('Unable to connect to the databse: ', err);
  })

//create a mmodel
postApi.post('/models',function(req, res){
  console.log('creating a new model/table');

  const modelName = req.body.name;
  const newModel = sequelize.define(modelName, {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name:{
      type: Sequelize.STRING,
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
        //res.send('new model/table created');
        console.log(sequelize.models);
        res.json(sequelize.models);
  });
})

//get all instances of a model/table
postApi.get('/:name/allinstances', function(req, res){
  console.log('retriving all instances of a model/table from Postgres');

  const modelName = req.params.name;
  const model = sequelize.define(modelName, {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name:{
      type: Sequelize.STRING,
    },
    color: {
      type: Sequelize.STRING,
    },
    comments: {
      type: Sequelize.STRING,
    }
  })

  model.findAll().then(function(instances){
    res.send(instances);
  })

});

//get one instance of a model/table
postApi.get('/:name/:id', function(req, res){
  console.log('retriving one particular instance of a model/table');

  const modelName = req.params.name;
  const id = req.params.id;
  const model = sequelize.define(modelName, {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name:{
      type: Sequelize.STRING,
    },
    color: {
      type: Sequelize.STRING,
    },
    comments: {
      type: Sequelize.STRING,
    }
  })

  model.findById(id).then(function(instance){
    res.send(instance)
  })
})

//update an instance in a table
postApi.put('/:modelName/:id', function(req, res){
  console.log('update an instance');

  const modelName = req.params.modelName;
  const model = sequelize.define(modelName, {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true
    },
    name:{
      type: Sequelize.STRING,
    },
    color: {
      type: Sequelize.STRING,
    },
    comments: {
      type: Sequelize.STRING,
    }
  })

  model.update({
      name: req.body.name,
      color: req.body.color,
      comments: req.body.comments
    },
    {
    where:{
      id: req.params.id,
    }
  }).then(function(updatedArray){
    res.send({
      id: req.params.id,
      name: req.body.name,
      color: req.body.color,
      comments: req.body.comments
    })
  })
})

//create an instance in a table
postApi.post('/:modelName/instances',function(req, res){
  console.log('creating a new instance');

  const modelName = req.params.modelName;
  const model = sequelize.define(modelName, {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true
    },
    name:{
      type: Sequelize.STRING,
    },
    color: {
      type: Sequelize.STRING,
    },
    comments: {
      type: Sequelize.STRING,
    }
  })

  model.create({
    id: req.body.id,
    name: req.body.name,
    color: req.body.color,
    comments: req.body.comments
  }).then(function(newModel){
    res.send(newModel);
  });
});

//delete a table
postApi.delete('/models/:name', function(req, res){
  console.log('deleting a model/table');

  const modelName = req.params.name;
  const model = sequelize.define(modelName, {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name:{
      type: Sequelize.STRING,
    },
    color: {
      type: Sequelize.STRING,
    },
    comments: {
      type: Sequelize.STRING,
    }
  })

  model.drop().then(function(){
      res.send('model deleted');
  })
})

//delete an instance from a table
postApi.delete('/:modelName/:id', function(req, res){
  console.log('deleting an instance of a model/table');

  const modelName = req.params.modelName;
  const model = sequelize.define(modelName, {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true
    },
    name:{
      type: Sequelize.STRING,
    },
    color: {
      type: Sequelize.STRING,
    },
    comments: {
      type: Sequelize.STRING,
    }
  })

  model.destroy({
    where:{
      id: req.params.id
    }
  }).then(function(num){
    res.send(req.params.id);
  })
})

module.exports = {
  postApi: postApi,
  sequelize: sequelize
};
