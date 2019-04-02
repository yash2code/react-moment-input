'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MomentInput = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

var _year = require('./year');

var _year2 = _interopRequireDefault(_year);

var _time = require('./time');

var _time2 = _interopRequireDefault(_time);

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

require('./css/style.css');

require('ionicons/dist/css/ionicons.min.css');

require('font-awesome/css/font-awesome.min.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MomentInput = exports.MomentInput = function (_Component) {
    _inherits(MomentInput, _Component);

    function MomentInput(props) {
        _classCallCheck(this, MomentInput);

        var _this = _possibleConstructorReturn(this, (MomentInput.__proto__ || Object.getPrototypeOf(MomentInput)).call(this, props));

        _this._id = Math.random().toString();
        _this.state = {
            selected: (props.value || (0, _moment2.default)()).clone(),
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
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.defaultTime = this.props.defaultTime;
            var date = this.props.defaultValue;
            if (this.props.defaultTime && date) date = new _moment2.default(date.format("YYYY-MM-DD ") + this.defaultTime);

            if (date) this.setState({ date: date, selected: date });
        }
    }, {
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
            var _props = this.props,
                min = _props.min,
                max = _props.max,
                format = _props.format;


            if (this.defaultTime) date = new _moment2.default(date.format("YYYY-MM-DD ") + this.defaultTime);

            if (!this.isValid(min, max, date, date.format(format), false, "day")) return;

            this.setState({ date: date, selected: date, isValid: true });
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

                self.state.selected.set(type, x);
                self.defaultTime = null;
                /* const {min, max, format} = self.props;
                 if (!self.isValid(min,max, self.state.selected, self.state.selected.format(format), false, "minutes"))
                     return self.setState({isValid: false});*/

                if (self.state.date) {
                    self.state.date.set(type, x);

                    if (self.props.onChange) self.props.onChange(self.state.date, self.props.name);
                }

                self.setState({
                    selected: self.state.selected,
                    date: self.state.date,
                    isValid: self.state.date ? true : self.state.isValid
                });
            };
        }
    }, {
        key: 'isDisabled',
        value: function isDisabled(min, max, selected, date, value, isYear) {
            if (!this.isValid(min, max, selected, value, isYear, "day")) return "disabled-day";else if (date && (selected.format("YYYY-MM-DD") === date.format("YYYY-MM-DD") || isYear && selected.format("YYYY") === date.format("YYYY"))) return "selected-day";else return "";
        }
    }, {
        key: 'isValid',
        value: function isValid(min, max, selected, value, isYear) {
            var type = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "day";

            return !(!isYear && (value === "" || min && selected.diff(min, type) < 0 || max && selected.diff(max, type) > 0));
        }
    }, {
        key: 'inputClick',
        value: function inputClick(e) {
            var isOpen = this.state.isOpen;

            this.setState({ isOpen: !isOpen });

            if (isOpen) return window.removeEventListener('click', this.onClose);

            var _props2 = this.props,
                onChange = _props2.onChange,
                onClose = _props2.onClose;

            if (onChange || onClose) window.addEventListener('click', this.onClose);

            // e.stopPropagation();
        }
    }, {
        key: 'onClose',
        value: function onClose(e) {
            console.log(e.target);
            if (this.node.contains(e.target)) return;

            var _props3 = this.props,
                onClose = _props3.onClose,
                name = _props3.name;

            this.setState({ isOpen: false });
            window.removeEventListener('click', this.onClose);

            var date = this.state.date;

            if (onClose) onClose(date, name);
        }
    }, {
        key: 'onTextChange',
        value: function onTextChange(e) {
            var val = e.target.value;

            var _props4 = this.props,
                onChange = _props4.onChange,
                name = _props4.name,
                min = _props4.min,
                max = _props4.max,
                format = _props4.format;


            var nFormat = void 0;
            if (format[format.length - 1].toUpperCase() === "A") nFormat = format.replace("A", "").replace("a", "");else nFormat = format;

            var item = (0, _moment2.default)(val, nFormat, true);

            if (!item.isValid() || !this.isValid(min, max, item, val, false, "minutes")) return this.setState({ textValue: val, date: null, isValid: false });

            if (onChange) onChange(item, name);

            this.setState({ selected: item, date: item, textValue: val, isValid: true });
        }
    }, {
        key: 'renderTab',
        value: function renderTab() {
            var _props5 = this.props,
                min = _props5.min,
                max = _props5.max,
                translations = _props5.translations,
                daysOfWeek = _props5.daysOfWeek,
                format = _props5.format,
                monthSelect = _props5.monthSelect;
            var _state = this.state,
                selected = _state.selected,
                activeTab = _state.activeTab,
                date = _state.date;

            switch (activeTab) {
                case 1:
                    return _react2.default.createElement(_time2.default, {
                        selected: selected,
                        onSetTime: this.onSetTime,
                        translations: translations,
                        isAM: format.indexOf("hh") !== -1
                    });
                case 2:
                    return _react2.default.createElement(_year2.default, {
                        defaults: { selected: selected, min: min, max: max, date: date, years: this.Years },
                        add: this.add,
                        onActiveTab: this.onActiveTab,
                        onClick: this.onDayClick,
                        isDisabled: this.isDisabled,
                        translations: translations
                    });
                default:
                    return _react2.default.createElement(_date2.default, {
                        defaults: { selected: selected, min: min, max: max, date: date, monthSelect: monthSelect, days: this.Days, months: daysOfWeek },
                        add: this.add,
                        onActiveTab: this.onActiveTab,
                        onClick: this.onDayClick,
                        isDisabled: this.isDisabled,
                        translations: translations
                    });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props6 = this.props,
                options = _props6.options,
                onSave = _props6.onSave,
                today = _props6.today,
                value = _props6.value,
                style = _props6.style,
                className = _props6.className,
                inputClassName = _props6.inputClassName,
                inputStyle = _props6.inputStyle,
                name = _props6.name,
                readOnly = _props6.readOnly,
                format = _props6.format,
                icon = _props6.icon,
                translations = _props6.translations,
                position = _props6.position,
                enableInputClick = _props6.enableInputClick,
                iconType = _props6.iconType;
            var _state2 = this.state,
                selected = _state2.selected,
                activeTab = _state2.activeTab,
                date = _state2.date,
                isOpen = _state2.isOpen,
                textValue = _state2.textValue,
                isValid = _state2.isValid;

            var inputValue = value ? value.format(format) : date ? date.format(format) : "";
            return _react2.default.createElement(
                'div',
                { style: style, className: className, ref: function ref(node) {
                        return _this2.node = node;
                    } },
                _react2.default.createElement(_input2.default, {
                    defaults: { readOnly: readOnly, isValid: isValid, format: format, icon: icon, value: inputValue || textValue, enableInputClick: enableInputClick, iconType: iconType
                    },
                    onClick: this.inputClick,
                    onTextChange: this.onTextChange,
                    className: inputClassName,
                    style: inputStyle
                }),
                isOpen && _react2.default.createElement(
                    'div',
                    { className: 'r-input-moment', id: this._id, style: position === "bottom" ? {} : { display: "inline-block" } },
                    options && _react2.default.createElement(_options2.default, {
                        activeTab: activeTab,
                        onActiveTab: this.onActiveTab,
                        translations: translations }),
                    _react2.default.createElement(
                        'div',
                        { className: 'tabs' },
                        this.renderTab()
                    ),
                    today && _react2.default.createElement(
                        'button',
                        { className: 'im-btn btn-save ion-checkmark', onClick: function onClick() {
                                _this2.onDayClick((0, _moment2.default)());
                            } },
                        translations.TODAY || "Today"
                    ),
                    onSave && _react2.default.createElement(
                        'button',
                        { className: 'im-btn btn-save ion-checkmark', onClick: function onClick() {
                                _this2.setState({ isOpen: false });onSave(date || selected, name);
                            } },
                        translations.SAVE || "Save"
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
            var daysOfWeek = this.props.daysOfWeek;
            var selected = this.state.selected;

            var first = selected.clone().date(1);

            var days = first.daysInMonth();
            var index = daysOfWeek.findIndex(function (x) {
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
}(_react.Component);

MomentInput.defaultProps = {
    tab: 0,
    isOpen: false,
    options: true,
    readOnly: true,
    monthSelect: true,
    position: "bottom",
    today: false,
    translations: {},
    icon: false,
    format: "YYYY-MM-DD HH:mm",
    inputClassName: "r-input",
    daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};

MomentInput.propTypes = {
    name: _propTypes2.default.string,
    format: _propTypes2.default.string,
    position: _propTypes2.default.string,
    readOnly: _propTypes2.default.bool,
    monthSelect: _propTypes2.default.bool,
    today: _propTypes2.default.bool,
    translations: _propTypes2.default.object,
    daysOfWeek: _propTypes2.default.array,
    icon: _propTypes2.default.bool,
    min: _propTypes2.default.object,
    max: _propTypes2.default.object,
    options: _propTypes2.default.bool,
    tab: _propTypes2.default.number,
    isOpen: _propTypes2.default.bool,
    onSave: _propTypes2.default.func,
    onClose: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    value: _propTypes2.default.object,
    defaultValue: _propTypes2.default.object,
    defaultTime: _propTypes2.default.string,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    inputClassName: _propTypes2.default.string,
    inputStyle: _propTypes2.default.object,
    enableInputClick: _propTypes2.default.bool,
    iconType: _propTypes2.default.string
};

exports.default = MomentInput;