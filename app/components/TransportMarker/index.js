import React from 'react';
import { Marker } from 'react-native-maps';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


const TransportMarker = ({ coordinate, nr }) => (
  <Marker coordinate={coordinate}>
    <View style={styles.transportMarker}>
      <Text>{nr}</Text>
    </View>
  </Marker>
);


const styles = StyleSheet.create({
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


export default TransportMarker;