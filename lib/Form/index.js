'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var Form = (_class = (_temp2 = _class2 = function (_Component) {
    _inherits(Form, _Component);

    function Form() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Form);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _this._inputs = {}, _this.state = {
            values: {},
            errors: {},
            hasChanged: false,
            hasMistake: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Form, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var onChange = this.onChange,
                registerInput = this.registerInput,
                unregisterInput = this.unregisterInput;


            return {
                onChange: onChange,
                registerInput: registerInput,
                unregisterInput: unregisterInput,
                formData: this.state
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._initialOnChange();

            this._isMounted = true;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._isMounted = false;
        }

        /**
         * Метод, который инпуты ловят через контекст и если он есть то инпуты записывают ссылки на себя в форму
         * @public
         * @param {Object} inputInstanse - ссылка на экземляр инпута
         * @param {Object} inputProps - пропсы инпута отдельно так как в момент инициализации они не в экземпляре
         * */

    }, {
        key: 'registerInput',
        value: function registerInput(inputInstanse, inputProps) {
            var name = inputProps.name;


            this._inputs[name] = inputInstanse;

            if (this._isMounted) {
                this._updateForm(this._inputs);
            }
        }

        /**
         * В момент размонтирования инпуты стирают о себе запись
         * @public
         * @param {String} inputName - ссылка на экземляр инпута
         * */

    }, {
        key: 'unregisterInput',
        value: function unregisterInput(inputName) {
            delete this._inputs[inputName];

            if (this._isMounted) {
                this._updateForm(this._inputs);
            }
        }

        /**
         * Хандлер который срабатывает при изменении любого инпута
         * Ловится инпутом через контекст
         * @public
         * @param {Object} inputState - value, error, focus and hasChanged
         * @param {String} name - props.name из инпута
         * */

    }, {
        key: 'onChange',
        value: function onChange(inputState, name) {
            var lastChanged = { state: inputState, name: name };

            this._updateForm(this._inputs, lastChanged);
        }

        /**
         * Возвращает state (=formData)
         * @public
         * @return {Object} values, errors, hasMistake, hasChanged
         * */

    }, {
        key: 'getValues',
        value: function getValues() {
            return this.state;
        }

        /**
         * Устанавливает в state инпутов переданные значения
         * Использует публичный метод инпута setValue
         * @public
         * @return {Object} values, errors, hasMistake, hasChanged
         * */

    }, {
        key: 'setValues',
        value: function setValues() {
            var inputsNeedUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var updateWorkerFunc = function updateWorkerFunc(input, name) {
                return input.setValue(inputsNeedUpdate[name]);
            };
            var updatedInputs = this._updateInputs(inputsNeedUpdate, updateWorkerFunc);

            return this._updateForm(updatedInputs);
        }

        /**
         * Сбрасывает значения всех инпутов в текущие deafultValue
         * Использует публичный метод инпута resetValue
         * @public
         * @return {Object} values, errors, hasMistake, hasChanged
         * */

    }, {
        key: 'resetValues',
        value: function resetValues() {
            var updateWorkerFunc = function updateWorkerFunc(input) {
                return input.resetValue();
            };
            var updatedInputs = this._updateInputs(this._inputs, updateWorkerFunc);

            return this._updateForm(updatedInputs);
        }

        /**
         * Сбрасывает значения всех инпутов в нулину initialValue
         * Использует публичный метод инпута dropValue
         * @public
         * @return {Object} values, errors, hasMistake, hasChanged
         * */

    }, {
        key: 'dropValues',
        value: function dropValues() {
            var updateWorkerFunc = function updateWorkerFunc(input) {
                return input.dropValue();
            };
            var updatedInputs = this._updateInputs(this._inputs, updateWorkerFunc);

            return this._updateForm(updatedInputs);
        }

        /**
         * Запускает валидацию всех инпутов принудительно
         * Использует публичный метод инпута verify
         * @public
         * @return {Object} values, errors, hasMistake, hasChanged
         * */

    }, {
        key: 'validate',
        value: function validate() {
            var updateWorkerFunc = function updateWorkerFunc(input) {
                return input.verify();
            };
            var updatedInputs = this._updateInputs(this._inputs, updateWorkerFunc);

            return this._updateForm(updatedInputs);
        }

        /**
         * Хэндлер события onSubmit, инициализируется только кнопкой submit
         * @private
         * */

    }, {
        key: '_onSubmit',
        value: function _onSubmit(e) {
            e.preventDefault();
            var formData = this.validate();

            if (formData.hasMistake) return;

            if (this.props.onSubmit) this.props.onSubmit(formData);
        }

        /**
         * Хэндлер события onReset, инициализируется только кнопкой reset
         * @private
         * */

    }, {
        key: '_onReset',
        value: function _onReset(e) {
            e.preventDefault();
            var formData = this.resetValues();

            if (this.props.onReset) this.props.onReset(formData);
        }

        /**
         * Первоначальная запись в state после регистрации всех инпутов
         * @private
         * */

    }, {
        key: '_initialOnChange',
        value: function _initialOnChange() {
            this._updateForm(this._inputs);
        }

        /**
         * Переиспользуемый метод для обновления формы и вызова хандлера
         * @private
         * @return {Object} values, errors, hasMistake, hasChanged
         * */

    }, {
        key: '_updateForm',
        value: function _updateForm(inputs, lastChanged) {
            var formData = this._createFormData(inputs, lastChanged);

            this.setState(_extends({}, formData));

            if (this.props.onChange) this.props.onChange(formData);

            return formData;
        }

        /**
         * Переиспользуемый метод для вызова публичного метода инпута
         * @private
         * @param {Object} inputsNeedUpdate {field:..., field2:....}
         * @param {Function} updateWorkerFunc (input) => input.resetValue()
         * @return {Object} {field:..., field2:....}
         * */

    }, {
        key: '_updateInputs',
        value: function _updateInputs(inputsNeedUpdate, updateWorkerFunc) {
            var updatedInputs = {};

            for (var name in inputsNeedUpdate) {
                var input = this._inputs[name];
                var state = updateWorkerFunc(input, name);

                updatedInputs[name] = { state: state };
            }

            return updatedInputs;
        }

        /**
         * Переиспользуемый создания formData values, errors, hasMistake, hasChanged
         * @private
         * @param {Object} inputs {field:..., field2:....}
         * @param {Object} lastChanged {state: ..., name: ...}
         * @return {Object} formData values, errors, hasMistake, hasChanged
         * */

    }, {
        key: '_createFormData',
        value: function _createFormData(inputs, lastChanged) {
            var values = {};
            var errors = {};
            var hasChanged = false;
            var hasMistake = false;

            for (var name in inputs) {
                var inputState = lastChanged && lastChanged.name === name ? lastChanged.state : inputs[name].state;

                var field = {
                    name: name,
                    value: inputState.value,
                    error: inputState.error,
                    hasChanged: inputState.hasChanged
                };
                values[name] = field;

                if (field.hasChanged) hasChanged = true;

                if (field.error) {
                    errors[name] = field.error;
                    hasMistake = true;
                }
            }

            return { values: values, errors: errors, hasChanged: hasChanged, hasMistake: hasMistake };
        }
    }, {
        key: 'render',
        value: function render() {
            var className = this.props.className;


            return _react2.default.createElement(
                'form',
                {
                    className: className,
                    onSubmit: this._onSubmit,
                    onReset: this._onReset
                },
                this.props.children
            );
        }
    }]);

    return Form;
}(_react.Component), _class2.propTypes = {
    className: _propTypes2.default.string,
    children: _propTypes2.default.node,
    // событие которое срабатывает только по нажатию по кнопке action=submit
    onSubmit: _propTypes2.default.func,
    // событие которое срабатывает только по нажатию по кнопке action=reset
    onReset: _propTypes2.default.func,
    // если передать хандлер onChange в форму, все инпуты начнут вещать в форму о своем изменении
    // и форма будет передавать на верх карту всех значений инпутов при любом изменении
    onChange: _propTypes2.default.func
}, _class2.childContextTypes = {
    onChange: _propTypes2.default.func,
    registerInput: _propTypes2.default.func.isRequired,
    unregisterInput: _propTypes2.default.func.isRequired,
    formData: _propTypes2.default.object.isRequired
}, _temp2), (_applyDecoratedDescriptor(_class.prototype, 'registerInput', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'registerInput'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'unregisterInput', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'unregisterInput'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onChange', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'onChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getValues', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'getValues'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setValues', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'setValues'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'resetValues', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'resetValues'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'dropValues', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'dropValues'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'validate', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'validate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onSubmit', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onSubmit'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onReset', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onReset'), _class.prototype)), _class);
exports.default = Form;