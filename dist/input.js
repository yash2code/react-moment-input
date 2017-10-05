import React from 'react';

import InputMask from 'react-input-mask';

function setMask(format) {
    var reg = new RegExp("y|m|d|h|s", "g");
    return format.toLowerCase().replace(reg, "9");
}

export default (function (_ref) {
    var defaults = _ref.defaults,
        onClick = _ref.onClick,
        onTextChange = _ref.onTextChange,
        className = _ref.className,
        style = _ref.style;
    return React.createElement(
        'div',
        { className: !defaults.readOnly && !defaults.isValid ? "has-feedback has-error" : "" },
        React.createElement(InputMask, {
            className: className,
            style: style,
            placeholder: defaults.format,
            value: defaults.value,
            onClick: onClick,
            onChange: onTextChange,
            mask: setMask(defaults.format),
            readOnly: defaults.readOnly })
    );
});