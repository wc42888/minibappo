import {DISPLAY_INSTANCES, REMOVE_AN_INSTANCE, CREATE_NEW_INSTANCE, UPDATE_INSTANCE} from '../constants/constant';

const postReducer = (state = [], action)=>{
  let instances = null;

  switch(action.type){
    case DISPLAY_INSTANCES:

      instances = [...state, ...action.payload];
      return instances;

    case REMOVE_AN_INSTANCE:

      instances = state.filter(instance=>{
        return instance.id!==action.id
      })

      return instances;

    case CREATE_NEW_INSTANCE:

      instances =[...state, action.payload];

      return instances;

    case UPDATE_INSTANCE:

      instances = state.map((instance)=>{
        if(instance.id.toString()===action.payload.id){
          return {
            ...instance,
            ...action.payload
          }
        }
        return instance;
      })

      return instances
    default:

      return state
  }
};

export default postReducer;
