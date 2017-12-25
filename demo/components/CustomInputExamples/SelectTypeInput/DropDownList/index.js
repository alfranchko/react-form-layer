import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import utils from '../../../../utils'
import './style.scss'


class DropDownList extends Component {

    static propTypes = {
        active: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired,
        source: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.string.isRequired
        })).isRequired
    }

    state = {
        selected: undefined
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.source !== this.props.source) {
            this.setState({selected: undefined})
        }
    }

    componentWillUpdate(nextProps) {
        if (!this.props.active && nextProps.active) {
            utils.addEventsToDocument({keydown: this.handleKeyDown})
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.active && !this.props.active) {
            utils.removeEventsFromDocument({keydown: this.handleKeyDown})
        }
    }

    componentWillUnmount() {
        if (this.props.active) {
            utils.removeEventsFromDocument({keydown: this.handleKeyDown})
        }
    }

    handleKeyDown = (e) => {
        const {keyCode} = e
        const {selected} = this.state
        const srcLength = this.props.source.length


        if (keyCode === 40) { // вниз
            const num = selected !== undefined ? selected + 1 : 0

            this.setState({
                selected: num < srcLength ? num : 0
            })
        }

        if (keyCode === 38) { // вверх
            const num = selected !== undefined ? selected - 1 : srcLength - 1

            this.setState({
                selected: num !== -1 ? num : srcLength - 1
            })
        }

        if (keyCode === 13) {
            const {source} = this.props

            if (selected !== undefined && source.length) {
                this.props.onChange(source[selected])
            }

            // Блочим иначе enter срабатывает в textarea
            utils.pauseEvent(e)
        }
    }

    setSelectValueHandler = (itemObj) => () => {
        this.props.onChange(itemObj)
    }

    renderValues() {
        const {source} = this.props

        return source.map((item, i) => {
            const {value, label} = item

            const selected = this.state.selected === i

            const _classname = classnames('dropDown--value', {
                'dropDown--value__selected': selected
            })

            return (
                <li
                    key={value}
                    className={_classname}
                    onMouseDown={this.setSelectValueHandler(item)}
                >
                    {label}
                </li>
            )
        })
    }

    render() {
        const {active} = this.props

        return (
            <div className="dropDown">
                <ul className={'dropDown--values' + (active ? ' dropDown--values__active' : '')}>
                    {this.renderValues()}
                </ul>
            </div>
        )
    }

}

export default DropDownList