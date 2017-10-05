"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var defaults = _ref.defaults,
        add = _ref.add,
        onActiveTab = _ref.onActiveTab,
        _onClick = _ref.onClick,
        isDisabled = _ref.isDisabled;
    return _react2.default.createElement(
        "div",
        { className: "r-calendar tab-m is-active" },
        _react2.default.createElement(
            "div",
            { className: "toolbar" },
            _react2.default.createElement(
                "button",
                { className: "prev-month", onClick: add(-12, 'year') },
                _react2.default.createElement("i", { className: "ion-md-arrow-dropleft" })
            ),
            _react2.default.createElement(
                "span",
                { className: "current-date", style: { cursor: 'pointer' }, onClick: function onClick() {
                        onActiveTab(0);
                    } },
                "Years"
            ),
            _react2.default.createElement(
                "button",
                { className: "next-month", onClick: add(12, 'year') },
                _react2.default.createElement("i", { className: "ion-md-arrow-dropright" })
            )
        ),
        _react2.default.createElement(
            "table",
            null,
            _react2.default.createElement(
                "tbody",
                null,
                defaults.years.map(function (items, index) {
                    return _react2.default.createElement(
                        "tr",
                        { key: index },
                        items.map(function (x, iIndex) {
                            return _react2.default.createElement(
                                "td",
                                { key: index + "" + iIndex,
                                    className: isDisabled(defaults.min, defaults.max, defaults.selected.clone().year(x), defaults.date, x, true),
                                    onClick: function onClick() {
                                        return _onClick(defaults.selected.clone().year(x));
                                    }
                                },
                                x
                            );
                        })
                    );
                })
            )
        )
    );
};