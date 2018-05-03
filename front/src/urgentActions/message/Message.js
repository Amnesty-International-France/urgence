import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Carousel from '../../themes/Carousel';
import MessageStep from './MessageStep';
import ObjectStep from './ObjectStep';
import { routeMatch } from '../../propTypes';
import generateUrl from '../../services/generateUrl';

export class Message extends Component {
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
            objectIndication,
            messageTemplate,
            className,
            loading,
            match: {
                params: { page },
            },
        } = this.props;

        return loading ? (
            <p className="loading">Loading...</p>
        ) : (
            <Fragment>
                {(!messageTemplate || !messageTemplate.length) && (
                    <p className="error">
                        Cette action urgent n&#39;existe plus.
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
                            <ObjectStep
                                objectIndication={objectIndication}
                                messageTemplate={messageTemplate}
                            />
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
    objectIndication: PropTypes.string.isRequired,
    className: PropTypes.string,
    match: routeMatch,
    loading: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(Message);
