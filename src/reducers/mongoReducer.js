import {DISPLAY_OBJECTS, CREATE_NEW_OBJECT, REMOVE_AN_OBJECT, UPDATE_OBJECT} from '../constants/constant';

const mongoReducer = (state = [], action) => {
  let objects = null;

  switch (action.type) {
    case DISPLAY_OBJECTS:

      objects = [...state, ...action.payload];
      return objects;

    case CREATE_NEW_OBJECT:

      objects = [...state, action.payload];
      return objects;

    case REMOVE_AN_OBJECT:

      objects = state.filter(function(item){
        return item._id !== action.payload;
      })
      console.log(objects);
      return objects;

    case UPDATE_OBJECT:

      return state.map( (object)=> {
        if(object._id === action.id){
          return{
            ...object,
            ...action.payload
          }
        }
        return object;
      });

    default:
      return state;
  }
}


export default mongoReducer;
