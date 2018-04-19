import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { withRouter } from './gateway/ReactRouter';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

class Carousel extends Component {
    afterChange = index => {
        const { history } = this.props;
        history.push(`/ua/${index}`);
    };
    render() {
        const { children, initialSlide = 0 } = this.props;

        return (
            <Slider
                settings={settings}
                initialSlide={initialSlide}
                afterChange={this.afterChange}
            >
                {children}
            </Slider>
        );
    }
}

Carousel.propTypes = {
    children: PropTypes.node.isRequired,
    initialSlide: PropTypes.number,
    history: PropTypes.object.isRequired,
};

export default withRouter(Carousel);
