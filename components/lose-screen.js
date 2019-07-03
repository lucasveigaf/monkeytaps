import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from './background';

class LoseScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'You lost',
    headerLeft: (<Icon name="arrow-back"
                    size={25}
                    color="white"
                    style={{ marginLeft: 8 }}
                    onPress={() => navigation.popToTop()}
                  />
                ),
  });

  render () {
    return (
      <Background>
        <View style={styles.container}>
          <Text style={styles.big}>
            Oh :(
          </Text>
          <Text style={styles.medium}>
            It seems you tapped the wrong box...
          </Text>
          <Button
            style={styles.small}
            onPress={() => this.props.navigation.navigate('NewLevel', {
              level: 1,
              isFirstGame: true,
            })}
            title='Try again'
          />
        </View>
      </Background>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  big: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  medium: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  small: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
});

export default withNavigation(LoseScreen);