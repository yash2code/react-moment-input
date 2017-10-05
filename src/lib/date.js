import React from 'react';

function replaceMonths(value, translation) {
    const values = value.split(" ");
    const tValue = translation["MONTHS_" + values[0].toUpperCase()];
    return tValue ? tValue + " " + values[1] : value;
}

function replaceDays(value, translation) {
    return translation["DAYS_" + value.toUpperCase()] || value;
}

export default ({defaults, add, onActiveTab, onClick, isDisabled, translations}) => (
    <div className="r-calendar tab-m is-active">
        <div className="toolbar">
            <button className="prev-month" onClick={add(-1, 'month')}>
                <i className="ion-md-arrow-dropleft"></i>
            </button>
            <span className="current-date" style={{marginRight:"-5px"}}>
                            {replaceMonths(defaults.selected.format("MMMM YYYY"), translations)}
                        </span>
            <button className="next-month" onClick={add(1, 'month')}>
                <i className="ion-md-arrow-dropright"></i>
            </button>
            <button className="next-month" style={{marginRight:"5px"}} onClick={()=> {onActiveTab(2)}}>
                <i className="ion-ios-barcode-outline"></i>
            </button>
        </div>
        <table>
            <thead>
            <tr>
                {defaults.months.map((x, i)=> (
                    <td key={i}>{replaceDays(x, translations)}</td>
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