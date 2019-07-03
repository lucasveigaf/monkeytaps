import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Background from './background';

class Home extends Component {
  static navigationOptions = {
		header: null
  }

  render() {
    return (
      <Background>
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to MonkeyTaps!</Text>
          <Button
            onPress={() => this.props.navigation.navigate('NewLevel', {
              level: 1,
              isFirstGame: true,
            })}
            title='Play!'
          />
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
});

export default Home;