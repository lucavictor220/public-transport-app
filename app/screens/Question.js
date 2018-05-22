import React, { Component } from 'react';
import { Container, Header, Button, Content, ActionSheet, Text } from "native-base";
let BUTTONS = ["Trolleybus 10", "Trolleybus 11", "Bus 26", "Non of above", "Cancel"];
let DESTRUCTIVE_INDEX = 3;
let CANCEL_INDEX = 4;


const popUpOpen = () => ActionSheet.show(
  {
    options: BUTTONS,
    cancelButtonIndex: CANCEL_INDEX,
    destructiveButtonIndex: DESTRUCTIVE_INDEX,
    title: "Open Pop Up"
  },
  buttonIndex => {
    this.setState({ clicked: BUTTONS[buttonIndex] });
  }
);

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Header />
        <Content padder>
          <Button
            onPress={popUpOpen}
          >
            <Text>Open Pop Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Question;
