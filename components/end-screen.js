import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

class EndScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'The end',
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
      <View style={styles.container}>
        <Text style={styles.big}>
          Congratulations!
        </Text>
        <Text style={styles.medium}>
          You reached the end game!
        </Text>
        <Button
          style={styles.small}
          onPress={() => this.props.navigation.navigate('NewLevel', {
            level: 1,
            isFirstGame: true,
          })}
          title='Play again'
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
    backgroundColor: 'black',
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

export default withNavigation(EndScreen);