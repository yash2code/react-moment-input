import React from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import './css/style.css'

import InputMask from 'react-input-mask';

function setMask(format, readOnly) {
    if(readOnly)
        return "";

    const reg = new RegExp("Y|M|D|H|S", "g");
    return format.toUpperCase().replace(reg, "9");
}

export default (props) => {
    if(!props.defaults.inputCustomControl)
    return(
        <div className={(!props.defaults.readOnly && !props.defaults.isValid) ? "r-input-group r-has-feedback r-has-error" : "r-input-group"}>
            <InputMask
                className={props.className}
                style={props.style}
                placeholder={props.defaults.format}
                value={props.defaults.value}
                onFocus={props.defaults.enableInputClick ? props.onClick: null}
                onChange={props.onTextChange}
                mask={setMask(props.defaults.format, props.defaults.readOnly)}
                readOnly={props.defaults.readOnly}/>
            {props.defaults.icon && <div style={{cursor:'pointer', width: 'auto', display: 'table-cell', position: 'relative'}} className="r-input-group-addon" onClick={props.onClick}><i className={props.defaults.iconType || "fa fa-calendar"} /></div>}
        </div>
    );
    return(
    <InputMask mask={setMask(props.defaults.format, props.defaults.readOnly)} value={props.defaults.value}
               className={props.className} style={props.style} onChange={props.onTextChange}
               onFocus={props.defaults.enableInputClick ? props.onClick : null} placeholder={props.defaults.format}
               readOnly={props.defaults.readOnly}>
        {(inputProps) =>
            <div style={{display: 'inline-flex'}}>
                <Input {...inputProps} startAdornment={
                    <InputAdornment position="start">
                        {props.defaults.iconType}
                    </InputAdornment>
                } endAdornment={
                    <InputAdornment position="end">
                        <i onClick={e => {
                            e.stopPropagation();
                            props.onDecrease(props.defaults.value)
                        }} className='fa fa-angle-left input-controls'/>
                        <i onClick={e => {
                            e.stopPropagation();
                            props.onIncrease(props.defaults.value)
                        }} className='fa fa-angle-right input-controls'/>
                    </InputAdornment>
                } disableUnderline/>
            </div>}
    </InputMask>
    );
};