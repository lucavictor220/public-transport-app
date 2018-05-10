import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Button } from 'react-native-elements'
import { SCREEN_WIDTH } from "../config/settings";

class Track extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Track",
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Button
          title="START"
          large
          onPress={() =>
            navigate('Map', { name: 'MapScreen' })
          }
          buttonStyle={styles.startButton}
        />
        <Button
          title="STOP"
          large
          onPress={() =>
            navigate('Map', { name: 'MapScreen' })
          }
          buttonStyle={styles.stopButton}

        />
        <Button
          title="Go to Map screen"
          onPress={() =>
            navigate('Map', { name: 'MapScreen' })
          }
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