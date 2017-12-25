import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'

export class Button extends Component {

    static propTypes = {
        type: PropTypes.oneOf(['button', 'reset', 'submit']),
        text: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func
    }

    static defaultProps = {
        type: 'button',
        text: undefined,
        className: undefined,
        onClick: undefined
    }

    onClickHandler = (e) => {
        if (this.props.onClick) this.props.onClick(e)
    }

    render() {
        const {type, className, text} = this.props

        const clName = classnames('button', className)

        return (
            <button onClick={this.onClickHandler} className={clName} type={type} tabIndex={0}>
                {text}
            </button>
        )
    }
}

export default Button