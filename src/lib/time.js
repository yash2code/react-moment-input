import React from 'react';
import InputSlider from 'react-input-slider';

export default ({selected, onSetTime}) => (
    <div className="r-time tab-m is-active" style={{paddingBottom:"10px"}}>
        <div className="showtime">
            <span className="time">{selected.format("HH")}</span>
            <span className="separater">:</span>
            <span className="time">{selected.format("mm")}</span>
        </div>
        <div className="sliders">
            <div className="time-text">
                Hours:
            </div>
            <InputSlider
                className="u-slider u-slider-x u-slider-time"
                axis="x"
                x={Number(selected.format('HH'))}
                xmax={23}
                onChange={onSetTime('hours')}
            />
            <div className="time-text">
                Minutes:
            </div>
            <InputSlider
                className="u-slider u-slider-x u-slider-time"
                axis="x"
                x={Number(selected.format('mm'))}
                xmax={59}
                onChange={onSetTime('minutes')}
            />
        </div>
    </div>
);