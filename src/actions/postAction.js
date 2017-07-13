import {DISPLAY_INSTANCES, REMOVE_AN_INSTANCE, CREATE_NEW_INSTANCE, UPDATE_INSTANCE} from '../constants/constant';
import axios from 'axios';

const display = (instances)=>{
  const action = {
    type: DISPLAY_INSTANCES,
    payload: instances
  }

  return action;
}

export const displayInstances = (modelName) =>{
  const url = '/postg/'+modelName+'/allinstances';
  return function(dispatch){
    return axios.get(url).then(
      function (resp) {
        dispatch(display(resp.data));
      },
      function (err) {
        console.log(err);
      }
    )
  }
}

const remove = (id)=>{
  const action = {
    type: REMOVE_AN_INSTANCE,
    id
  }

  return action;
}

export const removeAnInstance = (modelName, id) => {
  const url = 'postg/'+modelName+'/'+id

  return function(dispatch){
    return axios.delete(url).then(
      function(resp){
        dispatch(remove(resp.data))
      },
      function (err){
        console.log(err);
      }
    )
  }
}

const create = (newInstance)=>{
  const action = {
    type: CREATE_NEW_INSTANCE,
    payload: newInstance
  }

  return action;
}

export const createNewInstance = (modelName, newInstance) => {
  const url = 'postg/'+modelName+'/instances';

  return function(dispatch){
    return axios.post(url, {
      name: newInstance.name,
      color: newInstance.color,
      comments: newInstance.comments
    }).then(
      function(resp){
        dispatch(create(resp.data))
      },
      function(err){
        console.log(err);
      }
    )
  }
}


const update = (instance) =>{
  const action = {
    type: UPDATE_INSTANCE,
    payload: instance
  }

  console.log('updated instance', instance);
  return action;
}

export const updateInstance = (modelName, newInstance) => {
  const url = 'postg/'+modelName+'/'+ newInstance.id

  return function(dispatch){
    return axios.put(url,{
      name: newInstance.name,
      color: newInstance.color,
      comments: newInstance.comments
    }).then(
      function(resp){
        dispatch(update(resp.data))
      },
      function(err){
        console.log(err);
      }
    )
  }
}
