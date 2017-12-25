import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {TextInput} from '../TextInput'
import formInput from '../../../../src/FormInput'
import DropDownList from './DropDownList'
import utils from '../../../utils'
import {selectTypeVerification} from '../verifications'
import './style.scss'


const defaultValue = {value: null, label: ''}

class SelectTypeInput extends Component {

    static propTypes = {
        className: PropTypes.string,
        placeHolder: PropTypes.string,
        value: PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.string.isRequired
        }),
        name: PropTypes.string,
        error: PropTypes.string,
        source: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.string.isRequired
        })).isRequired,
        onChange: PropTypes.func.isRequired,
        onFocus: PropTypes.func.isRequired,
        onBlur: PropTypes.func.isRequired
    }

    static defaultProps = {
        bddmark: 'инпут со списком',
        value: defaultValue,
        disabled: false,
        whatShowForNull: 'label'
    }

    state = {
        active: false
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.active && !this.state.active) {
            utils.addEventsToDocument({keydown: this.handleKeyDown})
        }
        if (!nextState.active && this.state.active) {
            utils.removeEventsFromDocument({keydown: this.handleKeyDown})
        }
    }

    componentWillUnmount() {
        utils.removeEventsFromDocument({keydown: this.handleKeyDown})
    }

    handleKeyDown = (event) => {
        const {keyCode} = event

        // escape or tab
        if ((keyCode === 27 || keyCode === 9) && this.state.active) {
            this.setState({active: false})
        }

        // down or enter
        if ((keyCode === 40 || keyCode === 13) && !this.state.active) {
            this.setState({active: true})
        }
    }

    onMouseDown = () => {
        this.setState({
            active: !this.state.active
        })
    }

    onFocus = (e) => {
        this.setState({active: true})

        this.props.onFocus(e)
    }

    onBlur = (e) => {
        this.setState({active: false})

        this.props.onBlur(e)
    }

    handleSelect = (item) => {
        this.setState({
            active: false
        })

        if (this.props.onChange) this.props.onChange(item)
    }

    render() {
        const {source, value, className, ...others} = this.props
        const _className = classnames('selectType', className, {
            active: this.state.active
        })

        return (
            <div className={_className}>
                <TextInput
                    {...others}
                    value={value ? value.label : ''}
                    onMouseDown={this.onMouseDown}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    readOnly
                />
                <DropDownList
                    active={this.state.active}
                    source={source}
                    onChange={this.handleSelect}
                />
            </div>
        )
    }
}

const initialOptions = {
    defaultName: 'select',
    defaultVerification: selectTypeVerification,
    defaultValue
}

export default formInput(initialOptions)(SelectTypeInput)
export {SelectTypeInput}