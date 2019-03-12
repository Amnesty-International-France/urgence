import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import classnames from 'classnames';

import { white, black } from '../../themes/colors';
import MessageStep from './MessageStep';
import { withBlackLogo } from '../../themes/ThemeContext';
import Link from '../Link';
import { LinkType } from '../../propTypes';

const styles = {
    padding: '4em 1em 1em 1em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: white,
    color: black,
    height: '100%',
    '& .action': {
        margin: '1em 0',
        '@media (min-aspect-ratio: 1/1)': {
            alignSelf: 'flex-end',
        },
    },
    '@media (max-width: 350px)': {
        fontSize: '0.7em',
    },
    '@media (min-width: 1024px)': {
        padding: '10vh 10vw',

        '& a': {
            alignSelf: 'flex-end',
        },
    },
    '& .importantText': {
        fontWeight: 'bold',
    },
    '& #letter': {
        border: 'solid 1px',
        color: black,
        padding: '1em 0',
        margin: '1em 0',
    },
    '& .showOnlyBegin': {
        WebkitMaskImage:
            '-webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0)))',
        maxHeight: '48vh',
        overflow: 'hidden',
    },
    '& .showButton': {
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        '&:active': {
            color: 'rgba(0, 0, 0, 0.5)',
        },
    },
    '& .downText': {
        top: 8,
        position: 'relative',
    },
    '& .upText': {
        top: -4,
        position: 'relative',
    },
};

const ShowButton = ({ showAllText, action }) => (
    <span className="showButton" onClick={action}>
        {showAllText ? (
            <span>
                Voir moins&nbsp;&nbsp;
                <b className="upText">︿</b>
            </span>
        ) : (
            <span>
                Voir plus&nbsp;&nbsp;
                <b className="downText">﹀</b>
            </span>
        )}
    </span>
);

ShowButton.propTypes = {
    showAllText: PropTypes.bool,
    action: PropTypes.func.isRequired,
};

ShowButton.defaultProps = {
    extended: false,
};

export class Message extends Component {
    state = { showAllText: false, letterOverflow: true };

    setShowMode = () => {
        this.setState({ showAllText: !this.state.showAllText });
    };

    componentDidMount() {
        const height = document.getElementById('letter').clientHeight;
        this.setState({ letterOverflow: height > 310 });
    }

    render() {
        const { messageTemplate, action, className, link } = this.props;
        const { showAllText, letterOverflow } = this.state;
        return (
            <Fragment>
                {(!messageTemplate || !messageTemplate.length) && (
                    <p className="error">Cette action urgente n&#39;existe plus.</p>
                )}

                {messageTemplate &&
                    messageTemplate.length > 0 && (
                        <div className={classnames('message', className)}>
                            <span>
                                Pour agir plus vite,{' '}
                                <b className="importantText"> nous vous proposons ce message :</b>
                            </span>
                            <div id="letter">
                                <div
                                    className={classnames(
                                        showAllText || !letterOverflow ? '' : 'showOnlyBegin',
                                    )}
                                >
                                    {messageTemplate.map(({ value }) => (
                                        <MessageStep key={value} content={value} />
                                    ))}
                                </div>
                                {letterOverflow && (
                                    <ShowButton
                                        showAllText={showAllText}
                                        action={this.setShowMode}
                                    />
                                )}
                            </div>
                            <span>
                                Parce que les messages uniques ont plus d&apos;impact,{' '}
                                <b className="importantText">
                                    {' '}
                                    nous vous invitons à le personnaliser.
                                </b>
                            </span>
                            <div className="action">
                                {action}
                                {link && link.url && <Link {...link} />}
                            </div>
                        </div>
                    )}
            </Fragment>
        );
    }
}

Message.propTypes = {
    messageTemplate: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired })),
    link: LinkType,
    objectIndication: PropTypes.string.isRequired,
    className: PropTypes.string,
    action: PropTypes.node.isRequired,
};

export default glamorous(withBlackLogo(Message))(styles);
