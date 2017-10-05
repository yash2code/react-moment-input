import React from 'react';

export default ({activeTab, onActiveTab}) => (<div className="options">
        <button
            className={"ion-ios-calendar im-btn" + ((activeTab===0 || activeTab===2) ? " is-active" : "")}
            onClick={()=> {onActiveTab(0)}}>Date
        </button>
        <button
            className={"ion-ios-clock im-btn" + (activeTab===1 ? " is-active" : "")}
            onClick={()=> {onActiveTab(1)}}>Time
        </button>
    </div>
);