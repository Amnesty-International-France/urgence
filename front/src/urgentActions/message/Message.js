import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { compose } from 'recompose';
import classnames from 'classnames';

import { white, black } from '../../themes/colors';
import MessageSection from './MessageSection';
import ShowButton from './ShowButton';
import { withYellowLogo } from '../../themes/ThemeContext';
import { withSessionData } from '../../DataContext';
import Link from '../Link';
import { LinkType } from '../../propTypes';
import Input, { isCorrectEmail } from '../../themes/Input';
import RadioButton from '../../themes/RadioButton';

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
    '@media (max-width: 1024px)': {
        marginBottom: 40,
    },
    '& .action': {
        '@media (min-width: 1024px)': {
            display: 'flex',
            margin: '1em 0',
        },
        '@media (max-width: 1024px)': {
            backgroundColor: white,
            margin: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            position: 'fixed',
            bottom: 0,
        },
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
    '& .formStep': {
        margin: '5px 0px',
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
                        <MessageSection key={key} content={value} />
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

export const FormStep = ({
    email,
    objectIndication,
    object,
    civility,
    firstname,
    lastname,
    analyticsCategory,
    step,
    setEmail,
    setObject,
    setCivility,
    setFirstname,
    setLastname,
}) => {
    const handleChangeEmail = event => {
        setEmail(event.target.value);
    };

    const handleChangeObject = event => {
        setObject(event.target.value);
    };

    const handleChangeCivility = event => {
        setCivility(event.target.value);
    };

    const handleChangeFirstname = event => {
        setFirstname(event.target.value);
    };

    const handleChangeLastname = event => {
        setLastname(event.target.value);
    };

    return (
        <Fragment>
            <Input
                className="email"
                type="email"
                value={email}
                onChange={handleChangeEmail}
                error={!isCorrectEmail(email)}
                autoComplete="email"
                analyticsCategory={analyticsCategory}
                step={step}
                label="Votre adresse e-mail *"
            />
            <Input
                className="object"
                value={object}
                onChange={handleChangeObject}
                error={!object}
                analyticsCategory={analyticsCategory}
                step={step}
                label="Objet de l'e-mail *"
            />
            <p className="objectIndication">{objectIndication}</p>
            <RadioButton
                value={civility}
                name="civility"
                onChange={handleChangeCivility}
                error={!civility}
                analyticsCategory={analyticsCategory}
                step={step}
                label="Civilité *"
                autoComplete="civility"
                choices={['M.', 'Mme.', 'Autre']}
            />
            <Input
                className="firstname"
                value={firstname}
                onChange={handleChangeFirstname}
                error={!firstname}
                analyticsCategory={analyticsCategory}
                step={step}
                autoComplete="given-name"
                label="Votre prénom *"
            />
            <Input
                className="lastname"
                value={lastname}
                onChange={handleChangeLastname}
                error={!lastname}
                analyticsCategory={analyticsCategory}
                step={step}
                autoComplete="family-name"
                label="Votre nom *"
            />
        </Fragment>
    );
};

FormStep.propTypes = {
    className: PropTypes.string,
    email: PropTypes.string,
    objectIndication: PropTypes.string,
    object: PropTypes.string,
    civility: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    setEmail: PropTypes.func.isRequired,
    setObject: PropTypes.func.isRequired,
    setCivility: PropTypes.func.isRequired,
    setFirstname: PropTypes.func.isRequired,
    setLastname: PropTypes.func.isRequired,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
};

export const Message = ({ messageTemplate, action, className, ...props }) => {
    return (
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
                    <div className="formStep">
                        <FormStep {...props} />
                    </div>
                    <div className="action">{action}</div>
                </div>
            )}
        </Fragment>
    );
};

Message.propTypes = {
    messageTemplate: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired })),
    email: PropTypes.string,
    objectIndication: PropTypes.string.isRequired,
    className: PropTypes.string,
    setEmail: PropTypes.func.isRequired,
    setObject: PropTypes.func.isRequired,
    setCivility: PropTypes.func.isRequired,
    setFirstname: PropTypes.func.isRequired,
    setLastname: PropTypes.func.isRequired,
    object: PropTypes.string,
    civility: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    action: PropTypes.node.isRequired,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
};

export default glamorous(
    compose(
        withYellowLogo,
        withSessionData,
    )(Message),
)(styles);
