import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import classnames from 'classnames';

import { white, black } from '../../themes/colors';
import MessageStep from './MessageStep';
import { withYellowLogo } from '../../themes/ThemeContext';
import Link from '../Link';
import { LinkType } from '../../propTypes';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '16px',
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
        fontSize: '0.8em',
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
    '& .letter': {
        border: 'solid 1px',
        borderColor: 'rgb(0, 0, 0, 0.20)',
        color: black,
        padding: '1em 0 0 0',
        margin: '1em 0',
    },
    '& .content': {
        fontSize: '14px',
        position: 'relative',
        transition: 'all cubic-bezier(0.25, 0.1, 0.25, 1) 1s',
    },
    '& .showFullTextContent': {
        maxHeight: '548vh',
    },
    '& .showOnlyBeginContent': {
        maxHeight: '42vh',
        overflow: 'hidden',
    },
    '& .end': {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        margin: 0,
        backgroundImage: 'linear-gradient(to bottom, transparent, white)',
        transition: 'all 1s',
    },
    '& .opacifyEnd': {
        paddingTop: '30vh',
    },
    '& .pleinEnd': {
        paddingTop: '10px',
    },
    '& .showButton': {
        fontSize: '16px',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 0',
        '&:active': {
            color: 'rgba(0, 0, 0, 0.5)',
        },
        background: white,
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
                <strong className="upText">︿</strong>
            </span>
        ) : (
            <span>
                Voir plus&nbsp;&nbsp;
                <strong className="downText">﹀</strong>
            </span>
        )}
    </span>
);

ShowButton.propTypes = {
    showAllText: PropTypes.bool,
    action: PropTypes.func.isRequired,
};

ShowButton.defaultProps = {
    showAllText: false,
};

export class LetterView extends Component {
    constructor(props) {
        super(props);
        this.state = { showAllText: false, letterOverflow: true };
        this.contentText = React.createRef();
    }

    setShowMode = () => {
        this.setState({ showAllText: !this.state.showAllText });
    };

    componentDidMount() {
        const totalHeight = this.contentText.current.scrollHeight;
        const clippedHeight = this.contentText.current.clientHeight;
        this.setState({
            letterOverflow: totalHeight > clippedHeight,
        });
    }

    render() {
        const { messageTemplate } = this.props;
        const { showAllText, letterOverflow } = this.state;
        return (
            <div className="letter">
                <div
                    ref={this.contentText}
                    className={classnames(
                        'content',
                        showAllText || !letterOverflow
                            ? 'showFullTextContent'
                            : 'showOnlyBeginContent',
                    )}
                >
                    {messageTemplate.map(({ value }) => (
                        <MessageStep key={value} content={value} />
                    ))}
                    {letterOverflow && (
                        <span
                            className={classnames(
                                'end',
                                showAllText || !letterOverflow ? 'pleinEnd' : 'opacifyEnd',
                            )}
                        />
                    )}
                </div>
                <ShowButton showAllText={showAllText} action={this.setShowMode} />
            </div>
        );
    }
}

LetterView.propTypes = {
    messageTemplate: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired })),
};

export const Message = ({ messageTemplate, action, className, link }) => (
    <Fragment>
        {(!messageTemplate || !messageTemplate.length) && (
            <p className="error">Cette action urgente n&#39;existe plus.</p>
        )}

        {messageTemplate && messageTemplate.length > 0 && (
            <div className={classnames('message', className)}>
                <span>
                    Pour agir plus vite,
                    <strong className="importantText"> nous vous proposons ce message :</strong>
                </span>
                <LetterView messageTemplate={messageTemplate} />
                <span>
                    Parce que les messages uniques ont plus d&apos;impact,
                    <strong className="importantText">
                        &nbsp;nous vous invitons à le personnaliser.
                    </strong>
                </span>
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

export default glamorous(withYellowLogo(Message))(styles);
