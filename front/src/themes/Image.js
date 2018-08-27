import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

export const Image = ({ className, src, title }) => {
    let actualSource = src;
    if (src && src.rawFile) {
        actualSource = src.rawFile.preview;
    }
    return (
        <div
            className={className}
            style={{
                backgroundImage: `url(${actualSource})`,
            }}
            title={title}
        />
    );
};

Image.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
};

export default glamorous(Image)({
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '& img': {
        maxWidth: '100%',
    },
    '&:after': {
        content: ' ',
        display: 'block',
        paddingBottom: '56.25%',
    },
});
