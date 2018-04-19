import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-primitives';

import ScrollView from './gateway/ScrollView';

const { width } = Dimensions.get('window');
const height = width * 0.8;

const items = [1, 2, 3];

class Carousel extends Component {
    render() {
        return (
            <View style={styles.scrollContainer}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                >
                    {items.map(item => (
                        <View key={item} style={styles.item}>
                            <Text style={styles.text}>{item}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

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
