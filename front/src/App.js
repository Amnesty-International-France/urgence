import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-primitives';
import glamorous from 'glamorous-primitives';
import { Router, Link, Route } from './gateway/ReactRouter';

const styles = StyleSheet.create({
    app: {
        flex: 1,
    },
    appHeader: {
        flex: 1,
        backgroundColor: '#222',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appTitle: {
        fontSize: 16,
        color: 'white',
    },
    appIntro: {
        flex: 2,
        fontSize: 30,
        textAlign: 'center',
    },
});

const StyledTitle = glamorous.text({
    fontSize: 16,
    // color: 'white',
});

const Home = () => <StyledTitle>Home</StyledTitle>;

const About = () => <StyledTitle>About</StyledTitle>;

class App extends Component {
    render() {
        return (
            <Router>
                <View>
                    <View>
                        <View>
                            <Link to="/">
                                <Text>Home</Text>
                            </Link>
                        </View>
                        <View>
                            <Link to="/about">
                                <Text>About</Text>
                            </Link>
                        </View>
                    </View>

                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                </View>
            </Router>
        );
    }
}

export default App;
