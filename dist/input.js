'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactInputMask = require('react-input-mask');

var _reactInputMask2 = _interopRequireDefault(_reactInputMask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setMask(format) {
    var reg = new RegExp("y|m|d|h|s", "g");
    return format.toLowerCase().replace(reg, "9");
}

exports.default = function (_ref) {
    var defaults = _ref.defaults,
        onClick = _ref.onClick,
        onTextChange = _ref.onTextChange,
        className = _ref.className,
        style = _ref.style;
    return _react2.default.createElement(
        'div',
        { className: !defaults.readOnly && !defaults.isValid ? "has-feedback has-error" : "" },
        _react2.default.createElement(_reactInputMask2.default, {
            className: className,
            style: style,
            placeholder: defaults.format,
            value: defaults.value,
            onClick: !defaults.icon ? onClick : null,
            onChange: onTextChange,
            mask: setMask(defaults.format),
            readOnly: defaults.readOnly }),
        defaults.icon && _react2.default.createElement('i', { style: { marginLeft: '2px', cursor: 'pointer' }, className: 'fa fa-calendar', onClick: onClick })
    );
};