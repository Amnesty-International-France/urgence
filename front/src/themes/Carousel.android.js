import React from 'react';
import { Dimensions } from 'react-primitives';
import PropTypes from 'prop-types';
import glamorous from 'glamorous-primitives';

import ScrollView from './gateway/ScrollView';

const { width, height } = Dimensions.get('window');

const ScrollContainer = glamorous.view({
    height,
});

const ChildContainer = glamorous.view({
    width,
    height,
});

const Carousel = ({ children }) => (
    <ScrollContainer>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {children.map((child, index) => (
                <ChildContainer key={index}>{child}</ChildContainer>
            ))}
        </ScrollView>
    </ScrollContainer>
);

Carousel.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Carousel;
