import React from 'react';

import InputMask from 'react-input-mask';

function setMask(format, readOnly) {
    if(readOnly)
        return "";

    const reg = new RegExp("Y|M|D|H|S", "g");
    return format.toUpperCase().replace(reg, "9");
}

export default ({defaults, onClick, onTextChange, className, style}) => (
    <div className={(!defaults.readOnly && !defaults.isValid) ? "r-input-group r-has-feedback r-has-error" : "r-input-group"}>
        <InputMask
            className={className}
            style={style}
            placeholder={defaults.format}
            value={defaults.value}
            onClick={defaults.enableInputClick ? onClick: null}
            onChange={onTextChange}
            mask={setMask(defaults.format, defaults.readOnly)}
            readOnly={defaults.readOnly}/>
        {defaults.icon && <div style={{cursor:'pointer', width: 'auto', display: 'table-cell', position: 'relative'}} className="r-input-group-addon" onClick={onClick}><i className={defaults.iconType || "fa fa-calendar"} /></div>}
    </div>
);