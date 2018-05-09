import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import { DB, SCREEN_WIDTH, SCREEN_HEIGHT, LATITUDE_DELTA, LONGITUDE_DELTA } from '../config/settings';
import TransportMarker from '../components/transportMarker';



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
  static navigationOptions = {
    title: "Map",
  };

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

  getTransportLocation = (dbRef) => {
    dbRef.once('value', snap => {
      const data = snap.val();
      console.log('DATA');
      console.log(data);
      console.log('DATA');
      this.setState({ markers: data || [] }, console.log('STATE: ', this.state));
    })
  };

  watchTransportLocation = () => {
    const dbRef = DB.ref('markers/');
    setInterval(() => {
      this.getTransportLocation(dbRef);
    }, 5000);
  };

  componentDidMount() {
    const dbRef = DB.ref('markers/');
    console.log('COMPONENT MOUNTED');
    this.getTransportLocation(dbRef);
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

            return <TransportMarker key={key} coordinate={coordinate} number={marker.nr} />
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

export default Map;