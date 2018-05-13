import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { Button } from 'react-native-elements'

import { DB, SCREEN_WIDTH, GEOLOCATION_OPTIONS } from "../config/settings";
import { convertToLocationObject } from '../utils/coordinates';
import ActivityRecognition from 'react-native-activity-recognition'

let CURRENT_TRACK = 0;

class Track extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: 1,
      },
      activity: 'NOTHING',
    }
  }
  unsubscribe: {};
  watchUserLocationObject: {};

  componentDidMount() {
    this.unsubscribe = ActivityRecognition.subscribe(detectedActivities => {
      const mostProbableActivity = detectedActivities.sorted[0];
      console.log('mostProbableActivity');
      console.log(mostProbableActivity);
      console.log('mostProbableActivity');
      this.setState({ activity: mostProbableActivity.type })
    });
    const detectionIntervalMillis = 1000;
    ActivityRecognition.start(detectionIntervalMillis)
  }

  componentWillUnmount() {
    console.log('Unmount and clear the object: ', this.watchUserLocationObject);
    clearInterval(this.watchUserLocationObject);

    ActivityRecognition.stop();
    this.unsubscribe()
  }

  onLocationSuccess  = (position) => {
    const newLocationInTrack = DB.ref('user-tracks/' + this.state.user.id + '/' + CURRENT_TRACK).push();
    const locationData = convertToLocationObject(position);
    console.log('Write data: ', locationData);
    newLocationInTrack.set({
      ...locationData,
    });
  };

  onLocationFailure = (error) => {
    console.log('Location service failed to retrieve data for user: ', this.state.user);
    console.log('Reason:\n', error);
  };

  startWatching = () => {
    console.log('Start watching...');
    this.watchUserLocationObject = setInterval(() => {
      console.log('GET GEOLOCATION');
      navigator.geolocation.getCurrentPosition(this.onLocationSuccess, this.onLocationFailure, GEOLOCATION_OPTIONS)
    }, 5000)
  };

  stopWatching = () => {
    console.log('Stop watching.');
    clearInterval(this.watchUserLocationObject);
    CURRENT_TRACK++;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.activity}</Text>
        <Button
          title="START"
          large
          onPress={() => this.startWatching()}
          buttonStyle={styles.startButton}
        />
        <Button
          title="STOP"
          large
          onPress={() => this.stopWatching()}
          buttonStyle={styles.stopButton}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  startButton: {
    width: SCREEN_WIDTH,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#50ed82",
  },
  stopButton: {
    width: SCREEN_WIDTH,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#f23c51",
  }

});


export default Track;