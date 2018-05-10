import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MapScreen from '../screens/Map';
import TrackScreen from '../screens/Track';


export const Tabs = StackNavigator({
  Track: { screen: TrackScreen },
  Map: { screen: MapScreen },
});

// export const RootStack = createStackNavigator({
//   Map: {
//     screen: Map,
//     navigationOptions: () => ({
//       title: 'MapTitle',
//     })
//   },
//   Track: {
//     screen: Track,
//     navigationOptions: () => ({
//       title: 'TrackTitle',
//     })
//   },
// });

