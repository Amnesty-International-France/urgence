import PropTypes from 'prop-types';

import { useParams } from 'react-router';
import generateUrl from '../services/generateUrl';
// @ts-expect-error TS(6142): Module '../themes/Link' was resolved to '/home/gui... Remove this comment to see the full error message
import Link from '../themes/Link';

export const ToUrgentActionPageLink = ({
    label,
    pageName,
    disabled,
    onClick,
    analyticsCategory,
    buttonName,
    step,
    whiteLink
}: any) => {
    const { slug } = useParams();
    return (
        // @ts-expect-error TS(2749): 'Link' refers to a value, but is being used as a t... Remove this comment to see the full error message
        <Link
            onClick={onClick}
            // @ts-expect-error TS(2304): Cannot find name 'to'.
            to={generateUrl(pageName: any, { slug })}
            label={label}
            disabled={disabled}
            analyticsCategory={analyticsCategory}
            buttonName={buttonName}
            step={step}
            // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
            whiteLink={whiteLink}
        />
    );
};

ToUrgentActionPageLink.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.node.isRequired]),
    pageName: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
    buttonName: PropTypes.string,
    whiteLink: PropTypes.bool,
};

ToUrgentActionPageLink.defaultProps = {
    whiteLink: false,
};

export default ToUrgentActionPageLink;
