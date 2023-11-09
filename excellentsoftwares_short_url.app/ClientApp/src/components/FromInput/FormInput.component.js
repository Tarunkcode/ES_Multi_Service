import React from "react";

import "./FormInput.styles.css";

const FormInput = ({ handleChange, label, ...otherProps }) => (
    <div className="group">
        <input className='form-input' onBlur={handleChange} {...otherProps} />
        {label ? (
            <label
                className={`${otherProps && otherProps.value && otherProps.value.length ? 'shrink' : ''
                    } form-input-label`}
            >
                {label}
            </label>
        ) : null}
    </div>
);

export default FormInput;
