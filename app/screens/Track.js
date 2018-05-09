import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

class Track extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Track",
  };

  render() {
    return (
      <View style={trackStyles.container}>
        <Text>Track Tab</Text>
      </View>
    )
  }
}

export default Track;