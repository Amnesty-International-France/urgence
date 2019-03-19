import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { compose } from 'recompose';
import classnames from 'classnames';

import { white, black } from '../../themes/colors';
import MessageStep from './MessageStep';
import ShowButton from './ShowButton';
import { withYellowLogo } from '../../themes/ThemeContext';
import { withSessionData } from '../../SessionDataContext';
import Link from '../Link';
import { LinkType } from '../../propTypes';
import Input from '../../themes/Input';
import RadioButton from '../../themes/RadioButton';

const analyticsCategory = 'MessageForm';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '16px',
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    padding: '100px 20px 20px 20px',
    color: black,
    backgroundColor: white,
    '& .action': {
        display: 'flex',
        margin: '1em 0',
    },
    '@media (max-width: 350px)': {
        fontSize: '0.8em',
    },
    '@media (min-width: 1024px)': {
        padding: '10vh 10vw',
    },
    '& .importantText': {
        fontWeight: 'bold',
    },
    '& .letter': {
        border: 'solid 1px',
        borderColor: 'rgba(0, 0, 0, 0.20)',
        boxShadow:
            '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
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
        backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0), white)',
        transition: 'all 1s',
    },
    '& .opacifyEnd': {
        paddingTop: '30vh',
    },
    '& .pleinEnd': {
        paddingTop: '10px',
    },
    '& .objectIndication': {
        fontStyle: 'italic',
        opacity: '0.5',
    },
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
                    {messageTemplate.map(({ value }, key) => (
                        <MessageStep key={key} content={value} />
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
    messageTemplate: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired })),
};

export class FormStep extends Component {
    setObject = event => {
        this.props.setObject(event.target.value);
    };
    setCivility = event => {
        this.props.setCivility(event.target.value);
    };
    setSurname = event => {
        this.props.setSurname(event.target.value);
    };
    setName = event => {
        this.props.setName(event.target.value);
    };
    setShowErrorState = field => {
        if (!this.state[field]) this.setState({ [field]: true });
    };
    render() {
        const { objectIndication, object, civility, surname, name } = this.props;
        return (
            <Fragment>
                <Input
                    className="object"
                    value={object}
                    onChange={this.setObject}
                    error={!object}
                    analyticsCategory={analyticsCategory}
                    label="Objet de l'e-mail *"
                />
                <p className="objectIndication">{objectIndication}</p>
                <RadioButton
                    value={civility}
                    name="civility"
                    onChange={this.setCivility}
                    error={!civility}
                    analyticsCategory={analyticsCategory}
                    label="Civilité *"
                    autoComplete="civility"
                    choices={['M.', 'Mme.', 'Autre']}
                />
                <Input
                    className="surname"
                    value={surname}
                    onChange={this.setSurname}
                    error={!surname}
                    analyticsCategory={analyticsCategory}
                    autoComplete="firstname"
                    label="Votre prénom *"
                />
                <Input
                    className="name"
                    value={name}
                    onChange={this.setName}
                    error={!name}
                    analyticsCategory={analyticsCategory}
                    autoComplete="name"
                    label="Votre nom *"
                />
            </Fragment>
        );
    }
}

FormStep.propTypes = {
    className: PropTypes.string,
    objectIndication: PropTypes.string,
    object: PropTypes.string,
    civility: PropTypes.string,
    surname: PropTypes.string,
    name: PropTypes.string,
    setObject: PropTypes.func.isRequired,
    setCivility: PropTypes.func.isRequired,
    setSurname: PropTypes.func.isRequired,
    setName: PropTypes.func.isRequired,
};

export const Message = ({
    messageTemplate,
    objectIndication,
    action,
    className,
    link,
    setObject,
    setCivility,
    setSurname,
    setName,
    object,
    civility,
    surname,
    name,
}) => (
    <Fragment>
        {(!messageTemplate || !messageTemplate.length) && (
            <p className="error">Cette action urgente n&#39;existe plus.</p>
        )}

        {messageTemplate && messageTemplate.length > 0 && (
            <div className={classnames('message', className)}>
                <p>
                    Pour agir plus vite,&nbsp;
                    <strong className="importantText"> nous vous proposons ce message :</strong>
                </p>
                <LetterView messageTemplate={messageTemplate} />
                <p>
                    Parce que les messages uniques ont plus d&#39;impact,&nbsp;
                    <strong className="importantText">
                        {' '}
                        nous vous invitons à le personnaliser.
                    </strong>
                </p>
                <FormStep
                    objectIndication={objectIndication}
                    object={object}
                    civility={civility}
                    surname={surname}
                    name={name}
                    setObject={setObject}
                    setCivility={setCivility}
                    setSurname={setSurname}
                    setName={setName}
                />
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
    setObject: PropTypes.func.isRequired,
    setCivility: PropTypes.func.isRequired,
    setSurname: PropTypes.func.isRequired,
    setName: PropTypes.func.isRequired,
    object: PropTypes.string,
    civility: PropTypes.string,
    surname: PropTypes.string,
    name: PropTypes.string,
    action: PropTypes.node.isRequired,
};

export default glamorous(
    compose(
        withYellowLogo,
        withSessionData,
    )(Message),
)(styles);
