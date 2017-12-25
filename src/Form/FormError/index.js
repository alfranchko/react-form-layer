import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class FormError extends Component {

    static propTypes = {
        className: PropTypes.string,
        // Интересный прием передавать функцию как children чтобы переопределить render. Так же мы делаем в AsyncBundle
        children: PropTypes.func
    }

    static contextTypes = {
        formData: PropTypes.object.isRequired
    }

    renderFirstError(errors) {
        let first

        for (first in errors) break

        return errors[first]
    }

    render() {
        const {className, children} = this.props
        const {errors, hasMistake} = this.context.formData
        const _classname = classnames('form--globalError', className)

        return hasMistake ?
            <div className={_classname}>
                {children ? children(errors, hasMistake) : this.renderFirstError(errors)}
            </div>
            : null
    }

}

export default FormError