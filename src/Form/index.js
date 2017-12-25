import React, {Component} from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import FormError from './FormError'


class Form extends Component {

    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        // событие которое срабатывает только по нажатию по кнопке action=submit
        onSubmit: PropTypes.func,
        // событие которое срабатывает только по нажатию по кнопке action=reset
        onReset: PropTypes.func,
        // если передать хандлер onChange в форму, все инпуты начнут вещать в форму о своем изменении
        // и форма будет передавать на верх карту всех значений инпутов при любом изменении
        onChange: PropTypes.func,
    }

    static childContextTypes = {
        onChange: PropTypes.func,
        registerInput: PropTypes.func.isRequired,
        unregisterInput: PropTypes.func.isRequired,
        formData: PropTypes.object.isRequired
    }

    _inputs = {}

    state = {
        values: {},
        errors: {},
        hasChanged: false,
        hasMistake: false
    }

    getChildContext() {
        const {onChange, registerInput, unregisterInput} = this

        return {
            onChange,
            registerInput,
            unregisterInput,
            formData: this.state
        }
    }

    componentDidMount() {
        this._initialOnChange()

        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    /**
     * Метод, который инпуты ловят через контекст и если он есть то инпуты записывают ссылки на себя в форму
     * @public
     * @param {Object} inputInstanse - ссылка на экземляр инпута
     * @param {Object} inputProps - пропсы инпута отдельно так как в момент инициализации они не в экземпляре
     * */
    @autobind
    registerInput(inputInstanse, inputProps) {
        const {name} = inputProps

        this._inputs[name] = inputInstanse

        if (this._isMounted) {
            this._updateForm(this._inputs)
        }
    }

    /**
     * В момент размонтирования инпуты стирают о себе запись
     * @public
     * @param {String} inputName - ссылка на экземляр инпута
     * */
    @autobind
    unregisterInput(inputName) {
        delete this._inputs[inputName]

        if (this._isMounted) {
            this._updateForm(this._inputs)
        }
    }

    /**
     * Хандлер который срабатывает при изменении любого инпута
     * Ловится инпутом через контекст
     * @public
     * @param {Object} inputState - value, error, focus and hasChanged
     * @param {String} name - props.name из инпута
     * */
    @autobind
    onChange(inputState, name) {
        const lastChanged = {state: inputState, name}

        this._updateForm(this._inputs, lastChanged)
    }

    /**
     * Возвращает state (=formData)
     * @public
     * @return {Object} values, errors, hasMistake, hasChanged
     * */
    @autobind
    getValues() {
        return this.state
    }

    /**
     * Устанавливает в state инпутов переданные значения
     * Использует публичный метод инпута setValue
     * @public
     * @return {Object} values, errors, hasMistake, hasChanged
     * */
    @autobind
    setValues(inputsNeedUpdate = {}) {
        const updateWorkerFunc = (input, name) => input.setValue(inputsNeedUpdate[name])
        const updatedInputs = this._updateInputs(inputsNeedUpdate, updateWorkerFunc)

        return this._updateForm(updatedInputs)
    }

    /**
     * Сбрасывает значения всех инпутов в текущие deafultValue
     * Использует публичный метод инпута resetValue
     * @public
     * @return {Object} values, errors, hasMistake, hasChanged
     * */
    @autobind
    resetValues() {
        const updateWorkerFunc = (input) => input.resetValue()
        const updatedInputs = this._updateInputs(this._inputs, updateWorkerFunc)

        return this._updateForm(updatedInputs)
    }

    /**
     * Сбрасывает значения всех инпутов в нулину initialValue
     * Использует публичный метод инпута dropValue
     * @public
     * @return {Object} values, errors, hasMistake, hasChanged
     * */
    @autobind
    dropValues() {
        const updateWorkerFunc = (input) => input.dropValue()
        const updatedInputs = this._updateInputs(this._inputs, updateWorkerFunc)

        return this._updateForm(updatedInputs)
    }

    /**
     * Запускает валидацию всех инпутов принудительно
     * Использует публичный метод инпута verify
     * @public
     * @return {Object} values, errors, hasMistake, hasChanged
     * */
    @autobind
    validate() {
        const updateWorkerFunc = (input) => input.verify()
        const updatedInputs = this._updateInputs(this._inputs, updateWorkerFunc)

        return this._updateForm(updatedInputs)
    }

    /**
     * Хэндлер события onSubmit, инициализируется только кнопкой submit
     * @private
     * */
    @autobind
    _onSubmit(e) {
        e.preventDefault()
        const formData = this.validate()

        if (formData.hasMistake) return

        if (this.props.onSubmit) this.props.onSubmit(formData)
    }

    /**
     * Хэндлер события onReset, инициализируется только кнопкой reset
     * @private
     * */
    @autobind
    _onReset(e) {
        e.preventDefault()
        const formData = this.resetValues()

        if (this.props.onReset) this.props.onReset(formData)
    }

    /**
     * Первоначальная запись в state после регистрации всех инпутов
     * @private
     * */
    _initialOnChange() {
        this._updateForm(this._inputs)
    }

    /**
     * Переиспользуемый метод для обновления формы и вызова хандлера
     * @private
     * @return {Object} values, errors, hasMistake, hasChanged
     * */
    _updateForm(inputs, lastChanged) {
        const formData = this._createFormData(inputs, lastChanged)

        this.setState({
            ...formData
        })

        if (this.props.onChange) this.props.onChange(formData)

        return formData
    }

    /**
     * Переиспользуемый метод для вызова публичного метода инпута
     * @private
     * @param {Object} inputsNeedUpdate {field:..., field2:....}
     * @param {Function} updateWorkerFunc (input) => input.resetValue()
     * @return {Object} {field:..., field2:....}
     * */
    _updateInputs(inputsNeedUpdate, updateWorkerFunc) {
        const updatedInputs = {}

        for (const name in inputsNeedUpdate) {
            const input = this._inputs[name]
            const state = updateWorkerFunc(input, name)

            updatedInputs[name] = {state}
        }

        return updatedInputs
    }

    /**
     * Переиспользуемый создания formData values, errors, hasMistake, hasChanged
     * @private
     * @param {Object} inputs {field:..., field2:....}
     * @param {Object} lastChanged {state: ..., name: ...}
     * @return {Object} formData values, errors, hasMistake, hasChanged
     * */
    _createFormData(inputs, lastChanged) {
        const values = {}
        const errors = {}
        let hasChanged = false
        let hasMistake = false

        for (const name in inputs) {
            const inputState = lastChanged && lastChanged.name === name ? lastChanged.state : inputs[name].state

            const field = {
                name,
                value: inputState.value,
                error: inputState.error,
                hasChanged: inputState.hasChanged
            }
            values[name] = field

            if (field.hasChanged) hasChanged = true

            if (field.error) {
                errors[name] = field.error
                hasMistake = true
            }
        }

        return {values, errors, hasChanged, hasMistake}
    }

    render() {
        const {className} = this.props

        return (
            <form
                className={className}
                onSubmit={this._onSubmit}
                onReset={this._onReset}
            >
                {this.props.children}
            </form>
        )
    }

}

export {FormError}
export default Form