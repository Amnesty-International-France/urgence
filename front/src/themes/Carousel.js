import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RightArrow } from '../icons/RightArrow';
import { textColorForBackgroundColor } from './colors';

export class Carousel extends Component {
    init = slider => {
        this.slider = slider;
    };

    next = () => {
        this.slider.slickNext();
    };

    renderChild(child, index) {
        return (
            <Fragment>
                {child}
                {/* <div
                    className="bottom"
                    style={{
                        backgroundColor: step.displayOptions.backgroundColor,
                        color: textColorForBackgroundColor(step.displayOptions.backgroundColor),
                    }}
                > */}
                <div className="counter">
                    {index + 1}/{child.length}
                </div>

                {index + 1 < child.length && (
                    <div className="next-arrow">
                        <RightArrow
                            onClick={this.nextSlide}
                            // color={textColorForBackgroundColor(child.displayOptions.backgroundColor)}
                            size={28}
                        />
                    </div>
                )}
                {/* </div> */}
            </Fragment>
        );
    }

    render() {
        const {
            children,
            className,
            initialSlide,
            afterChange,
            vertical,
        } = this.props;

        return (
            <Fragment>
                <Slider
                    ref={this.init}
                    className={className}
                    infinite={false}
                    vertical={vertical}
                    verticalSwiping={vertical}
                    afterChange={afterChange}
                    initialSlide={initialSlide}
                >
                    {children.map(this.renderChild)}
                </Slider>
            </Fragment>
        );
    }
}

Carousel.propTypes = {
    className: PropTypes.string,
    initialSlide: PropTypes.string,
    children: PropTypes.node.isRequired,
    afterChange: PropTypes.func,
    vertical: PropTypes.bool,
};

export default glamorous(Carousel)({
    height: '100%',
    '.slick-slide > div': {
        height: '100%',
    },
    '.slick-slider': {
        height: '100%',
    },
});
