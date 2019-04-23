import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import LinkTwitter from './LinkTwitter';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '100px 20px 20px 20px',
};

const parseTextForUrl = (text, auId) => {
    const encodedText = encodeURI(text);
    const hashTaggedText = encodedText.replace(/#/g, '%23');
    return hashTaggedText.replace('$CURRENT_AU_ID', auId);
};

export const Share = ({ className, message, auId }) => (
    <div className={className}>
        <LinkTwitter text={parseTextForUrl(message, auId)} />
    </div>
);

Share.propTypes = {
    message: PropTypes.string.isRequired,
    auId: PropTypes.string.isRequired,
};

Share.defaultProps = {
    message: '',
};

export default glamorous(Share)(styles);
