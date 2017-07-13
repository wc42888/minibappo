import {DISPLAY_OBJECTS, CREATE_NEW_OBJECT, REMOVE_AN_OBJECT, UPDATE_OBJECT} from '../constants/constant';
import axios from 'axios';

const display = (objects) => {
  const action = {
    type: DISPLAY_OBJECTS,
    payload: objects
  }

  return action;
}

export const displayObjects = () => {

  return function(dispatch){
    return axios.get('/mongo/objects').then(
      function (resp) {
        dispatch(display(resp.data));
      },
      function (err) {
        console.log(err);
      }
    )
  }
}


const create = (newObject) => {

  const action = {
    type:CREATE_NEW_OBJECT,
    payload: newObject
  }

  return action;
}

export const createNewObject = (name) => {
    return function (dispatch){
      return axios.post('/mongo/objects', {
        name:name
      }).then(
        function (resp){
          dispatch(create(resp.data));
        },
        function (err){
          console.log(err);
        }
      )
    }
}

const removeOne = (id) => {
  const action = {
    type: REMOVE_AN_OBJECT,
    payload: id
  }

  return action;
}

export const removeAnObject = (id) => {
  return function (dispatch){
    return axios.delete('/mongo/objects/'+id)
      .then(
      function (resp){
        dispatch(removeOne(id));
      },
      function (err){
        console.log(err);
      }
    )
  }
}

const updateOne = (id, name, color, comments)=>{
  const action ={
    type : UPDATE_OBJECT,
    id: id,
    payload: {name, color, comments}
  }

  return action;
}

export const updateObject = (id, newName, newColor, newComments) => {
  return function (dispatch){
    return axios.put('/mongo/objects/'+id, {
      name: newName,
      color: newColor,
      comments: newComments
    }).then(
      function (resp){
        dispatch(updateOne(id, newName, newColor, newComments));
      },
      function (err){
        console.log(err);
      }
    )

  }
}
