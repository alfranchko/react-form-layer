import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import autobind from 'autobind-decorator'
import {formInput} from '../../../../src'
import {defVerification} from '../verifications'
import './style.scss'


class TextInput extends Component {

    static propTypes = {
        className: PropTypes.string,
        error: PropTypes.string,
        focus: PropTypes.bool,
        name: PropTypes.string.isRequired,
        placeHolder: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onChange: PropTypes.func,
        onMouseDown: PropTypes.func,
        onKeyDown: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        readOnly: PropTypes.bool
    }

    static defaultProps = {
        name: 'textInput',
        value: '',
        error: ''
    }

    @autobind
    onChange(e) {
        const {value} = e.target

        if (this.props.readOnly) return

        this.props.onChange(value)
    }

    renderInput() {
        const {value, onMouseDown, onKeyDown, onBlur, onFocus} = this.props

        const props = {
            className: 'inputDef--input',
            value: value || value === 0 ? value : '',
            onChange: this.onChange,
            onMouseDown,
            onKeyDown,
            onBlur,
            onFocus
        }

        return <input {...props} />
    }

    render() {
        const {value, error, focus, placeHolder, className} = this.props

        const _className = classnames('inputDef', className, {
            inputDef__focus: focus,
            inputDef__error: error,
        })

        const placeHolderClass = classnames('inputDef--placeholder', {
            'inputDef--placeholder__up': focus || value
        })

        return (
            <div className={_className}>
                {placeHolder ?
                    <div className={placeHolderClass}>
                        <span className="inputDef--placeholderText">{placeHolder}</span>
                    </div> : null}
                {
                    this.renderInput()
                }
                {error ? <span className="inputDef--errorText">{error}</span> : null}
            </div>
        )
    }

}


const initialOptions = {
    defaultName: 'textInput',
    defaultValue: '',
    defaultVerification: defVerification
}

export default formInput(initialOptions)(TextInput)
export {TextInput}