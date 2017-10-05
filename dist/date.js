"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function replaceMonths(value, translation) {
    var values = value.split(" ");
    var tValue = translation["MONTHS_" + values[0].toUpperCase()];
    return tValue ? tValue + " " + values[1] : value;
}

function replaceDays(value, translation) {
    return translation["DAYS_" + value.toUpperCase()] || value;
}

exports.default = function (_ref) {
    var defaults = _ref.defaults,
        add = _ref.add,
        onActiveTab = _ref.onActiveTab,
        _onClick = _ref.onClick,
        isDisabled = _ref.isDisabled,
        translations = _ref.translations;
    return _react2.default.createElement(
        "div",
        { className: "r-calendar tab-m is-active" },
        _react2.default.createElement(
            "div",
            { className: "toolbar" },
            _react2.default.createElement(
                "button",
                { className: "prev-month", onClick: add(-1, 'month') },
                _react2.default.createElement("i", { className: "ion-md-arrow-dropleft" })
            ),
            _react2.default.createElement(
                "span",
                { className: "current-date", style: { marginRight: "-5px" } },
                replaceMonths(defaults.selected.format("MMMM YYYY"), translations)
            ),
            _react2.default.createElement(
                "button",
                { className: "next-month", onClick: add(1, 'month') },
                _react2.default.createElement("i", { className: "ion-md-arrow-dropright" })
            ),
            _react2.default.createElement(
                "button",
                { className: "next-month", style: { marginRight: "5px" }, onClick: function onClick() {
                        onActiveTab(2);
                    } },
                _react2.default.createElement("i", { className: "ion-ios-barcode-outline" })
            )
        ),
        _react2.default.createElement(
            "table",
            null,
            _react2.default.createElement(
                "thead",
                null,
                _react2.default.createElement(
                    "tr",
                    null,
                    defaults.months.map(function (x, i) {
                        return _react2.default.createElement(
                            "td",
                            { key: i },
                            replaceDays(x, translations)
                        );
                    })
                )
            ),
            _react2.default.createElement(
                "tbody",
                null,
                defaults.days.map(function (items, index) {
                    return _react2.default.createElement(
                        "tr",
                        { key: index },
                        items.map(function (x, iIndex) {
                            return _react2.default.createElement(
                                "td",
                                { key: index + "" + iIndex,
                                    className: isDisabled(defaults.min, defaults.max, defaults.selected.clone().date(x), defaults.date, x),
                                    onClick: function onClick() {
                                        return x !== "" && _onClick(defaults.selected.clone().date(x));
                                    } },
                                x
                            );
                        })
                    );
                })
            )
        )
    );
};