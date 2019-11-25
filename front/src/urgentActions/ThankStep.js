import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import glamorous from 'glamorous';
import Paper from '@material-ui/core/Paper';
import get from 'lodash.get';

import RichText from '../themes/RichText';
import LongText from '../themes/LongText';
import { withBlackLogo, withYellowBackground } from '../themes/ThemeContext';

const styles = {
    padding: '60px 15px 20px',
    '& .paper': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100%',
        width: '100%',
        padding: '80px 20px 20px 20px',
    },
    '& h1': {
        textTransform: 'uppercase',
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontSize: '30px',
    },
};

export const ThankStep = ({ className, data }) => {
    const title = get(data, 'title');
    const text = get(data, 'text');
    return (
        <div className={classnames(className, 'thank')}>
            <Paper className="paper" elevation={4} square>
                <div>
                    <h1>
                        <LongText text={title} />
                    </h1>
                    {text && <RichText html={text} />}
                </div>
            </Paper>
        </div>
    );
};

ThankStep.propTypes = {
    className: PropTypes.string.isRequired,
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }),
};

ThankStep.defaultProps = {};

const withStyleThankStep = glamorous(ThankStep)(styles);
export default compose(withBlackLogo, withYellowBackground)(withStyleThankStep);
