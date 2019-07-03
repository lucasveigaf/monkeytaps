import React from 'react';
import { Animated, Text} from 'react-native';
import { withNavigation } from 'react-navigation';

import levels from '../utils/levels';
import Background from './background';

class NewLevelView extends React.Component {
  static navigationOptions = {
		header: null
  }

  state = {
    fadeAnim: new Animated.Value(1),
    currentSec: levels[this.props.navigation.getParam('level', 1)].secondsForCountdown,
    finished: false,
  }

  getLevel = () => (
    levels[this.props.navigation.getParam('level', 1)]
  )

  componentDidMount() {
    const { secondsForCountdown } = this.getLevel();
    this.subs = [
      this.props.navigation.addListener("didFocus", () => {
        this.setState({
          fadeAnim: new Animated.Value(1),
          currentSec: secondsForCountdown,
          finished: false,
        }, this.beginAnimation(secondsForCountdown))
      })
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  animationStep = (callback) => () => (
    Animated.sequence(
      [
        Animated.timing(this.state.fadeAnim, {
          toValue: 1,
          duration: 0
        }),
        Animated.timing(this.state.fadeAnim, {
          toValue: 0,
          duration: 400
        }),
      ]
    ).start(callback)
   )

   beginAnimation = (value) => {
    const { currentSec } = this.state;
    const level = this.props.navigation.getParam('level', 1);
    const isFirstGame = this.props.navigation.getParam('isFirstGame', false);

    if (value === 0) {
      return this.props.navigation.navigate('Game', {
        level: isFirstGame ? 1 : level + 1,
      })
    }

    this.setState({ currentSec: currentSec - 1 }, this.animationStep(() => {
     this.beginAnimation(value - 1)
    }))
   }

  render() {
    let { fadeAnim, currentSec } = this.state;
    return (
      <Background>
        <Animated.View
          style={{
            opacity: 1,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          <Text style={{
            fontSize: 22,
            color: 'white',
          }}>
            New level!
          </Text>
          <Animated.Text style={{
            color: 'white',
            opacity: fadeAnim,
            fontSize: 44,
            textAlign: 'center',
            margin: 10,
            }}
          >
            {currentSec}
          </Animated.Text>
        </Animated.View>
      </Background>
    );
  }
}

export default withNavigation(NewLevelView);
