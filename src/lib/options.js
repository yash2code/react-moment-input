import React from "react";

export default ({ activeTab, onActiveTab, translations }) => (
  <div className="options">
    <button
      type="button"
      tabIndex={-1}
      className={
        "ion-ios-calendar im-btn" +
        (activeTab === 0 || activeTab === 2 ? " is-active" : "")
      }
      onClick={() => {
        onActiveTab(0);
      }}
    >
      {translations.DATE || "Date"}
    </button>
    <button
      type="button"
      tabIndex={-1}
      className={"ion-ios-clock im-btn" + (activeTab === 1 ? " is-active" : "")}
      onClick={() => {
        onActiveTab(1);
      }}
    >
      {translations.TIME || "Time"}
    </button>
  </div>
);
