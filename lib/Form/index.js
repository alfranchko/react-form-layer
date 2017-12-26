import _Object$getOwnPropertyDescriptor from 'babel-runtime/core-js/object/get-own-property-descriptor';
import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _CProjectsReactFormLayerNode_modulesBabelPresetReactHmreNode_modulesRedboxReactLibIndexJs from 'C:\\Projects\\react-form-layer\\node_modules\\babel-preset-react-hmre\\node_modules\\redbox-react\\lib\\index.js';
import _CProjectsReactFormLayerNode_modulesReactTransformCatchErrorsLibIndexJs from 'C:\\Projects\\react-form-layer\\node_modules\\react-transform-catch-errors\\lib\\index.js';
import _react from 'react';
import _CProjectsReactFormLayerNode_modulesReactTransformHmrLibIndexJs from 'C:\\Projects\\react-form-layer\\node_modules\\react-transform-hmr\\lib\\index.js';

var _desc, _value, _class, _class2, _temp2;

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
    Form: {
        displayName: 'Form'
    }
};

var _CProjectsReactFormLayerNode_modulesReactTransformHmrLibIndexJs2 = _CProjectsReactFormLayerNode_modulesReactTransformHmrLibIndexJs({
    filename: 'C:/Projects/react-form-layer/src/Form/index.js',
    components: _components,
    locals: [module],
    imports: [_react]
});

var _CProjectsReactFormLayerNode_modulesReactTransformCatchErrorsLibIndexJs2 = _CProjectsReactFormLayerNode_modulesReactTransformCatchErrorsLibIndexJs({
    filename: 'C:/Projects/react-form-layer/src/Form/index.js',
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
import FormError from './FormError';

var Form = _wrapComponent('Form')((_class = (_temp2 = _class2 = function (_Component) {
    _inherits(Form, _Component);

    function Form() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Form);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || _Object$getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _this._inputs = {}, _this.state = {
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


            return React.createElement(
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
}(Component), _class2.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    // событие которое срабатывает только по нажатию по кнопке action=submit
    onSubmit: PropTypes.func,
    // событие которое срабатывает только по нажатию по кнопке action=reset
    onReset: PropTypes.func,
    // если передать хандлер onChange в форму, все инпуты начнут вещать в форму о своем изменении
    // и форма будет передавать на верх карту всех значений инпутов при любом изменении
    onChange: PropTypes.func
}, _class2.childContextTypes = {
    onChange: PropTypes.func,
    registerInput: PropTypes.func.isRequired,
    unregisterInput: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired
}, _temp2), (_applyDecoratedDescriptor(_class.prototype, 'registerInput', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'registerInput'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'unregisterInput', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'unregisterInput'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onChange', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'onChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getValues', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'getValues'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setValues', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'setValues'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'resetValues', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'resetValues'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'dropValues', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'dropValues'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'validate', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, 'validate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onSubmit', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, '_onSubmit'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onReset', [autobind], _Object$getOwnPropertyDescriptor(_class.prototype, '_onReset'), _class.prototype)), _class));

export { FormError };
export default Form;