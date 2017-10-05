import React from 'react';

import InputMask from 'react-input-mask';

function setMask(format) {
    const reg = new RegExp("y|m|d|h|s", "g");
    return format.toLowerCase().replace(reg, "9");
}

export default ({defaults, onClick, onTextChange, className, style}) => (
    <div className={(!defaults.readOnly && !defaults.isValid) ? "r-input-group has-feedback has-error" : "r-input-group"}>
        <InputMask
            className={className}
            style={style}
            placeholder={defaults.format}
            value={defaults.value}
            onClick={!defaults.icon ? onClick: null}
            onChange={onTextChange}
            mask={setMask(defaults.format)}
            readOnly={defaults.readOnly}/>
        {defaults.icon && <div style={{cursor:'pointer', width:"20px"}} className="r-input-group-addon fa fa-calendar" onClick={onClick}></div>}
    </div>
);