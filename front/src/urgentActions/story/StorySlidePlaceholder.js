import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import glamorous from 'glamorous';
import { yellow } from '../../themes/colors';

const styles = {
    width: '300px',
    height: '100%',
    backgroundColor: yellow,
};

export const StorySlidePlaceholder = ({ className }) => (
    <div className={classnames(className, 'swiper-slide')} />
);

StorySlidePlaceholder.propTypes = {
    className: PropTypes.string,
};

export default glamorous(StorySlidePlaceholder)(styles);
