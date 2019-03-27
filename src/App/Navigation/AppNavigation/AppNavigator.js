import React from 'react';
import { createDrawerNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import SplashScreen from '../../../Screens/Splash';
import LoginScreen from '../../../Screens/Login';
import MainScreen from '../../../Screens/Main';
import { Drawer } from '../../../Components'

import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

const DrawerNavigator = createDrawerNavigator({
  Drawer: {
    screen: createStackNavigator({
      Main: {
        screen: MainScreen,
      }
    }, {
      headerMode:'none',
    })
  }
}, {
  contentComponent: props => <Drawer {...props} />,
});

const AppNavigator = createSwitchNavigator({
  Splash: { screen: SplashScreen },
  Login: { screen: LoginScreen },
  Drawer: { screen: DrawerNavigator }
});

const outerScreens = ['Splash', 'Login', 'Main'];

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation
);

export { AppNavigator as default, middleware, outerScreens };
