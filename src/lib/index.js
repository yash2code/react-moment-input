import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import DatePicker from './date';
import YearPicker from './year';
import TimePicker from './time';
import Options from './options';
import Input from './input';

import './css/style.css'
import 'ionicons/dist/css/ionicons.min.css'
import 'font-awesome/css/font-awesome.min.css'

export class MomentInput extends Component {
    constructor(props) {
        super(props);

        this._id = Math.random().toString();
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
        this.closePicker = this.closePicker.bind(this);
        this.closeOnBlur = this.closeOnBlur.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.isDisabled = this.isDisabled.bind(this);
        this.add = this.add.bind(this);
        this.onDecrease=this.onDecrease.bind(this);
        this.onIncrease=this.onIncrease.bind(this);
    }

    componentDidMount() {
        this.defaultTime = this.props.defaultTime;
        let date = this.props.defaultValue;
        if (this.props.defaultTime && date)
            date = new moment(date.format("YYYY-MM-DD ") + this.defaultTime);

        if (date)
            this.setState({date: date, selected: date});
    }

    add(next, type) {
        const self = this;
        return function () {
            self.setState({selected: self.state.selected.add(type, next)});
        }
    }

    onDayClick(date) {
        const {min, max, format} = this.props;
        const{isOpen} = this.state;
        if(this.defaultTime)
            date = new moment(date.format("YYYY-MM-DD ") + this.defaultTime);

        if (!this.isValid(min,max, date, date.format(format), false, "day"))
            return;

        this.setState({date, selected: date, isValid: true});
        if (this.props.onChange)
            this.props.onChange(date, this.props.name,isOpen);
    }

    onActiveTab(tab) {
        this.setState({activeTab: tab});
    }

    onSetTime(type) {
        const self = this;
        return function ({x}) {
            self.state.selected.set(type, x);
            self.defaultTime = null;
           /* const {min, max, format} = self.props;
            if (!self.isValid(min,max, self.state.selected, self.state.selected.format(format), false, "minutes"))
                return self.setState({isValid: false});*/

            if (self.state.date) {
                self.state.date.set(type, x);

                if (self.props.onChange)
                    self.props.onChange(self.state.date, self.props.name,self.state.isOpen);
            }

            self.setState({
                selected: self.state.selected,
                date: self.state.date,
                isValid: self.state.date ? true : self.state.isValid
            });
        }
    }

    isDisabled(min, max, selected, date, value, isYear) {
        if (!this.isValid(min,max, selected, value, isYear, "day"))
            return "disabled-day";
        else if (date && (selected.format("YYYY-MM-DD") === date.format("YYYY-MM-DD") ||
            (isYear && selected.format("YYYY") === date.format("YYYY"))))
            return "selected-day";
        else
            return "";
    }

    isValid(min, max, selected, value, isYear, type = "day"){
        return !(!isYear && (value==="" || (min && selected.diff(min, type) < 0) || (max && selected.diff(max, type)>0)))
    }

    inputClick(e) {
        const {isOpen} = this.state;
        this.setState({isOpen: !isOpen});

        if (isOpen)
            return window.removeEventListener('click', this.onClose);

        const {onChange, onClose} = this.props;
        if (onChange || onClose)
            window.addEventListener('click', this.onClose);

       // e.stopPropagation();
    }

    closePicker(){
        const {onClose, name} = this.props;
        this.setState({isOpen: false});
        window.removeEventListener('click', this.onClose);

        const {date} = this.state;
        if (onClose)
            onClose(date, name);
    }

    closeOnBlur(e){
        if (e.currentTarget.contains(e.relatedTarget))
            return;
        this.closePicker();
    }

    onDecrease(date){
        if(this.props.onDecrease){
            this.props.onDecrease();
            return;
        }
        const newDate=new moment(date,this.props.format);
        const format=newDate.creationData().format.toString();

        if(format.indexOf('ss')!==-1){
            newDate.subtract(1,'seconds');
        }
        else if(format.indexOf('mm')!==-1){
            newDate.subtract(1,'minutes');
        }
        else if(format.indexOf('hh')!==-1){
            newDate.subtract(1,'hours');
        }
        else if(format.indexOf('DD')!==-1){
            newDate.subtract(1,'days');
        }
        else if(format.indexOf('MM')!==-1){
            newDate.subtract(1,'months');
        }
        else if(format.indexOf('YY')!==-1){
            newDate.subtract(1,'years');
        }
        const textChangeValue = this.props.value && this.props.value._z && this.props.value._z.name !== 'UTC' ? newDate.format(this.props.format):newDate.utc().format(this.props.format);
        this.onTextChange({target: {value: textChangeValue}});
    }

    onIncrease(date){
        if(this.props.onIncrease){
            this.props.onIncrease();
            return;
        }
        const newDate=new moment(date,this.props.format);
        const format=newDate.creationData().format.toString();

        if(format.indexOf('ss')!==-1){
            newDate.add(1,'seconds');
        }
        else if(format.indexOf('mm')!==-1){
            newDate.add(1,'minutes');
        }
        else if(format.indexOf('hh')!==-1){
            newDate.add(1,'hours');
        }
        else if(format.indexOf('DD')!==-1){
            newDate.add(1,'days');
        }
        else if(format.indexOf('MM')!==-1){
            newDate.add(1,'months');
        }
        else if(format.indexOf('YY')!==-1){
            newDate.add(1,'years');
        }
        const textChangeValue = this.props.value && this.props.value._z && this.props.value._z.name !== 'UTC'? newDate.format(this.props.format):newDate.utc().format(this.props.format);
        this.onTextChange({target: {value: textChangeValue}});
    }

    onClose(e) {
        const autoClose=this.props.autoClose;
        if (this.node.contains(e.target) && !autoClose){
            return;
        }
        const activeElementId=document.activeElement.parentElement.id;
        if(activeElementId!=='input-container' && this.node.contains(e.target))
            return;
        this.closePicker();
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
        const {daysOfWeek} = this.props;
        const {selected} = this.state;
        const first = selected.clone().date(1);

        const days = first.daysInMonth();
        const index = daysOfWeek.findIndex(x=> x === first.format('ddd'));

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

        const {onChange, name, min, max, format,value,onSave} = this.props;
        const {isOpen,date} = this.state;
        const tz = (onSave?(date && date._z?date._z.name:'UTC'):(value && value._z?value._z.name:'UTC'));
        let nFormat;
        if(format[format.length -1].toUpperCase()==="A")
            nFormat = format.replace("A","").replace("a","");
        else
            nFormat = format;

        if(nFormat.match(/H|h|m|s/g)){
            nFormat = nFormat.split(' ')[0];
            nFormat+= ' Z';
            const tzOffset = moment().tz(tz).format('Z');
            val = val.split(' ')[0];
            val+=` ${tzOffset}`;//`
        }

        let item = moment(val, nFormat, true).tz(tz);

        if (!item.isValid() || !this.isValid(min, max, item, val, false, "minutes"))
            return this.setState({textValue: val, date: null, isValid: false});

        if (onChange)
            onChange(item, name,isOpen);

        this.setState({selected: item, date: item, textValue: val, isValid: true});
    }

    renderTab(){
        const {min, max, translations, daysOfWeek, format, monthSelect,value,onSave} = this.props;
        const {selected, activeTab, date} = this.state;
        const tabValue = onSave?selected:(value?value:selected);
        switch (activeTab){
            case 1:
                return (<TimePicker
                    selected={tabValue}
                    onSetTime={this.onSetTime}
                    translations={translations}
                    isAM={format.indexOf("hh")!==-1}
                />);
            case 2:
                return (<YearPicker
                    defaults={{selected:tabValue, min, max, date, years: this.Years}}
                    add={this.add}
                    onActiveTab={this.onActiveTab}
                    onClick={this.onDayClick}
                    isDisabled={this.isDisabled}
                    translations={translations}
                />);
            default:
                return (<DatePicker
                    defaults={{selected:tabValue, min, max, date, monthSelect, days: this.Days, months: daysOfWeek}}
                    add={this.add}
                    onActiveTab={this.onActiveTab}
                    onClick={this.onDayClick}
                    isDisabled={this.isDisabled}
                    translations={translations}
                />)
        }
    }

    render() {
        const { options, onSave, today, value, style, className, inputClassName, inputStyle, name, readOnly, format, icon, translations, position, enableInputClick, iconType, inputCustomControl} = this.props;
        const {selected, activeTab, date, isOpen, textValue, isValid} = this.state;
        let inputValue = onSave?((date ? date.format(format) : "") || (value ? value.format(format) :"")):((value ? value.format(format) :"") || (date ? date.format(format) : ""));
        return (
            <div style={style} className={className} ref={node => this.node = node} onBlur={this.closeOnBlur} id='input-container'>
                <Input
                    defaults={{readOnly, isValid, format, icon, value:(inputValue || textValue), enableInputClick, iconType,inputCustomControl,
                    }}
                    onClick={this.inputClick}
                    onDecrease={this.onDecrease}
                    onIncrease={this.onIncrease}
                    onTextChange={this.onTextChange}
                    className={inputClassName}
                    style={inputStyle}
                />
                {isOpen &&
                <div className="r-input-moment" id={this._id} style={position === "bottom" ? {} : { display:"inline-block"}} tabIndex={-1}>
                    {options && <Options
                        activeTab={activeTab}
                        onActiveTab={this.onActiveTab}
                        translations={translations} />}
                    <div className="tabs">
                        {this.renderTab()}
                    </div>
                    {today && <button className="im-btn btn-save ion-checkmark" tabIndex={-1} onClick={()=> {this.onDayClick(moment())}}>{translations.TODAY || "Today"}</button>}
                    {onSave && <button className="im-btn btn-save ion-checkmark" tabIndex={-1} onClick={()=> {this.setState({isOpen:false}); onSave(date || selected, name)}}>{translations.SAVE || "Save"}</button>}
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
    monthSelect:true,
    position:"bottom",
    today:false,
    translations: {},
    icon:false,
    format:"YYYY-MM-DD HH:mm",
    inputClassName:"r-input",
    inputCustomControl: false,
    daysOfWeek:['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
};

MomentInput.propTypes = {
    name: PropTypes.string,
    format: PropTypes.string,
    position: PropTypes.string,
    readOnly: PropTypes.bool,
    monthSelect: PropTypes.bool,
    today: PropTypes.bool,
    translations: PropTypes.object,
    daysOfWeek: PropTypes.array,
    icon: PropTypes.bool,
    min: PropTypes.object,
    max: PropTypes.object,
    options: PropTypes.bool,
    tab: PropTypes.number,
    isOpen: PropTypes.bool,
    onSave: PropTypes.func,
    onClose: PropTypes.func,
    onChange: PropTypes.func,
    value:PropTypes.object,
    defaultValue:PropTypes.object,
    defaultTime:PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    inputStyle: PropTypes.object,
    enableInputClick: PropTypes.bool,
    autoClose: PropTypes.bool,
    iconType: PropTypes.Object,
    onDecrease: PropTypes.func,
    onIncrease: PropTypes.func,
    inputCustomControl: PropTypes.bool,
};

export default MomentInput;