import React, { Component } from 'react'
import { View, StyleSheet, Animated, Text } from 'react-primitives';
import glamorous from 'glamorous-primitives';

const styles = StyleSheet.create({
  app: {
    flex: 1
  },
  appHeader: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appTitle: {
    fontSize: 16,
    color: 'white'
  },
  appIntro: {
    flex: 2,
    fontSize: 30,
    textAlign: 'center'
  }
});

const StyledTitle = glamorous.text({
  fontSize: 16,
  color: 'white'
});

class App extends Component {
  state = {
    text: '',
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 10000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }
  render() {
    const { fadeAnim } = this.state;
    return (
      <Animated.View style={[styles.app, { opacity: fadeAnim }]}>
        <View style={styles.appHeader}>
          <StyledTitle>Welcome to React ⚛️</StyledTitle>
        </View>
      </Animated.View>
    );
  }
}

export default App;
