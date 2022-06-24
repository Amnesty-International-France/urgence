import PropTypes from 'prop-types';

export const StoryStepPropType = {
    medium: PropTypes.shape({
        title: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
    }),
    displayOptions: PropTypes.shape({
        mediumPosition: PropTypes.oneOf(['top', 'bottom']),
        backgroundColor: PropTypes.string.isRequired,
    }),
    content: PropTypes.string.isRequired,
};

export const routeMatch = PropTypes.shape({
    params: PropTypes.object.isRequired,
});

export const UrgentActionPropType = {
    story: PropTypes.arrayOf(PropTypes.shape(StoryStepPropType)),
};
