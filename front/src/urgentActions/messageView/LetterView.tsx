import React, { Component } from 'react';
import classnames from 'classnames';

import MessageSection from './MessageSection';
import ShowButton from './ShowButton';

type Props = {
    messageTemplate?: {
        value: string;
    }[];
};

type State = any;

class LetterView extends Component<Props, State> {
    contentText: any;

    constructor(props: Props) {
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
                    {/* @ts-expect-error TS(2532): Object is possibly 'undefined'. */}
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

export default LetterView;
