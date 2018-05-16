import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../themes/RichText';
import ToMessageButton from './ToMessageButton';
import { colors } from '../themes/colors';

export const Act = ({ callToAction, className }) => (
    <div className={className}>
        <div>
            <h1>Génial !</h1>
            <RichText html={callToAction} />
        </div>
        <ToMessageButton />
    </div>
);

Act.propTypes = {
    callToAction: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
};

export default glamorous(Act)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.pink,
    color: colors.white,
    height: '100vh',
    '& h1': {
        marginTop: '122px',
        fontFamily: 'Amnesty Trade Gothic Condensed',
        padding: '2rem 3rem',
        textAlign: 'center',
        fontSize: '56px',
        fontWeight: 'bold',
    },
    '& .rich-text': {
        margin: '22px 31px',
        textAlign: 'center',
        fontSize: '28px',
        lineHeight: '33px',
        fontWeight: 'bold',
    },
    '& a': {
        alignSelf: 'center',
        marginBottom: '53px',
    },
});
