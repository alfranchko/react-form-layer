import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _CProjectsReactFormLayerNode_modulesBabelPresetReactHmreNode_modulesRedboxReactLibIndexJs from 'C:\\Projects\\react-form-layer\\node_modules\\babel-preset-react-hmre\\node_modules\\redbox-react\\lib\\index.js';
import _CProjectsReactFormLayerNode_modulesReactTransformCatchErrorsLibIndexJs from 'C:\\Projects\\react-form-layer\\node_modules\\react-transform-catch-errors\\lib\\index.js';
import _react from 'react';
import _CProjectsReactFormLayerNode_modulesReactTransformHmrLibIndexJs from 'C:\\Projects\\react-form-layer\\node_modules\\react-transform-hmr\\lib\\index.js';

var _class, _temp;

var _components = {
    FormError: {
        displayName: 'FormError'
    }
};

var _CProjectsReactFormLayerNode_modulesReactTransformHmrLibIndexJs2 = _CProjectsReactFormLayerNode_modulesReactTransformHmrLibIndexJs({
    filename: 'C:/Projects/react-form-layer/src/Form/FormError/index.js',
    components: _components,
    locals: [module],
    imports: [_react]
});

var _CProjectsReactFormLayerNode_modulesReactTransformCatchErrorsLibIndexJs2 = _CProjectsReactFormLayerNode_modulesReactTransformCatchErrorsLibIndexJs({
    filename: 'C:/Projects/react-form-layer/src/Form/FormError/index.js',
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
import classnames from 'classnames';

var FormError = _wrapComponent('FormError')((_temp = _class = function (_Component) {
    _inherits(FormError, _Component);

    function FormError() {
        _classCallCheck(this, FormError);

        return _possibleConstructorReturn(this, (FormError.__proto__ || _Object$getPrototypeOf(FormError)).apply(this, arguments));
    }

    _createClass(FormError, [{
        key: 'renderFirstError',
        value: function renderFirstError(errors) {
            var first = void 0;

            for (first in errors) {
                break;
            }return errors[first];
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                children = _props.children;
            var _context$formData = this.context.formData,
                errors = _context$formData.errors,
                hasMistake = _context$formData.hasMistake;

            var _classname = classnames('form--globalError', className);

            return hasMistake ? React.createElement(
                'div',
                { className: _classname },
                children ? children(errors, hasMistake) : this.renderFirstError(errors)
            ) : null;
        }
    }]);

    return FormError;
}(Component), _class.propTypes = {
    className: PropTypes.string,
    // Интересный прием передавать функцию как children чтобы переопределить render. Так же мы делаем в AsyncBundle
    children: PropTypes.func
}, _class.contextTypes = {
    formData: PropTypes.object.isRequired
}, _temp));

export default FormError;