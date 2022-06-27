import React, { Component } from 'react';
import classnames from 'classnames';

// @ts-expect-error TS(6142): Module './MessageSection' was resolved to '/home/g... Remove this comment to see the full error message
import MessageSection from './MessageSection';
// @ts-expect-error TS(6142): Module './ShowButton' was resolved to '/home/guill... Remove this comment to see the full error message
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="letter">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <MessageSection
                            key={key}
                            className="letter-message-section"
                            content={value}
                        />
                    ))}
                    {letterOverflow && (
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <span
                            className={classnames(
                                'end',
                                showAllText || !letterOverflow ? 'pleinEnd' : 'opacifyEnd',
                            )}
                        />
                    )}
                </div>
                {letterOverflow && (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <ShowButton showAllText={showAllText} action={this.setShowMode} />
                )}
            </div>
        );
    }
}

export default LetterView;
