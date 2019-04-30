import React from 'react';
import InputSlider from 'react-input-slider';

export default ({selected, onSetTime, translations, isAM}) => (
    <div className="r-time tab-m is-active" style={{paddingBottom:"10px"}}>
        <div className="showtime">
            <span className="time">{selected.format(isAM ? "hh Z" :"HH Z").split(' ')[0]}</span>
            <span className="separater">:</span>
            <span className="time">{selected.format("mm Z").split(' ')[0]}</span>
            { isAM && (<span className="separater"></span>) }
            { isAM && (<span className="time">{Number(selected.format("HH Z").split(' ')[0])>= 12 ? "PM" : "AM"}</span>) }

        </div>
        <div className="sliders">
            <div className="time-text">
                {translations.HOURS || "Hours"}:
            </div>
            <InputSlider
                className="u-slider u-slider-x u-slider-time"
                axis="x"
                x={Number(selected.format('HH Z').split(' ')[0])}
                xmax={23}
                onChange={onSetTime('hours')}
            />
            <div className="time-text">
                {translations.MINUTES || "Minutes"}:
            </div>
            <InputSlider
                className="u-slider u-slider-x u-slider-time"
                axis="x"
                x={Number(selected.format('mm Z').split(' ')[0])}
                xmax={59}
                onChange={onSetTime('minutes')}
            />
        </div>
    </div>
);