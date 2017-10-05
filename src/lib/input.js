import React from 'react';

import InputMask from 'react-input-mask';

function setMask(format) {
    const reg = new RegExp("y|m|d|h|s", "g");
    return format.toLowerCase().replace(reg, "9");
}

export default ({defaults, onClick, onTextChange, className, style}) => (
    <div className={(!defaults.readOnly && !defaults.isValid) ? "has-feedback has-error" : ""}>
        <InputMask
            className={className}
            style={style}
            placeholder={defaults.format}
            value={defaults.value}
            onClick={onClick}
            onChange={onTextChange}
            mask={setMask(defaults.format)}
            readOnly={defaults.readOnly}/>
    </div>
);