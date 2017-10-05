import React from 'react';

export default ({defaults, add, onActiveTab, onClick, isDisabled}) => (
    <div className="m-calendar tab-m is-active">
        <div className="toolbar">
            <button className="prev-month" onClick={add(-1, 'month')}>
                <i className="ion-md-arrow-dropleft"></i>
            </button>
            <span className="current-date" style={{cursor:'pointer'}} onClick={()=> {onActiveTab(2)}}>
                            {defaults.selected.format("MMMM YYYY")}
                        </span>
            <button className="next-month" onClick={add(1, 'month')}>
                <i className="ion-md-arrow-dropright"></i>
            </button>
        </div>
        <table>
            <thead>
            <tr>
                {defaults.months.map((x, i)=> (
                    <td key={i}>{x}</td>
                ))}
            </tr>
            </thead>
            <tbody>
            {defaults.days.map((items, index) => (<tr key={index}>
                {items.map((x, iIndex)=> (<td key={index + "" + iIndex}
                                              className={isDisabled(defaults.min, defaults.max, defaults.selected.clone().date(x), defaults.date, x)}
                                              onClick={()=> x!=="" && onClick(defaults.selected.clone().date(x))}>{x}</td>))}
            </tr>))}
            </tbody>
        </table>
    </div>
);