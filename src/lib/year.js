import React from 'react';

export default ({defaults, add, onActiveTab, onClick, isDisabled, translations}) => (
    <div className="r-calendar tab-m is-active react-input-moment">
        <div className="toolbar react-input-moment">
            <button className="prev-month react-input-moment" onClick={add(-12,'year')}>
                <i className="ion-md-arrow-dropleft react-input-moment"></i>
            </button>
            <span className="current-date react-input-moment" style={{marginRight:"-5px"}}>
                {translations.YEARS || "Years"}
                        </span>
            <button className="next-month react-input-moment" onClick={add(12,'year')}>
                <i className="ion-md-arrow-dropright react-input-moment"></i>
            </button>
            <button className="next-month react-input-moment" style={{marginRight:"5px"}} onClick={()=> {onActiveTab(0)}}>
                <i className="fa fa-level-up react-input-moment" aria-hidden="true"></i>
            </button>
        </div>
        <table react-input-moment>
            <tbody react-input-moment>
            {defaults.years.map((items, index) => (<tr key={index}>
                {items.map((x, iIndex)=> (<td key={index + "" + iIndex}
                                              className={isDisabled(defaults.min, defaults.max, defaults.selected.clone().year(x), defaults.date, x, false) + " react-input-moment"}
                                              onClick={()=> onClick(defaults.selected.clone().year(x))}
                >{x}</td>))}
            </tr>))}
            </tbody>
        </table>
    </div>
);