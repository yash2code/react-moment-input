import React from 'react';

export default (function (_ref) {
    var defaults = _ref.defaults,
        add = _ref.add,
        onActiveTab = _ref.onActiveTab,
        _onClick = _ref.onClick,
        isDisabled = _ref.isDisabled;
    return React.createElement(
        "div",
        { className: "m-calendar tab-m is-active" },
        React.createElement(
            "div",
            { className: "toolbar" },
            React.createElement(
                "button",
                { className: "prev-month", onClick: add(-12, 'year') },
                React.createElement("i", { className: "ion-md-arrow-dropleft" })
            ),
            React.createElement(
                "span",
                { className: "current-date", style: { cursor: 'pointer' }, onClick: function onClick() {
                        onActiveTab(0);
                    } },
                "Years"
            ),
            React.createElement(
                "button",
                { className: "next-month", onClick: add(12, 'year') },
                React.createElement("i", { className: "ion-md-arrow-dropright" })
            )
        ),
        React.createElement(
            "table",
            null,
            React.createElement(
                "tbody",
                null,
                defaults.years.map(function (items, index) {
                    return React.createElement(
                        "tr",
                        { key: index },
                        items.map(function (x, iIndex) {
                            return React.createElement(
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
});