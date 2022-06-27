import React from 'react';

// @ts-expect-error TS(6142): Module '../themes/RichText' was resolved to '/home... Remove this comment to see the full error message
import RichText from '../themes/RichText';

const styles = {
    fontSize: '14px',
};

type OwnProps = {
    content: string;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof LegalInformation.defaultProps;

// @ts-expect-error TS(7022): 'LegalInformation' implicitly has type 'any' becau... Remove this comment to see the full error message
const LegalInformation = ({ content }: Props) => {
    if (!content) {
        return null;
    }
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <RichText className="legal-information" html={content} style={styles} />;
};

LegalInformation.defaultProps = {
    content: null,
};

export default LegalInformation;
