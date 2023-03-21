import PropTypes from 'prop-types';

import { useParams } from 'react-router';
import generateUrl from '../services/generateUrl';
import Link from '../themes/Link';

export const ToUrgentActionPageLink = ({
    label,
    pageName,
    disabled,
    onClick,
    analyticsCategory,
    buttonName,
    step,
    whiteLink,
}: any) => {
    const { slug } = useParams();
    return (
        <Link
            onClick={onClick}
            to={generateUrl(pageName, { slug })}
            label={label}
            disabled={disabled}
            analyticsCategory={analyticsCategory}
            buttonName={buttonName}
            step={step}
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
