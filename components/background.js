import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';

class Background extends Component {
  render() {
    return (
      <LinearGradient
        colors={['#43C6AC', '#43C6AC', '#43C6AC', '#F8FFAE']}
        locations={[0, 0.3, 0.6, 1]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{
          flex: 1,
        }}
      >
          {this.props.children}
      </LinearGradient>
    );
  }
}

export default Background;