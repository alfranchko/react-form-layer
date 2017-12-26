import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import autobind from 'autobind-decorator'
import {formInput} from '../../../../src'
import {defVerification} from '../verifications'
import './style.scss'


class CheckboxInput extends Component {

    static propTypes = {
        className: PropTypes.string,
        error: PropTypes.string,
        focus: PropTypes.bool, // переданное значение фокусирует инпут при маунте
        name: PropTypes.string.isRequired,
        placeHolder: PropTypes.string, // значение в пустом инпуте и над инпутом
        value: PropTypes.bool.isRequired,
        label: PropTypes.string,
        onChange: PropTypes.func.isRequired, // обворачивается в formInput
        onMouseDown: PropTypes.func, // обворачивается в formInput
        onBlur: PropTypes.func, // обворачивается в formInput
        onFocus: PropTypes.func, // обворачивается в formInput
    }

    static defaultProps = {
        value: false,
        label: '',
        error: '',
        name: 'radio',
    }

    @autobind
    onChange(e) {
        this.props.onChange(e.target.checked)
    }

    renderInput() {
        const {value, label, name, onBlur, onFocus, onMouseDown} = this.props


        return (
            <div className="checkboxInput--inputWrap" onMouseDown={onMouseDown}>
                <div className="checkboxInput--icon">
                   {/* {label}*/}
                </div>
                <div className="checkboxInput--label">{label}</div>
                <input
                    className="checkboxInput--input"
                    type="checkbox"
                    name={name}
                    checked={value}
                    onBlur={onBlur}
                    onChange={this.onChange}
                    onFocus={onFocus}
                />
            </div>
        )
    }

    render() {
        const {value, className, placeHolder, focus, error} = this.props

        const _classNameMain = classnames('checkboxInput', className, {
            checkboxInput__checked: value,
            checkboxInput__focus: focus,
            checkboxInput__hasPlaceHolder: placeHolder,
            checkboxInput__error: error
        })

        return (
            <div className={_classNameMain}>
                {placeHolder ?
                    <div className="checkboxInput--placeholder">
                        <span className="checkboxInput--placeholderText">{placeHolder}</span>
                    </div> : null}
                {
                    this.renderInput()
                }
                {error ? <span className="checkboxInput--errorText">{error}</span> : null}
            </div>
        )
    }
}

const initialOptions = {
    defaultName: 'chekbox',
    defaultValue: false,
    defaultVerification: defVerification
}

export default formInput(initialOptions)(CheckboxInput)
export {CheckboxInput}