import React from 'react';
// import { StyleSheet, Platform, Image, View } from 'react-native';
import firebase from 'react-native-firebase';
import { Container, Header, Content, Button, Text } from 'native-base';


class Main extends React.Component {
  state = { currentUser: null };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    console.log('CURRENT USER');
    console.log(currentUser);
    console.log('CURRENT USER');
    this.setState({ currentUser })
  }
  render() {
    const { currentUser } = this.state;

    return (
      <Container>
        <Text>
          Hi {currentUser && currentUser._user.email}!
        </Text>
      </Container>
    )
  }
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });

export default Main;