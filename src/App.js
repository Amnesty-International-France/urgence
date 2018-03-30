import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Animated } from 'react-native';
import { Text } from 'glamorous-native';

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
          <Text style={styles.appTitle}>Welcome to React ⚛️</Text>
        </View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </Animated.View>
    )
  }
}

export default App;
