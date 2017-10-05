import React from 'react';
import InputSlider from 'react-input-slider';

export default (function (_ref) {
    var selected = _ref.selected,
        onSetTime = _ref.onSetTime;
    return React.createElement(
        'div',
        { className: 'm-time tab-m is-active', style: { paddingBottom: "10px" } },
        React.createElement(
            'div',
            { className: 'showtime' },
            React.createElement(
                'span',
                { className: 'time' },
                selected.format("HH")
            ),
            React.createElement(
                'span',
                { className: 'separater' },
                ':'
            ),
            React.createElement(
                'span',
                { className: 'time' },
                selected.format("mm")
            )
        ),
        React.createElement(
            'div',
            { className: 'sliders' },
            React.createElement(
                'div',
                { className: 'time-text' },
                'Hours:'
            ),
            React.createElement(InputSlider, {
                className: 'u-slider u-slider-x u-slider-time',
                axis: 'x',
                x: Number(selected.format('HH')),
                xmax: 23,
                onChange: onSetTime('hours')
            }),
            React.createElement(
                'div',
                { className: 'time-text' },
                'Minutes:'
            ),
            React.createElement(InputSlider, {
                className: 'u-slider u-slider-x u-slider-time',
                axis: 'x',
                x: Number(selected.format('mm')),
                xmax: 59,
                onChange: onSetTime('minutes')
            })
        )
    );
});