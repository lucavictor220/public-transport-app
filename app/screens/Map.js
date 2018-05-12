import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { DB, SCREEN_WIDTH, SCREEN_HEIGHT, GEOLOCATION_OPTIONS } from '../config/settings';
// import TransportMarker from '../components/transportMarker';


class Map extends Component {
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

  watchUserLocationObject = {};
  watchObject = {};
  // watchID: ? number = null;


  getTransportLocation = (dbRef) => {
    dbRef.once('value', snap => {
      const data = snap.val();
      // console.log('DATA');
      // console.log(data);
      // console.log('DATA');
      this.setState({ markers: data || [] }, console.log('STATE: ', this.state));
    })
  };

  watchTransportLocation = () => {
    const dbRef = DB.ref('markers/');
    return setInterval(() => {
      this.getTransportLocation(dbRef);
    }, 5000);
  };

  // onCurrentLocationSuccess = (position) => {
  //   console.log('POSITION: ', position);
  //   this.setState(() => ({ user: position.coordinates }))
  // };
  //
  // onCurrentPositionGeolocationFailure = (error) => {
  //   console.log(error);
  // };

  componentDidMount() {
    const dbRef = DB.ref('markers/');
    console.log('COMPONENT MOUNTED');
    this.getTransportLocation(dbRef);
    // navigator.geolocation.getCurrentPosition(this.onCurrentLocationSuccess, this.onCurrentPositionGeolocationFailure, GEOLOCATION_OPTIONS);
    // this.watchID = navigator.geolocation.watchPosition(this.onLocationSuccess, onWatchPositionGeolocationFailure, watchPositionOptions);
    this.watchObject = this.watchTransportLocation();
  }

  componentWillUnmount() {
    console.log('Clear Timeout');
    clearInterval(this.watchObject)
  }

  render() {
    const { user, markers, stations } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.position}
          region={this.state.position}
          onRegionChangeComplete={position => this.setState({ position })}
          showsUserLocation
          // onUserLocationChange={(LatLng) => console.log('Position NOW: ', LatLng.coordinate)}
          loadingEnabled
          showsMyLocationButton
        >
          {markers.length !== 0 && markers.map((marker, index) => {
            const key = `transport-${index}`;
            const coordinate = {
              longitude: marker.longitude,
              latitude: marker.latitude,
            };

            return (
              <Marker key={key} coordinate={coordinate}>
                <View style={styles.transportMarker}>
                  <Text>{marker.nr}</Text>
                </View>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  transportMarker: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#2e7af4',
    borderWidth: 1,
  }
});

export default Map;