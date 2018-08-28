import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import classnames from 'classnames';

import { white, black } from '../../themes/colors';
import MessageStep from './MessageStep';
import { withBlackLogo } from '../../themes/ThemeContext';
import Link from '../Link';
import { LinkType } from '../../propTypes';

const styles = {
    padding: '105px 0 53px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: white,
    color: black,
    height: '100%',
    '& .action': {
        margin: '62px 1em 53px',
        '@media (min-aspect-ratio: 1/1)': {
            alignSelf: 'flex-end',
        },
    },
    '@media (min-width: 1024px)': {
        padding: '10vh 10vw',

        '& a': {
            alignSelf: 'flex-end',
        },
    },
};

export const Message = ({ messageTemplate, action, className, link }) => (
    <Fragment>
        {(!messageTemplate || !messageTemplate.length) && (
            <p className="error">Cette action urgente n&#39;existe plus.</p>
        )}

        {messageTemplate &&
            messageTemplate.length > 0 && (
                <div className={classnames('message', className)}>
                    <div>
                        {messageTemplate.map(({ value }, index) => (
                            <MessageStep key={value} content={value} darken={!!(index % 2)} />
                        ))}
                    </div>
                    <div className="action">
                        {action}
                        {link && link.url && <Link {...link} />}
                    </div>
                </div>
            )}
    </Fragment>
);

Message.propTypes = {
    messageTemplate: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired })),
    link: LinkType,
    objectIndication: PropTypes.string.isRequired,
    className: PropTypes.string,
    action: PropTypes.node.isRequired,
};

export default glamorous(withBlackLogo(Message))(styles);
