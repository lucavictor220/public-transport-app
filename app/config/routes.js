import React from 'react';
import { TabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Map from '../screens/Map';
import Track from '../screens/Track';


export const RootStack = createStackNavigator({
  Map: {
    screen: Map,
    navigationOptions: () => ({
      title: 'MapTitle',
    })
  },
  Track: {
    screen: Track,
    navigationOptions: () => ({
      title: 'TrackTitle',
    })
  },
});

export const Tabs = TabNavigator({
  Map: {
    screen: 'Map',
    navigationOptions: {
      tabBarLabel: 'Map',
    }
  },
  Track: {
    screen: 'Track',
    navigationOptions: {
      tabBarLabel: 'Track',
    }
  }
});