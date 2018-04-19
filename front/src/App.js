import React, { Component } from 'react';
import { View } from 'react-primitives';

import { Router, Route } from './gateway/ReactRouter';
import generateUrl from './services/generateUrl';
import Home from './Home';
import UA from './UA';

class App extends Component {
    render() {
        return (
            <Router>
                <View>
                    <Route exact path={generateUrl('home')} component={Home} />
                    <Route path={generateUrl('ua')} component={UA} />
                </View>
            </Router>
        );
    }
}

export default App;
