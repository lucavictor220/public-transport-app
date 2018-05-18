import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';

import MapScreen from '../screens/Map';
import TrackScreen from '../screens/Track';
import LoadingScreen from '../screens/Loading';
import SignUpScreen from '../screens/SignUp';
import LoginScreen from '../screens/Login';
import MainScreen from '../screens/Main';

const tabNavigatorConfig = {
  tabBarPosition: 'top',
  swipeEnabled: true,
  initialRouteName: 'Loading',
  tabBarOptions: {
    activeTintColor: '#fff',
    inactiveTintColor: '#fff',
    activeBackgroundColor: '#fff',
    inactiveBackgroundColor: 'white',
    labelStyle: {
      fontSize: 14,
    },
    style: {
      backgroundColor: '#f4428c',
    },
  }
};

export const RootStack = createMaterialTopTabNavigator({
  Map: MapScreen,
  Track: TrackScreen,
  Loading: LoadingScreen,
  SignUp: SignUpScreen,
  Login: LoginScreen,
  Main: MainScreen,

}, tabNavigatorConfig);