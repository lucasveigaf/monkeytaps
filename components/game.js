import React, { Component } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import TappableBox from './tappable-box';
import levels from '../utils/levels';
import Background from './background';

class Game extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Level ${navigation.getParam('level', 1)}`,
    headerLeft: (<Icon name="arrow-back"
                    size={25}
                    color="white"
                    style={{ marginLeft: 8 }}
                    onPress={() => navigation.popToTop()}
                  />
                ),
  });

  initialState = {
    tappingBoxes: [],
    validTapsCount: 0,
    tappingNumberOrder: [],
    showBoxNumbers: false,
    levelWinCount: 0,
  }

  state = this.initialState

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener("didFocus", () => {
        this.setState(this.initialState)
        this.startGame()
      }),
      this.props.navigation.addListener("willBlur", () => {
        this.setState({
        })
      })
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
    clearTimeout(this.timeoutHandle);
  }

  generateArray = (n) => Array.from(Array(n), (_,x) => x)

  shuffle = (o, quantityToSlice) => {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o.slice(0, quantityToSlice)
  };

  startGame = () => {
    const level = this.props.navigation.getParam('level', 1)
    const levelObj = levels[level];

    const indexesArray = this.generateArray(levelObj.boxCount);
    // Generates array of three random indexes out of 100
    const indexesToMark = this.shuffle(indexesArray, levelObj.validBoxCount);

    const boxNumbersArray = this.generateArray(levelObj.boxNumberLimit);
    // Generates array of random numbers from 1 to 200
    const boxNumbersShuffled = this.shuffle(boxNumbersArray);

    let tappingNumbers = []
    const tappingBoxes = indexesArray.map((obj, i) => {
      const isValid = indexesToMark.includes(i);
      const boxNumber = boxNumbersShuffled[i];
      if (isValid) {
        tappingNumbers.push(boxNumber)
      }
      return {
        isValid: isValid,
        number: boxNumber,
        isTapped: false,
        originalIndex: i,
      }
    })

    const tappingNumberOrder = tappingNumbers.sort((a, b) => a - b)

    this.setState({
      tappingBoxes,
      tappingNumberOrder,
      showBoxNumbers: true,
    })

    this.startCountdown();
  }

  startCountdown = () => {
    const level = this.props.navigation.getParam('level', 1)
    const { secondsToReveal } = levels[level];
    this.timeoutHandle = setTimeout(() => {
      this.setState({ showBoxNumbers: false })
    }, secondsToReveal * 1000);
  }

  gameOver = () => {
    clearTimeout(this.timeoutHandle);
    this.setState(this.initialState) 
    return this.props.navigation.navigate('LoseScreen');
  }

  winGame = () => {
    clearTimeout(this.timeoutHandle);

    const level = this.props.navigation.getParam('level', 1)
    const levelObj = levels[level];

    const { winsUntilNextLevel } = levelObj
    const { levelWinCount } = this.state;
    const newLevelWinCount = levelWinCount + 1
    const isNewLevel = newLevelWinCount === winsUntilNextLevel
    if (isNewLevel) {
      if (!levels[level + 1]) {
        return this.props.navigation.navigate('EndScreen');
      }
      return this.props.navigation.navigate('NewLevel', {
        level: level,
        isFirstGame: false,
      })
    }

    this.setState({
      ...this.initialState,
      levelWinCount: 0
    })

    this.startGame()
  }

  handleTap = (boxIndex) => {
    const { tappingBoxes, validTapsCount, tappingNumberOrder } = this.state;

    const level = this.props.navigation.getParam('level', 1)
    const levelObj = levels[level];
    const { validBoxCount } = levelObj;

    const tappedBox = tappingBoxes[boxIndex];
    const correctNumberToTap = tappingNumberOrder[validTapsCount];

    if (tappedBox.number !== correctNumberToTap) {
      return this.gameOver();
    }
  
    const newValidTapsCount = validTapsCount + 1

    if (validBoxCount === newValidTapsCount) {
      return this.winGame();
    }
    
    const newTappingBoxes = tappingBoxes.map((box, i) => {
      if (i === boxIndex) {
        return { ...box, isTapped: true };
      } return box;
    });

    this.setState({
      tappingBoxes: newTappingBoxes,
      validTapsCount: newValidTapsCount
    });
  }

  render() {
    const { tappingBoxes, showBoxNumbers } = this.state;
    const level = this.props.navigation.getParam('level', 1)
    const levelObj = levels[level];
    // if theres not a next level
    if (!levelObj) {
      return this.props.navigation.navigate('EndScreen')
    }

    return (
      <Background>
        <View style={styles.container}>
          <View style={styles.boxContainer}>
            <FlatList
              contentContainerStyle={styles.boxesWrapper}
              data={tappingBoxes}
              keyExtractor={item => String(item.number)}
              numColumns={levelObj.boxesPerRow}
              key={levelObj.boxesPerRow}
              extraData={showBoxNumbers}
              renderItem={({ item }) => (
                  <TappableBox
                    number={item.number}
                    isValid={item.isValid}
                    isTapped={item.isTapped}
                    showBoxNumbers={showBoxNumbers}
                    onPress={() => this.handleTap(item.originalIndex)}
                  />
                )
              }
            />
          </View>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  boxContainer: {
    paddingVertical: 20,
    flex: 1,
    flexWrap: "wrap",
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  boxesWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 10,
  }
});

export default withNavigation(Game);