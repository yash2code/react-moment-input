import React from 'react';
import InputSlider from 'react-input-slider';

export default ({selected, onSetTime, translations, isAM}) => (
    <div className="r-time tab-m is-active react-input-moment" style={{paddingBottom:"10px"}}>
        <div className="showtime react-input-moment">
            <span className="time react-input-moment">{selected.format(isAM ? "hh" :"HH")}</span>
            <span className="separater react-input-moment">:</span>
            <span className="time react-input-moment">{selected.format("mm")}</span>
            { isAM && (<span className="separater react-input-moment"></span>) }
            { isAM && (<span className="time react-input-moment">{Number(selected.format("HH"))>= 12 ? "PM" : "AM"}</span>) }

        </div>
        <div className="sliders react-input-moment">
            <div className="time-text react-input-moment">
                {translations.HOURS || "Hours"}:
            </div>
            <InputSlider
                className="u-slider u-slider-x u-slider-time react-input-moment"
                axis="x"
                x={Number(selected.format('HH'))}
                xmax={23}
                onChange={onSetTime('hours')}
            />
            <div className="time-text react-input-moment">
                {translations.MINUTES || "Minutes"}:
            </div>
            <InputSlider
                className="u-slider u-slider-x u-slider-time react-input-moment"
                axis="x"
                x={Number(selected.format('mm'))}
                xmax={59}
                onChange={onSetTime('minutes')}
            />
        </div>
    </div>
);