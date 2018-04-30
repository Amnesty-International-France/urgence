import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Carousel from '../../themes/Carousel';
import MessageStep from './MessageStep';
import { routeMatch } from '../../propTypes';
import generateUrl from '../../services/generateUrl';

class Message extends Component {
    afterChange = page => {
        const {
            match: {
                params: { id, page: currentPage },
            },
            history,
        } = this.props;

        if (page.toString() === currentPage) {
            return;
        }
        history.push(generateUrl('message', { id, page }));
    };

    render() {
        const {
            messageTemplate,
            className,
            match: {
                params: { page },
            },
        } = this.props;

        return (
            <Fragment>
                {(!messageTemplate || !messageTemplate.length) && (
                    <p className="error">
                        This urgent action does not exist anymore.
                    </p>
                )}

                {messageTemplate &&
                    messageTemplate.length > 0 && (
                        <Carousel
                            initialSlide={page}
                            className={className}
                            afterChange={this.afterChange}
                            vertical={true}
                        >
                            {messageTemplate.map(({ value }) => (
                                <MessageStep key={value} content={value} />
                            ))}
                        </Carousel>
                    )}
            </Fragment>
        );
    }
}

Message.propTypes = {
    messageTemplate: PropTypes.arrayOf(
        PropTypes.shape({ value: PropTypes.string.isRequired }),
    ),
    className: PropTypes.string,
    match: routeMatch,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(Message);
