import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../../themes/RichText';
import CarouselSlide from '../../themes/CarouselSlide';

export class ObjectStep extends Component {
    state = {
        object: '',
    };

    changeObject = e => {
        this.setState({ object: e.target.value });
    };

    render() {
        const { objectIndication, className } = this.props;
        const { object } = this.state;

        return (
            <CarouselSlide className={className}>
                <p>
                    Parce que les messages uniques ont plus d&#39;impact, nous
                    vous invitons à personnaliser son sujet.
                </p>
                <textarea
                    rows="5"
                    value={object}
                    onChange={this.changeObject}
                />
                <RichText html={objectIndication} />
            </CarouselSlide>
        );
    }
}

ObjectStep.propTypes = {
    className: PropTypes.string,
    objectIndication: PropTypes.string,
};

export default glamorous(ObjectStep)({
    '& .rich-text': {
        fontSize: '1rem',
        fontStyle: 'italic',
    },
    '& textarea': {
        width: '80%',
        fontSize: 24,
        margin: '2rem 3rem',
    },
});
