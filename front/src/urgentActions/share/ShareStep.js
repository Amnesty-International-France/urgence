import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { compose } from 'recompose';
import { Paper } from '@material-ui/core';

import { withBlackLogo, withYellowBackground } from '../../themes/ThemeContext';
import { white, black } from '../../themes/colors';
import Share from './Share';

const styles = {
    padding: '60px 15px 20px',
    height: '95vh',
    '& .paper': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: '100%',
        width: '100%',
        padding: '100px 20px 20px 20px',
        color: black,
        backgroundColor: white,
    },
};

const ShareStep = ({ className, slug, step, data, analyticsCategory }) => (
    <div className={classnames('share', className)}>
        <Paper className="paper" elevation={6} square>
            <Share slug={slug} step={step} data={data} analyticsCategory={analyticsCategory} />
        </Paper>
    </div>
);

ShareStep.propTypes = {
    className: PropTypes.string,
    slug: PropTypes.string.isRequired,
    step: PropTypes.string,
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        share: PropTypes.object,
    }),
    analyticsCategory: PropTypes.string,
};

ShareStep.defaultProps = {
    slug: 'new-ua',
    data: {
        title: '',
        text: '',
        share: {},
    },
};

const WithStylesShare = glamorous(ShareStep)(styles);

export default compose(withBlackLogo, withYellowBackground)(WithStylesShare);
