import React, { Component } from 'react';
import { Marker } from 'react-native-maps';
import {
  StyleSheet,
  AppRegistry,
  View,
  Text,
} from 'react-native';


export default class TransportMarker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Marker key={this.props.key} coordinate={this.props.coordinate}>
        <View style={transportStyles.transportMarker}>
          <Text>{this.props.number}</Text>
        </View>
      </Marker>
    )
  }
}

const transportStyles = StyleSheet.create({
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



