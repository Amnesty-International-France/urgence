import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Carousel from '../../themes/Carousel';
import MessageStep from './MessageStep';

const Message = ({ messageTemplate, className }) => (
    <Fragment>
        {(!messageTemplate || !messageTemplate.length) && (
            <p className="error">This urgent action does not exist anymore.</p>
        )}

        {messageTemplate &&
            messageTemplate.length > 0 && (
                <Carousel
                    initialSlide={0}
                    className={className}
                    afterChange={this.afterChange}
                    vertical={true}
                >
                    {messageTemplate.map(({ value }) => (
                        <MessageStep key={value} content={value} />
                    ))}
                </Carousel>
            )}
    </Fragment>
);

Message.propTypes = {
    messageTemplate: PropTypes.arrayOf(
        PropTypes.shape({ value: PropTypes.string.isRequired }),
    ),
    className: PropTypes.string,
};

export default Message;
