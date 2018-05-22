import React, { Component } from 'react';
import { Container, Header, Button, Content, ActionSheet, Text } from "native-base";
import { DB } from "../config/settings";
import { convertToLocationObject } from '../utils/coordinates';
import createTransport from '../models/transport';
import createQuestion from '../models/question';
import ActivityRecognition from 'react-native-activity-recognition'

let CURRENT_TRACK = 0;

const mockQuestionData = [
  {
    type: 'trolleybus',
    nr: 10,
  },
  {
    type: 'trolleybus',
    nr: 11,
  },
  {
    type: 'bus',
    nr: 26,
  },
];

class Track extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: 1,
      },
      transport: {},
      activity: 'UNKNOWN',
    }
  }
  unsubscribe = ActivityRecognition.subscribe(detectedActivities => {
    const mostProbableActivity = detectedActivities.sorted[0];
    console.log('mostProbableActivity');
    console.log(mostProbableActivity);
    console.log('mostProbableActivity');
    this.setState({ activity: mostProbableActivity.type }, () => this.isInPublicTransport())
  });
  watchUserLocationObject: {};

  componentDidMount() {
    console.log('Call subscribe');
    const detectionIntervalMillis = 10000;
    console.log('Call Start activity recognition');
    ActivityRecognition.start(detectionIntervalMillis)
  }

  componentWillUnmount() {
    console.log('Unmount and clear the object: ', this.watchUserLocationObject);
    clearInterval(this.watchUserLocationObject);

    ActivityRecognition.stop();
    this.unsubscribe()
  }

  isInPublicTransport = () => {
    if (this.state.activity === 'WALKING') this.openQuestion()
  };

  openQuestion = () => {
    const actionSheetOptions = createQuestion(mockQuestionData);
    ActionSheet.show(
      {
        ...actionSheetOptions,
      },
      buttonIndex => {
        console.log(mockQuestionData[buttonIndex]);
        this.setState({ transport: mockQuestionData[buttonIndex] });
      }
    );
  };


  onLocationSuccess  = (position) => {
    const newLocationInTrack = DB.ref('markers/' + this.state.user.id);
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

  watchUserLocation = () => {
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
      <Container>
        <Content padder>
          <Text>Activity: {this.state.activity}</Text>
          <Button
            full
            large
            style={{ marginTop: 10, marginBottom: 10}}
            onPress={() => this.openQuestion()}
          >
            <Text>Start</Text>
          </Button>
          <Button
            full
            large
            style={{ marginTop: 10, marginBottom: 10}}
            onPress={() => this.stopWatching()}
          >
            <Text>STOP</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}




export default Track;