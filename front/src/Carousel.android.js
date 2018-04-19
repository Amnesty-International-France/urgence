import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-primitives';
import PropTypes from 'prop-types';

import ScrollView from './gateway/ScrollView';

const { width } = Dimensions.get('window');
const height = width * 0.8;

const Carousel = ({ children }) => (
    <View style={styles.scrollContainer}>
        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
        >
            {children.map((child, index) => (
                <View key={index} style={styles.item}>
                    {child}
                </View>
            ))}
        </ScrollView>
    </View>
);

Carousel.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
    scrollContainer: {
        height,
    },
    item: {
        width,
        height,
    },
    text: {
        textAlign: 'center',
        marginTop: '50%',
        fontSize: 32,
    },
});

export default Carousel;
