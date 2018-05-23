import React, { Component } from 'react';
import ActivityRecognition from 'react-native-activity-recognition'
import { Container, Header, Button, Content, ActionSheet, Text } from "native-base";
import { DB, GEOLOCATION_OPTIONS, QUESTION_ACTIVITY } from "../config/settings";
import { convertToLocationObject } from '../utils/coordinates';
import createTransport from '../models/transport';
import createQuestion from '../models/question';


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
        id: 4,
      },
      transport: null,
      activity: 'UNKNOWN',
      feedbackDone: false,
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
    this.unsubscribe();
    this.stopWatching();
  }

  isInPublicTransport = () => {
    if (this.state.activity === QUESTION_ACTIVITY && !this.state.feedbackDone) {
      this.openQuestion();
    }
  };

  openQuestion = () => {
    const actionSheetOptions = createQuestion(mockQuestionData);
    ActionSheet.show(
      {
        ...actionSheetOptions,
      },
      buttonIndex => {
        console.log(mockQuestionData[buttonIndex]);
        if (buttonIndex > mockQuestionData.length-1) return;
        this.setState({
          transport: createTransport(mockQuestionData[buttonIndex]),
          feedbackDone: true
        }, () => this.shouldStartWatching());
      }
    );
  };

  shouldStartWatching = () => {
    if (this.state.transport) {
      this.watchUserLocation()
    }
  };

  onLocationSuccess  = (position) => {
    const markerObject = DB.ref('markers/' + this.state.transport.id);
    const coordinates = convertToLocationObject(position);
    const transportObject = {
      ...this.state.transport,
      ...coordinates,
    };
    console.log('New key: ', markerObject);
    markerObject.set({
      ...transportObject,
    });
  };

  onLocationFailure = (error) => {
    console.log('Location service failed to retrieve data for user: ', this.state.user.id);
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
    console.log('Remove object');
    DB.ref('markers/' + this.state.transport.id).remove();
  };

  render() {
    const feedbackNotification = this.state.feedbackDone ? 'Thank you for your contribution!' : 'No contribution yet.';

    return (
      <Container>
        <Content padder>
          <Text>Activity: {this.state.activity}</Text>
          {this.state.transport &&
            <Text>Transport: {this.state.transport.type} {this.state.transport.nr}</Text>
          }
          <Text>{feedbackNotification}</Text>
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