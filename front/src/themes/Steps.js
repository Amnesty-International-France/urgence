import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import get from 'lodash.get';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
};

const steps = {
    story: 0,
    act: 1,
    message: 2,
    share: 3,
    register: 3,
};

const Steps = ({ className, data, step, page }) => {
    const stepNumber = steps[step];
    if (stepNumber == null) {
        return null;
    }

    const story = get(data, 'UrgentAction.story');
    const current = page ? Number(page) + stepNumber + 1 : story.length + stepNumber;
    const total = story.length + 3;

    const completed = (current / total) * 100;

    return (
        <div className={className}>
            <LinearProgress variant="determinate" value={completed} />
        </div>
    );
};

Steps.propTypes = {
    className: PropTypes.string,
    data: PropTypes.object.isRequired,
    step: PropTypes.string,
    page: PropTypes.string,
};

export default glamorous(Steps)(styles);
