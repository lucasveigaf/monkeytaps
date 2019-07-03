import React from 'react';
import { StyleSheet, Text, Box, TouchableOpacity } from 'react-native';

const TappableBox = ({ number, isValid, isTapped, onPress, showBoxNumbers }) => (
  <TouchableOpacity
    style={styles.box}
    onPress={showBoxNumbers || isTapped ? null : onPress}
  >
      {showBoxNumbers || isTapped
        ? <Text style={{ color: isValid ? 'red' : 'black' }}>{ number}</Text>
        : <Text style={{ color: isTapped ? '#9C9C9C' : '#B8E3AF' }}></Text>
      }
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    backgroundColor: "#B8E3AF",
    flexGrow: 1,
    margin: 4,
    padding: 5,
    paddingTop: 20,
    paddingBottom: 20,
    flexBasis: 0,
  },
  boxText: {
    width: 10,
  }
});

export default TappableBox;