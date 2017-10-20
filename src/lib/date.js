import React from 'react';

function replaceMonths(value, translation) {
    const values = value.split(" ");
    const tValue = translation["MONTHS_" + values[0].toUpperCase()];
    return tValue ? tValue + (values[1] ? (" " + values[1]) : "")  : value;
}

function replaceDays(value, translation) {
    return translation["DAYS_" + value.toUpperCase()] || value;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export default ({defaults, add, onActiveTab, onClick, isDisabled, translations}) => (
    <div className="react-input-moment r-calendar tab-m is-active">
        <div className="react-input-moment toolbar">
            <button className="react-input-moment prev-month" onClick={add(-1, 'month')}>
                <i className="react-input-moment ion-md-arrow-dropleft"></i>
            </button>
            <span className="react-input-moment current-date react-textselect" style={{marginRight:"-5px"}}>
                {replaceMonths(defaults.selected.format("MMMM YYYY"), translations)}
                {defaults.monthSelect && (<select className='react-textselect-input react-input-moment'
                        onChange={({target})=>{ onClick(defaults.selected.clone().month(target.value))}}
                        value={Number(defaults.selected.format("MM")) -1 }>
                {MONTHS.map((x, index)=> (<option value={index}
                                                  className="react-input-moment"
                                                  disabled={isDisabled(defaults.min, defaults.max, defaults.selected.clone().month(x), defaults.date, x)}
                                                  key={index}>{replaceMonths(x, translations)}
                                                  </option>))}
                </select>)}
            </span>
            <button className="react-input-moment next-month" onClick={add(1, 'month')}>
                <i className="react-input-moment ion-md-arrow-dropright"></i>
            </button>
            <button className="react-input-moment next-month" style={{marginRight:"5px"}} onClick={()=> {onActiveTab(2)}}>
                <i className="react-input-moment fa fa-level-down" aria-hidden="true"></i>
            </button>
        </div>
        <table className="react-input-moment">
            <thead className="react-input-moment">
            <tr className="react-input-moment">
                {defaults.months.map((x, i)=> (
                    <td key={i}>{replaceDays(x, translations)}</td>
                ))}
            </tr>
            </thead>
            <tbody className="react-input-moment">
            {defaults.days.map((items, index) => (<tr key={index}>
                {items.map((x, iIndex)=> (<td key={index + "" + iIndex}
                                              className={isDisabled(defaults.min, defaults.max, defaults.selected.clone().date(x), defaults.date, x) + " react-input-moment"}
                                              onClick={()=> x!=="" && onClick(defaults.selected.clone().date(x))}>{x}</td>))}
            </tr>))}
            </tbody>
        </table>
    </div>
);