var express = require('express');
var mongoApi = require('./src/api/mongo');
var postApi = require('./src/api/postgres').postApi;

const server = express();

server.use('/mongo', mongoApi);
server.use('/postg', postApi);

server.listen(3001, ()=>{
  console.log('Server running at http://localhost:3001'  );
});
