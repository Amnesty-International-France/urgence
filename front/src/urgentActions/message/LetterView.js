import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import MessageSection from './MessageSection';
import ShowButton from './ShowButton';

class LetterView extends Component {
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
                    {messageTemplate.map(({ value }, key) => (
                        <MessageSection
                            key={key}
                            className="letter-message-section"
                            content={value}
                        />
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
                {letterOverflow && (
                    <ShowButton showAllText={showAllText} action={this.setShowMode} />
                )}
            </div>
        );
    }
}

LetterView.propTypes = {
    messageTemplate: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
        }),
    ),
};

export default LetterView;
