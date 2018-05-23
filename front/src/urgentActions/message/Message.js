import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { white, black } from '../../themes/colors';
import MessageStep from './MessageStep';
import { withBlackLogo } from '../../themes/ThemeContext';

const styles = {
    padding: '105px 0 53px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: white,
    color: black,
    height: '100vh',
    '& .action': {
        margin: '62px 1em 0',
    },
};

export const Message = ({ messageTemplate, loading, action, className }) =>
    loading ? (
        <p className="loading">Loading...</p>
    ) : (
        <Fragment>
            {(!messageTemplate || !messageTemplate.length) && (
                <p className="error">Cette action urgente n&#39;existe plus.</p>
            )}

            {messageTemplate &&
                messageTemplate.length > 0 && (
                    <div className={className}>
                        <div>
                            {messageTemplate.map(({ value }, index) => (
                                <MessageStep key={value} content={value} darken={!!(index % 2)} />
                            ))}
                        </div>
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

export default glamorous(withBlackLogo(Message))(styles);
