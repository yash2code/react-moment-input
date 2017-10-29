'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactInputSlider = require('react-input-slider');

var _reactInputSlider2 = _interopRequireDefault(_reactInputSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var selected = _ref.selected,
        onSetTime = _ref.onSetTime,
        translations = _ref.translations,
        isAM = _ref.isAM;
    return _react2.default.createElement(
        'div',
        { className: 'r-time tab-m is-active', style: { paddingBottom: "10px" } },
        _react2.default.createElement(
            'div',
            { className: 'showtime' },
            _react2.default.createElement(
                'span',
                { className: 'time' },
                selected.format(isAM ? "hh" : "HH")
            ),
            _react2.default.createElement(
                'span',
                { className: 'separater' },
                ':'
            ),
            _react2.default.createElement(
                'span',
                { className: 'time' },
                selected.format("mm")
            ),
            isAM && _react2.default.createElement('span', { className: 'separater' }),
            isAM && _react2.default.createElement(
                'span',
                { className: 'time' },
                Number(selected.format("HH")) >= 12 ? "PM" : "AM"
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'sliders' },
            _react2.default.createElement(
                'div',
                { className: 'time-text' },
                translations.HOURS || "Hours",
                ':'
            ),
            _react2.default.createElement(_reactInputSlider2.default, {
                className: 'u-slider u-slider-x u-slider-time',
                axis: 'x',
                x: Number(selected.format('HH')),
                xmax: 23,
                onChange: onSetTime('hours')
            }),
            _react2.default.createElement(
                'div',
                { className: 'time-text' },
                translations.MINUTES || "Minutes",
                ':'
            ),
            _react2.default.createElement(_reactInputSlider2.default, {
                className: 'u-slider u-slider-x u-slider-time',
                axis: 'x',
                x: Number(selected.format('mm')),
                xmax: 59,
                onChange: onSetTime('minutes')
            })
        )
    );
};