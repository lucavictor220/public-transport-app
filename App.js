/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import firebase from 'react-native-firebase';

const { width, height } = Dimensions.get('window');

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const onCurrentPositionGeolocationFailure = (geo_error) => {
  console.log('onCurrentPositionGeolocationFailure called');
  alert(JSON.stringify(geo_error))
};

const onWatchPositionGeolocationFailure = (geo_error) => {
  console.log('onWatchPositionGeolocationFailure called');
  alert(JSON.stringify(geo_error))
};

const geolocationOptions = {
  enableHighAccuracy: false,
  timeout: 60000,
};

const watchPositionOptions = {
  timeout: 60000,
  enableHighAccuracy: false,
  useSignificantChanges: false,
};

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      position: {
        latitude: 47.01667,
        longitude: 28.83333,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      markerPosition: {
        latitude: 0,
        longitude: 0,
      }
    }
  }

  watchID: ? number = null;

  createRegionObject = (position) => {
    let lat = parseFloat(position.coords.latitude);
    let long = parseFloat(position.coords.longitude);

    return {
      latitude: lat,
      longitude: long,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
  };

  onCurrentLocationSuccess  = (position) => {
    console.log('CALL onCurrentLocationSuccess');
    const newPosition = this.createRegionObject(position);
    console.log(newPosition);
    this.setState((state) => {
      return {
        ...state,
        position: { ...newPosition },
        markerPosition: { latitude: newPosition.latitude, longitude: newPosition.longitude }
      }
    }, console.log(this.state));
  };

  onWatchPositionSuccess  = (position) => {
    console.log('CALL onWatchPositionSuccess');
    const newPosition = this.createRegionObject(position);
    console.log(newPosition);
    this.setState((state) => {
      return {
        ...state,
        position: { ...newPosition },
        markerPosition: { latitude: newPosition.latitude, longitude: newPosition.longitude }
      }
    }, console.log(this.state));
  };

  componentDidMount() {
    console.log('COMPONENT MOUNTED');
    navigator.geolocation.getCurrentPosition(this.onCurrentLocationSuccess, onCurrentPositionGeolocationFailure, geolocationOptions);
    this.watchID = navigator.geolocation.watchPosition(this.onWatchPositionSuccess, onWatchPositionGeolocationFailure, watchPositionOptions);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.position}
          region={this.state.position}
        >
          <Marker
            coordinate={this.state.markerPosition}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
