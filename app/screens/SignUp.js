import React from 'react';
import { StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Left, Title, Icon, Body, Right } from 'native-base';


class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: null,
    }
  }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
          <Button full onPress={this.handleSignUp} style={styles.signUpButton}>
            <Text>Sign Up</Text>
          </Button>
          <Button onPress={() => this.props.navigation.navigate('Login')}>
            <Text>Already have an account? Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  signUpButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
});

export default SignUp;