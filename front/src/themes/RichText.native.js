import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-primitives';

// import HTML from 'react-native-render-html';

export const RichText = ({ html }) => <Text>{html}</Text>;

RichText.propTypes = {
    html: PropTypes.string,
};

export default RichText;
