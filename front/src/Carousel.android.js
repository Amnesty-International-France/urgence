import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-primitives';
import PropTypes from 'prop-types';
import Sideswipe from 'react-native-sideswipe';

const { width } = Dimensions.get('window');

class Carousel extends Component {
    state = {
        currentIndex: 0,
    };
    renderItem({ item }) {
        return <View style={styles.container}>{item}</View>;
    }

    render() {
        const children = this.props.children;

        return (
            <Sideswipe
                index={this.state.currentIndex}
                onIndexChange={index =>
                    this.setState(() => ({ currentIndex: index }))
                }
                data={children}
                renderItem={this.renderItem}
                itemWidth={width}
                style={{ width }}
            />
        );
    }
}

Carousel.propTypes = {
    children: PropTypes.node.isRequired,
};

var styles = StyleSheet.create({
    container: {
        width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
});

export default Carousel;
