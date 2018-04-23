import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HybridApp from './src/App';

export default class NativeApp extends Component {
    render() {
        const { client } = this.props;
        return <HybridApp client={client} />;
    }
}

NativeApp.propTypes = {
    client: PropTypes.object.isRequired,
};
