import React, { Component } from 'react';
import { RootStack } from './config/routes';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <RootStack />
    )
  }
}


export default App;
