import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../../themes/RichText';
import { MailTo } from '../../themes/MailTo';
import CarouselSlide from '../../themes/CarouselSlide';
import sessionData from '../../sessionData';
import { templateToBodyText } from './templateToBodyText';

export class ObjectStep extends Component {
    state = {
        object: sessionData.getMailObject() || '',
    };

    changeObject = e => {
        const object = e.target.value;
        this.setState({ object });
        sessionData.setMailObject(object);
    };

    render() {
        const { objectIndication, messageTemplate, className } = this.props;
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
                <MailTo
                    label="Send mail"
                    disabled={!object}
                    subject={object}
                    body={templateToBodyText(messageTemplate)}
                />
            </CarouselSlide>
        );
    }
}

ObjectStep.propTypes = {
    className: PropTypes.string,
    objectIndication: PropTypes.string,
    messageTemplate: PropTypes.arrayOf(
        PropTypes.shape({ value: PropTypes.string.isRequired }),
    ),
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
