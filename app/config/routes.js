import React from 'react';
import { TabNavigator } from 'react-navigation';

import MapScreen from '../screens/Map';
import TrackScreen from '../screens/Track';
import QuestionScreen from '../screens/Question';


const tabNavigatorConfig = {
  tabBarPosition: 'top',
  swipeEnabled: true,
  initialRouteName: 'Map',
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

export const RootStack = TabNavigator({
  Map: MapScreen,
  Track: TrackScreen,
  Question: QuestionScreen,
}, tabNavigatorConfig);