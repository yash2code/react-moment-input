var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DatePicker from './date';
import YearPicker from './year';
import TimePicker from './time';
import Options from './options';
import Input from './input';

import '../css/style.css';
import 'ionicons/dist/css/ionicons.min.css';

var _mapper = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export var MomentInput = function (_Component) {
    _inherits(MomentInput, _Component);

    function MomentInput(props) {
        _classCallCheck(this, MomentInput);

        var _this = _possibleConstructorReturn(this, (MomentInput.__proto__ || Object.getPrototypeOf(MomentInput)).call(this, props));

        _this.state = {
            selected: (props.value || moment()).clone(),
            activeTab: props.tab,
            date: props.value,
            textValue: "",
            isValid: true,
            isOpen: props.isOpen
        };

        _this.onDayClick = _this.onDayClick.bind(_this);
        _this.onActiveTab = _this.onActiveTab.bind(_this);
        _this.onSetTime = _this.onSetTime.bind(_this);

        _this.inputClick = _this.inputClick.bind(_this);
        _this.onClose = _this.onClose.bind(_this);
        _this.onTextChange = _this.onTextChange.bind(_this);
        _this.isDisabled = _this.isDisabled.bind(_this);
        _this.add = _this.add.bind(_this);
        return _this;
    }

    _createClass(MomentInput, [{
        key: 'add',
        value: function add(next, type) {
            var self = this;
            return function () {
                self.setState({ selected: self.state.selected.add(type, next) });
            };
        }
    }, {
        key: 'onDayClick',
        value: function onDayClick(date) {
            this.setState({ date: date, isValid: true });

            if (this.props.onChange) this.props.onChange(date, this.props.name);
        }
    }, {
        key: 'onActiveTab',
        value: function onActiveTab(tab) {
            this.setState({ activeTab: tab });
        }
    }, {
        key: 'onSetTime',
        value: function onSetTime(type) {
            var self = this;
            return function (_ref) {
                var x = _ref.x;

                if (self.state.date) {
                    self.state.date.set(type, x);

                    if (self.props.onChange) self.props.onChange(self.state.date, self.props.name);
                }

                self.setState({
                    selected: self.state.selected.set(type, x),
                    date: self.state.date,
                    isValid: self.state.date ? true : self.state.isValid
                });
            };
        }
    }, {
        key: 'isDisabled',
        value: function isDisabled(min, max, selected, date, value, isYear) {
            if (!this.isValid(min, max, selected, value, isYear)) return "disabled-day";else if (date && (selected.format("YYYY-MM-DD") === date.format("YYYY-MM-DD") || isYear && selected.format("YYYY") === date.format("YYYY"))) return "selected-day";else return "";
        }
    }, {
        key: 'isValid',
        value: function isValid(min, max, selected, value, isYear) {
            return !(!isYear && (value === "" || min && selected.diff(min, 'day') < 0 || max && selected.diff(max, 'day') > 0));
        }
    }, {
        key: 'inputClick',
        value: function inputClick(e) {
            var isOpen = this.state.isOpen;

            this.setState({ isOpen: !isOpen });

            if (isOpen) return window.removeEventListener('click', this.onClose);

            var _props = this.props,
                onChange = _props.onChange,
                onClose = _props.onClose;

            if (onChange || onClose) window.addEventListener('click', this.onClose);

            e.stopPropagation();
        }
    }, {
        key: 'onClose',
        value: function onClose(e) {
            var _props2 = this.props,
                onClose = _props2.onClose,
                name = _props2.name;

            var inputMoment = e.path && e.path.find(function (x) {
                return x.className === "m-input-moment";
            });
            if (inputMoment) return;

            this.setState({ isOpen: false });
            window.removeEventListener('click', this.onClose);

            var date = this.state.date;

            if (onClose) onClose(date, name);
        }
    }, {
        key: 'onTextChange',
        value: function onTextChange(e) {
            var val = e.target.value;
            var _props3 = this.props,
                onChange = _props3.onChange,
                name = _props3.name,
                min = _props3.min,
                max = _props3.max,
                format = _props3.format;

            var item = moment(val, format, true);
            if (!item.isValid() || !this.isValid(min, max, item, val, false)) return this.setState({ textValue: val, date: null, isValid: false });

            if (onChange) onChange(item, name);

            this.setState({ selected: item, date: item, textValue: val, isValid: true });
        }
    }, {
        key: 'renderTab',
        value: function renderTab() {
            var _props4 = this.props,
                min = _props4.min,
                max = _props4.max;
            var _state = this.state,
                selected = _state.selected,
                activeTab = _state.activeTab,
                date = _state.date;

            switch (activeTab) {
                case 1:
                    return React.createElement(TimePicker, {
                        selected: selected,
                        onSetTime: this.onSetTime
                    });
                case 2:
                    return React.createElement(YearPicker, {
                        defaults: { selected: selected, min: min, max: max, date: date, years: this.Years },
                        add: this.add,
                        onActiveTab: this.onActiveTab,
                        onClick: this.onDayClick,
                        isDisabled: this.isDisabled
                    });
                default:
                    return React.createElement(DatePicker, {
                        defaults: { selected: selected, min: min, max: max, date: date, days: this.Days, months: _mapper },
                        add: this.add,
                        onActiveTab: this.onActiveTab,
                        onClick: this.onDayClick,
                        isDisabled: this.isDisabled
                    });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props5 = this.props,
                options = _props5.options,
                onSave = _props5.onSave,
                value = _props5.value,
                style = _props5.style,
                className = _props5.className,
                inputClassName = _props5.inputClassName,
                inputStyle = _props5.inputStyle,
                name = _props5.name,
                readOnly = _props5.readOnly,
                format = _props5.format;
            var _state2 = this.state,
                selected = _state2.selected,
                activeTab = _state2.activeTab,
                date = _state2.date,
                isOpen = _state2.isOpen,
                textValue = _state2.textValue,
                isValid = _state2.isValid;

            var inputValue = onSave && value ? value.format(format) : date ? date.format(format) : "";

            return React.createElement(
                'div',
                { style: style, className: className },
                React.createElement(Input, {
                    defaults: { readOnly: readOnly, isValid: isValid, format: format, value: inputValue || textValue },
                    onClick: this.inputClick,
                    onTextChange: this.onTextChange,
                    inputClassName: inputClassName,
                    inputStyle: inputStyle
                }),
                isOpen && React.createElement(
                    'div',
                    { className: 'm-input-moment', style: { position: "absolute", backgroundColor: "white", zIndex: 99 } },
                    options && React.createElement(Options, { activeTab: activeTab, onActiveTab: this.onActiveTab }),
                    React.createElement(
                        'div',
                        { className: 'tabs' },
                        this.renderTab()
                    ),
                    onSave && React.createElement(
                        'button',
                        { className: 'im-btn btn-save ion-checkmark', onClick: function onClick() {
                                _this2.setState({ isOpen: false });onSave(date || selected, name);
                            } },
                        'Save'
                    )
                )
            );
        }
    }, {
        key: 'Years',
        get: function get() {
            var selected = this.state.selected;

            var year = Number(selected.format("YYYY"));
            var items = [];

            var i = 0;
            do {
                if (i % 3 === 0) items.push([]);

                items[items.length - 1].push(year++);
                i++;
            } while (i < 12);

            return items;
        }
    }, {
        key: 'Days',
        get: function get() {
            var selected = this.state.selected;

            var first = selected.clone().date(1);

            var days = first.daysInMonth();
            var index = _mapper.findIndex(function (x) {
                return x === first.format('ddd');
            });

            var items = [];
            var nextDay = 1;
            var i = 0;
            do {
                if (i % 7 === 0) items.push([]);

                items[items.length - 1].push(i < index ? "" : nextDay++);
                i++;
            } while (nextDay <= days);

            var length = items[items.length - 1].length;
            for (var _i = length; _i < 7; _i++) {
                items[items.length - 1].push("");
            }return items;
        }
    }]);

    return MomentInput;
}(Component);

MomentInput.defaultProps = {
    tab: 0,
    isOpen: false,
    options: true,
    readOnly: true,
    format: "YYYY-MM-DD HH:mm",
    inputClassName: "form-control"
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
    value: PropTypes.instanceOf(moment),
    style: PropTypes.object,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    inputStyle: PropTypes.object
};

export default MomentInput;