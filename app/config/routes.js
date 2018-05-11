import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MapScreen from '../screens/Map';
import TrackScreen from '../screens/Track';


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
}, tabNavigatorConfig);