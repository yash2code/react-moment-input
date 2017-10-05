import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DatePicker from './date';
import YearPicker from './year';
import TimePicker from './time';
import Options from './options';
import Input from './input';

import './css/style.css'
import 'ionicons/dist/css/ionicons.min.css'

const _mapper = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
export class MomentInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: (props.value || moment()).clone(),
            activeTab: props.tab,
            date:props.value,
            textValue: "",
            isValid: true,
            isOpen:props.isOpen
        };

        this.onDayClick = this.onDayClick.bind(this);
        this.onActiveTab = this.onActiveTab.bind(this);
        this.onSetTime = this.onSetTime.bind(this);

        this.inputClick = this.inputClick.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.isDisabled = this.isDisabled.bind(this);
        this.add = this.add.bind(this);
    }

    add(next, type) {
        const self = this;
        return function () {
            self.setState({selected: self.state.selected.add(type, next)});
        }
    }

    onDayClick(date) {
        this.setState({date, isValid: true});

        if (this.props.onChange)
            this.props.onChange(date, this.props.name);
    }

    onActiveTab(tab) {
        this.setState({activeTab: tab});
    }

    onSetTime(type) {
        const self = this;
        return function ({x}) {
            if (self.state.date) {
                self.state.date.set(type, x);

                if (self.props.onChange)
                    self.props.onChange(self.state.date, self.props.name);
            }

            self.setState({
                selected: self.state.selected.set(type, x),
                date: self.state.date,
                isValid: self.state.date ? true : self.state.isValid
            });
        }
    }

    isDisabled(min, max, selected, date, value, isYear) {
        if (!this.isValid(min,max, selected, value, isYear))
            return "disabled-day";
        else if (date && (selected.format("YYYY-MM-DD") === date.format("YYYY-MM-DD") ||
            (isYear && selected.format("YYYY") === date.format("YYYY"))))
            return "selected-day";
        else
            return "";
    }

    isValid(min, max, selected, value, isYear){
        return !(!isYear && (value==="" || (min && selected.diff(min, 'day') < 0) || (max && selected.diff(max, 'day')>0)))
    }

    inputClick(e) {
        const {isOpen} = this.state;
        this.setState({isOpen: !isOpen});

        if (isOpen)
            return window.removeEventListener('click', this.onClose);

        const {onChange, onClose} = this.props;
        if (onChange || onClose)
            window.addEventListener('click', this.onClose);

        e.stopPropagation();
    }

    onClose(e) {
        const {onClose, name} = this.props;
        let inputMoment = e.path && e.path.find(x => x.className === "m-input-moment");
        if (inputMoment)
            return;

        this.setState({isOpen: false});
        window.removeEventListener('click', this.onClose);

        const {date} = this.state;
        if (onClose)
            onClose(date, name);
    }

    get Years(){
        const {selected} = this.state;
        let year = Number(selected.format("YYYY"));
        let items = [];

        let i=0;
        do {
            if ((i) % 3 === 0)
                items.push([]);

            items[items.length - 1].push(year++);
            i++;
        } while (i < 12);

        return items;
    }

    get Days() {
        const {selected} = this.state;
        const first = selected.clone().date(1);

        const days = first.daysInMonth();
        const index = _mapper.findIndex(x=> x === first.format('ddd'));

        let items = [];
        let nextDay = 1;
        let i = 0;
        do {
            if ((i) % 7 === 0)
                items.push([]);

            items[items.length - 1].push(i < index ? "" : nextDay++);
            i++;
        } while (nextDay <= days);

        const length = items[items.length - 1].length;
        for (let i = length; i < 7; i++)
            items[items.length - 1].push("");

        return items;
    }

    onTextChange(e) {
        let val = e.target.value;
        const {onChange, name, min, max, format} = this.props;
        let item = moment(val, format, true);
        if (!item.isValid() || !this.isValid(min, max, item, val, false))
            return this.setState({textValue: val, date: null, isValid: false});

        if (onChange)
            onChange(item, name);

        this.setState({selected: item, date: item, textValue: val, isValid: true});
    }

    renderTab(){
        const {min, max} = this.props;
        const {selected, activeTab, date} = this.state;
        switch (activeTab){
            case 1:
                return (<TimePicker
                    selected={selected}
                    onSetTime={this.onSetTime}
                />);
            case 2:
                return (<YearPicker
                    defaults={{selected, min, max, date, years: this.Years}}
                    add={this.add}
                    onActiveTab={this.onActiveTab}
                    onClick={this.onDayClick}
                    isDisabled={this.isDisabled}
                />);
            default:
                return (<DatePicker
                    defaults={{selected, min, max, date, days: this.Days, months: _mapper}}
                    add={this.add}
                    onActiveTab={this.onActiveTab}
                    onClick={this.onDayClick}
                    isDisabled={this.isDisabled}
                />)
        }
    }

    render() {
        const { options, onSave, value, style, className, inputClassName, inputStyle, name, readOnly, format} = this.props;
        const {selected, activeTab, date, isOpen, textValue, isValid} = this.state;
        let inputValue = (onSave && value) ? value.format(format) : (date ? date.format(format) : "");

        return (
            <div style={style} className={className}>
                <Input
                    defaults={{readOnly, isValid, format, value:(inputValue || textValue)}}
                    onClick={this.inputClick}
                    onTextChange={this.onTextChange}
                    className={inputClassName}
                    style={inputStyle}
                />
                {isOpen &&
                <div className="m-input-moment" style={{position:"absolute", backgroundColor:"white", zIndex:99}}>
                    {options && <Options activeTab={activeTab} onActiveTab={this.onActiveTab} />}
                    <div className="tabs">
                        {this.renderTab()}
                    </div>
                    {onSave && <button className="im-btn btn-save ion-checkmark" onClick={()=> {this.setState({isOpen:false}); onSave(date || selected, name)}}>Save</button>}
                </div>}
            </div>
        );
    }
}

MomentInput.defaultProps = {
    tab: 0,
    isOpen: false,
    options: true,
    readOnly:true,
    format:"YYYY-MM-DD HH:mm",
    inputClassName:"form-control"
};

MomentInput.propTypes = {
    name: PropTypes.string,
    format: PropTypes.string,
    readOnly: PropTypes.bool,
    min: PropTypes.instanceOf(moment),
    max: PropTypes.instanceOf(moment),
    options: PropTypes.bool,
    tab: PropTypes.number,
    isOpen: PropTypes.bool,
    onSave: PropTypes.func,
    onClose: PropTypes.func,
    onChange: PropTypes.func,
    value:PropTypes.instanceOf(moment),
    style: PropTypes.object,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    inputStyle: PropTypes.object
};

export default MomentInput;