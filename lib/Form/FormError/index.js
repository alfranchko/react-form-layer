'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormError = (_temp = _class = function (_Component) {
    _inherits(FormError, _Component);

    function FormError() {
        _classCallCheck(this, FormError);

        return _possibleConstructorReturn(this, (FormError.__proto__ || Object.getPrototypeOf(FormError)).apply(this, arguments));
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

            var _classname = (0, _classnames2.default)('form--globalError', className);

            return hasMistake ? _react2.default.createElement(
                'div',
                { className: _classname },
                children ? children(errors, hasMistake) : this.renderFirstError(errors)
            ) : null;
        }
    }]);

    return FormError;
}(_react.Component), _class.propTypes = {
    className: _propTypes2.default.string,
    // Интересный прием передавать функцию как children чтобы переопределить render. Так же мы делаем в AsyncBundle
    children: _propTypes2.default.func
}, _class.contextTypes = {
    formData: _propTypes2.default.object.isRequired
}, _temp);
exports.default = FormError;