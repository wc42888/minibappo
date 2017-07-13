//import React from 'react';
import Main from './Main';
import PostTable from './PostTable';
import ObjectsTable from './ObjectsTable'
import {createNavigationContainer, createNavigator, StackRouter} from 'react-navigation';

const routes = {
  ObjectsTablePage: {
    screen: ObjectsTable
  },
  PostTablePage: {
    screen: PostTable
  }
};

const config = {
  initialRouteName: 'ObjectsTablePage'
};


const router = StackRouter(routes, config);

const Navigator = createNavigationContainer(createNavigator(router)(Main));

export default Navigator;
