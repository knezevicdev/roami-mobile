import React from 'react';
import { createDrawerNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import SplashView from '../../views/SplashView';
import LoginView from '../../views/LoginView';
import ResetPasswordView from '../../views/ResetPasswordView';
import HomeView from '../../views/HomeView';
import RegisterView from '../../views/RegisterView';
import ForgotPasswordView from '../../views/ForgotPasswordView';
import VenueView from '../../views/VenueView';
import MapView from '../../views/MapView';
import UserSettingsView from '../../views/UserSettingsView';
import DetailedMapView from '../../views/DetailedMapView';
import { Drawer } from '../../components'

import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

const DrawerNavigator = createDrawerNavigator({
    Drawer: {
        screen: createStackNavigator({
            Home: {
                screen: HomeView,
            },
            Venue: {
                screen: VenueView,
            },
            Map: {
                screen: MapView,
            },
            UserSettings: {
                screen: UserSettingsView,
            },
            DetailedMap: { screen: DetailedMapView },
            ResetPassword: { screen: ResetPasswordView }
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
    Drawer: { screen: DrawerNavigator },
    Register: { screen: RegisterView },
    ResetPassword: { screen: ResetPasswordView },
    ForgotPassword: { screen: ForgotPasswordView },
    Venue: { screen: VenueView },
    Map: { screen: MapView },
    DetailedMap: { screen: DetailedMapView },
    UserSettings: { screen: UserSettingsView }
});

const outerScreens = ['Splash', 'Login', 'Home', 'Register', 'ForgotPassword', "ResetPassword"];

const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.navigation
);

export { AppNavigator as default, middleware, outerScreens };
