import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

export const Image = ({ className, src, title }) => (
    <img className={className} src={src} title={title} alt={title} />
);

Image.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
};

export default glamorous(Image)({
    display: 'block',
    height: 'auto',
    maxWidth: '100%',
    objectFit: 'cover',
});
