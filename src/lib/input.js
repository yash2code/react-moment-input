import React from 'react';

import InputMask from 'react-input-mask';

function setMask(format, readOnly) {
    if(readOnly)
        return "";

    const reg = new RegExp("y|m|d|h|s", "g");
    return format.toLowerCase().replace(reg, "9");
}

export default ({defaults, onClick, onTextChange, className, style}) => (
    <div className={(!defaults.readOnly && !defaults.isValid) ? "r-input-group has-feedback has-error react-input-moment" : "r-input-group react-input-moment"}>
        <InputMask
            className={(className || "") + " react-input-moment"}
            style={style}
            placeholder={defaults.format}
            value={defaults.value}
            onClick={!defaults.icon ? onClick: null}
            onChange={onTextChange}
            mask={setMask(defaults.format, defaults.readOnly)}
            readOnly={defaults.readOnly}/>
        {defaults.icon && <div style={{cursor:'pointer', width: 'auto', display: 'table-cell', position: 'relative'}} className="r-input-group-addon react-input-moment" onClick={onClick}><i className="fa fa-calendar" /></div>}
    </div>
);