import React from 'react';
import {addNavigationHelpers} from 'react-navigation';

const Main = ({navigation, router})=>{
  const childNavigation = addNavigationHelpers({
    ...navigation,
    state: navigation.state.routes[navigation.state.index],
  });
  const { state } = navigation;
  const Component = router.getComponentForRouteName(state.routes[state.index].routeName);

  return(
    <div>
      <Component
        navigation = {childNavigation}
      />
    </div>
  )
}

export default Main
