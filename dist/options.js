import React from 'react';

export default (function (_ref) {
    var activeTab = _ref.activeTab,
        onActiveTab = _ref.onActiveTab;
    return React.createElement(
        "div",
        { className: "options" },
        React.createElement(
            "button",
            {
                className: "ion-ios-calendar im-btn" + (activeTab === 0 || activeTab === 2 ? " is-active" : ""),
                onClick: function onClick() {
                    onActiveTab(0);
                } },
            "Date"
        ),
        React.createElement(
            "button",
            {
                className: "ion-ios-clock im-btn" + (activeTab === 1 ? " is-active" : ""),
                onClick: function onClick() {
                    onActiveTab(1);
                } },
            "Time"
        )
    );
});