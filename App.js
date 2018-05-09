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
  Image,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import firebase from 'react-native-firebase';
import api from './app/api/index';


const DB = firebase.database();

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
        latitudeDelta: 0.4,
        longitudeDelta: 0.4,
      },
      markers: [],
      stations: [],
      user: {},
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
        user: { userID: 3, location: { latitude: newPosition.latitude, longitude: newPosition.longitude } },
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
        user: { userID: 3, location: { latitude: newPosition.latitude, longitude: newPosition.longitude } }
      }
    }, console.log(this.state));
  };

  startWatching = () => {
    setInterval(() => {
      console.log('GET GEOLOCATION');
      navigator.geolocation.getCurrentPosition(this.onWatchPositionSuccess, onWatchPositionGeolocationFailure, watchPositionOptions)
    }, 5000)
  };

  watchTransportLocation = () => {
    const ref_firebase = DB.ref('markers/');
    setInterval(() => {
      ref_firebase.once('value', snap => {
        const data = snap.val();
        console.log('DATA');
        console.log(data);
        console.log('DATA');
        this.setState({ markers: data || [] }, console.log('STATE: ', this.state));
      })
    }, 5000);
  };

  componentDidMount() {
    console.log('COMPONENT MOUNTED');
    // api.getRoutes().then(routes => {
    //   console.log('ROUTES ARE:', routes.length);
    //   this.setState({ stations: routes }, () => {
    //   });
    // });
    navigator.geolocation.getCurrentPosition(this.onCurrentLocationSuccess, onCurrentPositionGeolocationFailure, geolocationOptions);
    // this.watchID = navigator.geolocation.watchPosition(this.onWatchPositionSuccess, onWatchPositionGeolocationFailure, watchPositionOptions);
    // this.startWatching();
    this.watchTransportLocation()
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    const { user, markers, stations } = this.state;
    console.log('Render', new Date().toLocaleString());

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.position}
          region={this.state.position}
          showsUserLocation
        >
          {markers.length !== 0 && markers.map((marker, index) => {
            const key = `trolleybus-marker-${index}`;
            const coordinate = {
              longitude: marker.longitude,
              latitude: marker.latitude,
            };

            return (
              <Marker
                key={key}
                coordinate={coordinate}
              >
                <Image
                  onLoad={() => this.forceUpdate()}
                  onLayout={() => this.forceUpdate()  }
                  source={require('./app/public/trolleybus.png')}
                  style={styles.imageMarker}
                />
              </Marker>
            )
          })}
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
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageMarker: {
    width: 20,
    height: 20,
    backgroundColor: '#FF7A00'
  },
  station: {
    width: 4,
    height: 4,
    backgroundColor: 'green',
    borderRadius: 4 / 2,
  },
  userMarker: {
    height: 18,
    width: 18,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 18 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF',
  },
  map: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
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
  }
});
