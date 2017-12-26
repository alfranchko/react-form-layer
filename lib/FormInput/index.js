import _Object$getOwnPropertyDescriptor from 'babel-runtime/core-js/object/get-own-property-descriptor';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _typeof from 'babel-runtime/helpers/typeof';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _CProjectsReactFormLayerNode_modulesBabelPresetReactHmreNode_modulesRedboxReactLibIndexJs from 'C:\\Projects\\react-form-layer\\node_modules\\babel-preset-react-hmre\\node_modules\\redbox-react\\lib\\index.js';
import _CProjectsReactFormLayerNode_modulesReactTransformCatchErrorsLibIndexJs from 'C:\\Projects\\react-form-layer\\node_modules\\react-transform-catch-errors\\lib\\index.js';
import _react from 'react';
import _CProjectsReactFormLayerNode_modulesReactTransformHmrLibIndexJs from 'C:\\Projects\\react-form-layer\\node_modules\\react-transform-hmr\\lib\\index.js';

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

var _components = {
    FormInput: {
        displayName: 'FormInput',
        isInFunction: true
    }
};

var _CProjectsReactFormLayerNode_modulesReactTransformHmrLibIndexJs2 = _CProjectsReactFormLayerNode_modulesReactTransformHmrLibIndexJs({
    filename: 'C:/Projects/react-form-layer/src/FormInput/index.js',
    components: _components,
    locals: [module],
    imports: [_react]
});

var _CProjectsReactFormLayerNode_modulesReactTransformCatchErrorsLibIndexJs2 = _CProjectsReactFormLayerNode_modulesReactTransformCatchErrorsLibIndexJs({
    filename: 'C:/Projects/react-form-layer/src/FormInput/index.js',
    components: _components,
    locals: [],
    imports: [_react, _CProjectsReactFormLayerNode_modulesBabelPresetReactHmreNode_modulesRedboxReactLibIndexJs]
});

function _wrapComponent(id) {
    return function (Component) {
        return _CProjectsReactFormLayerNode_modulesReactTransformHmrLibIndexJs2(_CProjectsReactFormLayerNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
    };
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

/*
 * formInput - самодостаточный HOC компонент, который может обварачивать BaseInput, Radio, Checkbox и др
 * Все значения берутся из state, все что зависит от пропсов при изменении обновляют state в componentWillReceiveProps
 *
 * В данный момент formInput может использоваться в полном "ручном режиме" когда мы передаем value error и onChange от родителя
 * Но предпочтительный вариант использования совместно с компонентом <Form />
 * */

export function extractValue(value) {
    return value instanceof Object && !(value instanceof Array) ? value.value : value;
}

export function formInput() {
    var initialOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultName = initialOptions.defaultName,
        defaultValue = initialOptions.defaultValue,
        defaultVerification = initialOptions.defaultVerification;


    return function (Input) {
        var _desc, _value, _class, _class2, _temp;

        var initialDefValue = defaultValue;

        var FormInput = _wrapComponent('FormInput')((_class = (_temp = _class2 = function (_Component) {
            _inherits(FormInput, _Component);

            function FormInput(props, context) {
                _classCallCheck(this, FormInput);

                var _this = _possibleConstructorReturn(this, (FormInput.__proto__ || _Object$getPrototypeOf(FormInput)).call(this));

                _this.state = {
                    value: props.value || props.defaultValue,
                    defaultValue: props.defaultValue,
                    error: props.error || '',
                    focus: !!props.focus,
                    hasChanged: _this._checkHasChanged(props.value, props.defaultValue)
                };

                if (context.registerInput) context.registerInput(_this, props);
                return _this;
            }

            _createClass(FormInput, [{
                key: 'componentDidMount',
                value: function componentDidMount() {
                    if (this.props.focus) this.focus();
                }
            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    if (this.context.unregisterInput) this.context.unregisterInput(this.props.name);
                }
            }, {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(next) {
                    var defaultValue = next.defaultValue,
                        value = next.value,
                        error = next.error;


                    if (this._checkHasChanged(defaultValue, this.props.defaultValue) || this._checkHasChanged(value, this.props.value)) {
                        var hasChanged = this._checkHasChanged(value, defaultValue);
                        var state = {
                            value: value,
                            defaultValue: defaultValue,
                            hasChanged: hasChanged
                        };

                        this.setState(state);

                        // Этот кейс необходим для "контролируемых инпутов" (когда value или defaultValue приходят меняются сверху)
                        // Вызов _callAllHandlers здесь позволяет синхронизировать инпуты с Form или другими компонентами
                        this._callAllHandlers(state);
                    }

                    if (error !== this.props.error) {
                        this.setState({ error: error });
                    }
                }

                /**
                 * @private
                 * @param {object} update - ключи и значения для записи в state например {value: '123'}
                 * @return {Object} возвращает полный state смерженный с обновленными ключами
                 * */
                /* eslint no-restricted-syntax: off */

            }, {
                key: '_completeState',
                value: function _completeState() {
                    var update = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                    var state = {};

                    for (var key in this.state) {
                        if (update[key] === undefined) {
                            state[key] = this.state[key];
                        } else {
                            state[key] = update[key];
                        }
                    }

                    return state;
                }

                /**
                 * @private
                 * @return {Object} {hasMitake: Boolean, mes: String}
                 * */

            }, {
                key: '_callVerification',
                value: function _callVerification() {
                    return this.props.verification(this.state, this.props);
                }

                /**
                 * @private
                 * @param {(string|number|object|array, undefined)} value
                 * @param {(string|number|object|array)} defValue
                 * @return {Boolean}
                 * */

            }, {
                key: '_checkHasChanged',
                value: function _checkHasChanged(value, defValue) {
                    var extractedValue = this._extractActualValue(value);

                    // При сравнивании с неизвестным значением считается что нет изменения
                    if (extractedValue === undefined) return false;

                    // Для значений типа Array
                    if (extractedValue instanceof Array) {
                        return this._isArrayValuesChanged(value, defValue);
                    }

                    // Для простых значений и значений {value: ...}
                    return extractedValue !== this._extractActualValue(defValue);
                }

                /**
                 * @private
                 * @param {array} value
                 * @param {array, undefined} defValue
                 * @return {Boolean}
                 * */

            }, {
                key: '_isArrayValuesChanged',
                value: function _isArrayValuesChanged(value) {
                    var defValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

                    // Если длинна не совпадает это не одинаковые значения
                    if (value.length !== defValue.length) return true;

                    var isEqual = false;

                    for (var i = 0; i < value.length; i += 1) {
                        var val1 = this._extractActualValue(value[i]);
                        var val2 = this._extractActualValue(defValue[i]);

                        if (val1 !== val2 || (typeof val1 === 'undefined' ? 'undefined' : _typeof(val1)) !== (typeof val2 === 'undefined' ? 'undefined' : _typeof(val2))) {
                            isEqual = true;
                            break;
                        }
                    }

                    return isEqual;
                }

                /**
                 * @private
                 * @param {(string|number|object)} value
                 * @return {string|number|object}
                 * */

            }, {
                key: '_extractActualValue',
                value: function _extractActualValue(value) {
                    // Если приходит value как объект необходимо вытащить истинное value
                    // Функция выносенна отдельно так как в других частях приложения она тоже используется
                    return extractValue(value);
                }

                /**
                 * Мержет state с обновленными ключами и дергает только родительский хэндлер props.onChange
                 * @private
                 * @param {object} toUpdate - ключи и значения для записи в state например {value: '123'}
                 * @return {object} возвращает обновленный state
                 * */

            }, {
                key: '_callOnlyParentHandler',
                value: function _callOnlyParentHandler(toUpdate) {
                    var state = this._completeState(toUpdate);

                    if (this.props.onChange) this.props.onChange(state);

                    return state;
                }

                /**
                 * Мержет state с обновленными ключами и дергает и родительский и из контеста onChange
                 * @private
                 * @param {object} toUpdate - ключи и значения для записи в state например {value: '123'}
                 * @return {object} возвращает обновленный state
                 * */

            }, {
                key: '_callAllHandlers',
                value: function _callAllHandlers(toUpdate) {
                    var state = this._completeState(toUpdate);

                    if (this.props.onChange) this.props.onChange(state);
                    if (this.context.onChange) this.context.onChange(state, this.props.name);

                    return state;
                }

                /**
                 * Хэндлер в input на фокус
                 * @private
                 * */

            }, {
                key: '_onFocus',
                value: function _onFocus(e) {
                    this.setState({ focus: true });

                    if (this.props.onFocus) this.props.onFocus(e);
                }

                /**
                 * Хэндлер в input на блюр. Вызывает верификацию! Если есть ошибка обновляет state и все хандлеры
                 * @private
                 * */

            }, {
                key: '_onBlur',
                value: function _onBlur(e) {
                    // Пока блюр проверят ошибки только в base, возможно вообще нужно отключить это!
                    // Поговорил с Женей - решили пока отключить это
                    /* const error = this._callVerification()
                       if (targetType === 'base' && error.mes !== this.state.error) {
                     // Важно! Так как маска зараза скидывает пустую маску в пустую строку важно взять именно оттуда
                     const value = e.target.value || ''
                     const toUpdate = {error: error.mes, focus: false, value}
                       this.setState(toUpdate)
                       this._callAllHandlers(toUpdate)
                     } else {
                     this.setState({focus: false})
                     }*/

                    this.setState({ focus: false });

                    if (this.props.onBlur) this.props.onBlur(e);
                }

                /**
                 * Хэндлер в input на onChange. Блокирует ввод данных если не удолетворяет regexp
                 * @param {any} value - любое значение подымающеся из обвернутого инпута
                 * @param {String} error - ошибка - возможность устанавливать ошибки через onChange
                 * @private
                 * */

            }, {
                key: '_onChange',
                value: function _onChange(value) {
                    var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

                    if (this.props.disabled || this.props.readOnly) return;

                    // Проверяем допустимые символы
                    // Проверка на regexp данных живет теперь только в BaseInput
                    // deprecated
                    //if (this.props.regexp && this.props.regexp.test(value)) return

                    var toUpdate = {
                        value: value,
                        error: error,
                        hasChanged: this._checkHasChanged(value, this.props.defaultValue)
                    };

                    this.setState(toUpdate);

                    this._callAllHandlers(toUpdate);
                }

                /**
                 * Хэндлер в input на mouseDown
                 * @private
                 * */

            }, {
                key: '_onMouseDown',
                value: function _onMouseDown(e) {
                    if (this.props.onMouseDown) this.props.onMouseDown(e);
                }

                /**
                 * Хэндлер в input на keyDown
                 * @private
                 * */

            }, {
                key: '_onKeyDown',
                value: function _onKeyDown(e) {
                    if (this.props.disabled || this.props.readOnly) return;

                    if (e.keyCode === 13 && this.props.onEnter) this.props.onEnter(e);
                }

                /**
                 * Запись ссылки на input
                 * @private
                 * */

            }, {
                key: '_saveRefToNodeWillFocus',
                value: function _saveRefToNodeWillFocus(i) {
                    this.input = i;
                }

                /**
                 * @public
                 * */

            }, {
                key: 'focus',
                value: function focus() {
                    if (this.input) this.input.focus();
                }

                /**
                 * Публичный метод для установки любых значений в state инпута c вызовом родительского хэндлера
                 * например this.input.setValue({value: 123, error: 'someError'})
                 * @public
                 * @param {object} needUpdate - ключи и значения которые нужно обновить
                 * @return {object} возвращает полный обновленный state
                 * */

            }, {
                key: 'setValue',
                value: function setValue(needUpdate) {
                    var _needUpdate$value = needUpdate.value,
                        value = _needUpdate$value === undefined ? this.state.value : _needUpdate$value,
                        _needUpdate$defaultVa = needUpdate.defaultValue,
                        defaultValue = _needUpdate$defaultVa === undefined ? this.state.defaultValue : _needUpdate$defaultVa,
                        _needUpdate$error = needUpdate.error,
                        error = _needUpdate$error === undefined ? '' : _needUpdate$error,
                        other = _objectWithoutProperties(needUpdate, ['value', 'defaultValue', 'error']);

                    var hasChanged = this._checkHasChanged(value, defaultValue);

                    var toUpdate = _extends({ value: value, defaultValue: defaultValue, hasChanged: hasChanged, error: error }, other);

                    this.setState(toUpdate);

                    return this._callOnlyParentHandler(toUpdate);
                }

                /**
                 * this.input.resetValue()
                 * Публичный метод для сброса значения value в state на дефолтный defaultValue
                 * Обнуляет error, hasChanged
                 * @public
                 * @return {object} возвращает полный обновленный state
                 * */

            }, {
                key: 'resetValue',
                value: function resetValue() {
                    var toUpdate = {
                        error: '',
                        value: this.props.defaultValue,
                        hasChanged: false
                    };

                    this.setState(toUpdate);

                    return this._callOnlyParentHandler(toUpdate);
                }

                /**
                 * this.input.dropValue()
                 * Публичный метод для сброса значения value в state на initialDefValue (обнуление значения)
                 * Обнуляет error, hasChanged
                 * @public
                 * @return {object} возвращает полный обновленный state
                 * */

            }, {
                key: 'dropValue',
                value: function dropValue() {
                    var toUpdate = {
                        error: '',
                        value: initialDefValue,
                        hasChanged: this._checkHasChanged(initialDefValue, this.state.defaultValue)
                    };

                    this.setState(toUpdate);

                    return this._callOnlyParentHandler(toUpdate);
                }

                /**
                 * this.input.verify()
                 * Публичный метод для вызова верификации. Если есть ошибка обноляет state и вызывает родительский OnChange
                 * @public
                 * @return {object} возвращает полный обновленный state
                 * */

            }, {
                key: 'verify',
                value: function verify() {
                    var error = this._callVerification();

                    if (error.hasMistake) {
                        var toUpdate = { error: error.mes };

                        this.setState(toUpdate);

                        return this._callOnlyParentHandler(toUpdate);
                    }

                    return this.state;
                }
            }, {
                key: '_completeProps',
                value: function _completeProps() {
                    var _state = this.state,
                        value = _state.value,
                        error = _state.error,
                        focus = _state.focus;

                    var other = this.props;

                    return _extends({}, other, {
                        onChange: this._onChange,
                        onKeyDown: this._onKeyDown,
                        onBlur: this._onBlur,
                        onFocus: this._onFocus,
                        onMouseDown: this._onMouseDown,
                        saveRefToNodeWillFocus: this._saveRefToNodeWillFocus,
                        value: value,
                        error: error,
                        focus: focus
                    });
                }
            }, {
                key: 'render',
                value: function render() {
                    var props = this._completeProps();

                    return React.createElement(Input, props);
                }
            }]);

            return FormInput;
        }(Component), _class2.contextTypes = {
            onChange: PropTypes.func,
            registerInput: PropTypes.func,
            unregisterInput: PropTypes.func
        }, _class2.propTypes = {
            // main
            disabled: PropTypes.bool, // Блочит любые действия и меняет стили как явно недоступный инпут
            error: PropTypes.string,
            focus: PropTypes.bool, // переданное значение фокусирует инпут при маунте
            name: PropTypes.string.isRequired,
            readOnly: PropTypes.bool, // Инпут который нельзя редактировать но выглядит как обычный
            value: PropTypes.any,
            defaultValue: PropTypes.any,

            // onHandlers
            onChange: PropTypes.func,
            onMouseDown: PropTypes.func,
            onBlur: PropTypes.func,
            onFocus: PropTypes.func,
            onEnter: PropTypes.func,

            // Verify
            verification: PropTypes.func.isRequired, // функция проверки введенного значения на onBlur
            regexp: PropTypes.object, // блокирует ввод недопустимых символов в onChange
            required: PropTypes.bool
        }, _class2.defaultProps = {
            value: undefined,
            error: '',
            name: defaultName,
            verification: defaultVerification,
            defaultValue: defaultValue
        }, _temp), (_applyDecoratedDescriptor(_class.prototype, '_onFocus', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, '_onFocus'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onBlur', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, '_onBlur'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onChange', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, '_onChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onMouseDown', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, '_onMouseDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onKeyDown', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, '_onKeyDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_saveRefToNodeWillFocus', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, '_saveRefToNodeWillFocus'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'focus', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'focus'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setValue', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'setValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'resetValue', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'resetValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'dropValue', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'dropValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'verify', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'verify'), _class.prototype)), _class));

        return FormInput;
    };
}

export default formInput;