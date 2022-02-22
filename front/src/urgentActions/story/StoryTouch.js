import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import classNames from 'classnames';

const styles = {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: '100vh',
    zIndex: '999',
    '& .left-area': {
        flex: 1,
    },
    '& .right-area': {
        flex: 2,
    },
};

export const StoryTouch = ({ className, slideNext, slidePrevious }) => {
    const handleLeftArea = () => {
        slidePrevious();
    };

    const handleRightArea = () => {
        slideNext();
    };
    return (
        <div className={classNames('story-touch', className)}>
            <div className="left-area" onClick={handleLeftArea}></div>
            <div className="right-area" onClick={handleRightArea}></div>
        </div>
    );
};

StoryTouch.propTypes = {
    className: PropTypes.string,
    slideNext: PropTypes.func,
    slidePrevious: PropTypes.func,
};

export default glamorous(StoryTouch)(styles);
