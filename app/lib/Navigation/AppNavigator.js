import React from 'react';
import { createDrawerNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import SplashView from '../../views/SplashView';
import LoginView from '../../views/LoginView';
import HomeView from '../../views/HomeView';
import { Drawer } from '../../components'

import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

const DrawerNavigator = createDrawerNavigator({
    Drawer: {
        screen: createStackNavigator({
            Home: {
                screen: HomeView,
            }
        }, {
            headerMode:'none',
        })
    }
}, {
    contentComponent: props => <Drawer {...props} />,
});

const AppNavigator = createSwitchNavigator({
    Splash: { screen: SplashView },
    Login: { screen: LoginView },
    Drawer: { screen: DrawerNavigator }
});

const outerScreens = ['Splash', 'Login', 'Home'];

const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.navigation
);

export { AppNavigator as default, middleware, outerScreens };
