import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MapScreen from '../screens/Map';
import TrackScreen from '../screens/Track';



export const RootStack = createMaterialTopTabNavigator({
  Map: MapScreen,
  Track: TrackScreen,
});