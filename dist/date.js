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
                { className: "prev-month", onClick: add(-1, 'month') },
                React.createElement("i", { className: "ion-md-arrow-dropleft" })
            ),
            React.createElement(
                "span",
                { className: "current-date", style: { cursor: 'pointer' }, onClick: function onClick() {
                        onActiveTab(2);
                    } },
                defaults.selected.format("MMMM YYYY")
            ),
            React.createElement(
                "button",
                { className: "next-month", onClick: add(1, 'month') },
                React.createElement("i", { className: "ion-md-arrow-dropright" })
            )
        ),
        React.createElement(
            "table",
            null,
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    defaults.months.map(function (x, i) {
                        return React.createElement(
                            "td",
                            { key: i },
                            x
                        );
                    })
                )
            ),
            React.createElement(
                "tbody",
                null,
                defaults.days.map(function (items, index) {
                    return React.createElement(
                        "tr",
                        { key: index },
                        items.map(function (x, iIndex) {
                            return React.createElement(
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
});