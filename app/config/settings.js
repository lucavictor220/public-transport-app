import firebase from 'react-native-firebase';
import {
  Dimensions,
} from 'react-native';

export const DB = firebase.database();

const { width, height } = Dimensions.get('window');
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
export const LATITUDE_DELTA = 0.0922;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;