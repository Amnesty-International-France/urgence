import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import MessageStep from './MessageStep';

export const Message = ({ messageTemplate, loading, action }) =>
    loading ? (
        <p className="loading">Loading...</p>
    ) : (
        <Fragment>
            {(!messageTemplate || !messageTemplate.length) && (
                <p className="error">Cette action urgente n&#39;existe plus.</p>
            )}

            {messageTemplate &&
                messageTemplate.length > 0 && (
                    <div>
                        {messageTemplate.map(({ value }, index) => (
                            <MessageStep key={value} content={value} darken={!!(index % 2)} />
                        ))}
                        <div className="action">{action}</div>
                    </div>
                )}
        </Fragment>
    );

Message.propTypes = {
    messageTemplate: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired })),
    objectIndication: PropTypes.string.isRequired,
    className: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    action: PropTypes.node.isRequired,
};

export default Message;
