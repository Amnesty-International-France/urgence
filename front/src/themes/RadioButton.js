import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const styles = {
    fontFamily: 'Amnesty Trade Gothic',
    fontSize: 14,
    lineHeight: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '20px 0',
    maxWidth: '400px',
    '& .label': {
        width: '20%',
    },
    '& .item': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    '& .circle': {
        marginRight: '0.5em',
        fontSize: 20,
        height: '25px',
        width: '25px',
    },
};

export const RadioButton = ({ className, choices, label, name, onChange }) => (
    <div className={className}>
        {label && <p className="label">{label}</p>}
        {choices.map((item, index) => {
            return (
                <Fragment key={index}>
                    <div className="item">
                        <input
                            type="radio"
                            name={name}
                            value={item}
                            id={index}
                            className="circle"
                            onClick={onChange}
                        />
                        <label htmlFor={item}>{item}</label>
                    </div>
                </Fragment>
            );
        })}
    </div>
);

RadioButton.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    choices: PropTypes.array.isRequired,
};

export default glamorous(RadioButton)(styles);
