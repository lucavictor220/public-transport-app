import { Root } from "native-base";
import React, { Component } from 'react';
import { RootStack } from './config/routes';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Root>
        <RootStack />
      </Root>
    )
  }
}


export default App;
