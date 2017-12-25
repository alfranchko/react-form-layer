import React, {Component} from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'


/*
 * formInput - самодостаточный HOC компонент, который может обварачивать BaseInput, Radio, Checkbox и др
 * Все значения берутся из state, все что зависит от пропсов при изменении обновляют state в componentWillReceiveProps
 *
 * В данный момент formInput может использоваться в полном "ручном режиме" когда мы передаем value error и onChange от родителя
 * Но предпочтительный вариант использования совместно с компонентом <Form />
 * */

export function extractValue(value) {
    return value instanceof Object && !(value instanceof Array) ? value.value : value
}


export function formInput(initialOptions = {}) {
    const {defaultName, defaultValue, defaultVerification} = initialOptions


    return (Input) => {
        const initialDefValue = defaultValue

        class FormInput extends Component {

            static contextTypes = {
                onChange: PropTypes.func,
                registerInput: PropTypes.func,
                unregisterInput: PropTypes.func
            }

            static propTypes = {
                // main
                disabled: PropTypes.bool, // Блочит любые действия и меняет стили как явно недоступный инпут
                error: PropTypes.string,
                focus: PropTypes.bool, // переданное значение фокусирует инпут при маунте
                name: PropTypes.string.isRequired,
                readOnly: PropTypes.bool, // Инпут который нельзя редактировать но выглядит как обычный
                value: PropTypes.any,
                defaultValue: PropTypes.any,

                // onHandlers
                onChange: PropTypes.func,
                onMouseDown: PropTypes.func,
                onBlur: PropTypes.func,
                onFocus: PropTypes.func,
                onEnter: PropTypes.func,

                // Verify
                verification: PropTypes.func.isRequired, // функция проверки введенного значения на onBlur
                regexp: PropTypes.object, // блокирует ввод недопустимых символов в onChange
                required: PropTypes.bool
            }

            static defaultProps = {
                value: undefined,
                error: '',
                name: defaultName,
                verification: defaultVerification,
                defaultValue
            }

            constructor(props, context) {
                super()

                this.state = {
                    value: props.value || props.defaultValue,
                    defaultValue: props.defaultValue,
                    error: props.error || '',
                    focus: !!props.focus,
                    hasChanged: this._checkHasChanged(props.value, props.defaultValue)
                }

                if (context.registerInput) context.registerInput(this, props)
            }

            componentDidMount() {
                if (this.props.focus) this.focus()
            }

            componentWillUnmount() {
                if (this.context.unregisterInput) this.context.unregisterInput(this.props.name)
            }

            componentWillReceiveProps(next) {
                const {defaultValue, value, error} = next

                if (this._checkHasChanged(defaultValue, this.props.defaultValue)
                    || this._checkHasChanged(value, this.props.value)) {
                    const hasChanged = this._checkHasChanged(value, defaultValue)
                    const state = {
                        value,
                        defaultValue,
                        hasChanged
                    }

                    this.setState(state)

                    // Этот кейс необходим для "контролируемых инпутов" (когда value или defaultValue приходят меняются сверху)
                    // Вызов _callAllHandlers здесь позволяет синхронизировать инпуты с Form или другими компонентами
                    this._callAllHandlers(state)
                }

                if (error !== this.props.error) {
                    this.setState({error})
                }
            }

            /**
             * @private
             * @param {object} update - ключи и значения для записи в state например {value: '123'}
             * @return {Object} возвращает полный state смерженный с обновленными ключами
             * */
            /* eslint no-restricted-syntax: off */
            _completeState(update = {}) {
                const state = {}

                for (const key in this.state) {
                    if (update[key] === undefined) {
                        state[key] = this.state[key]
                    } else {
                        state[key] = update[key]
                    }
                }

                return state
            }

            /**
             * @private
             * @return {Object} {hasMitake: Boolean, mes: String}
             * */
            _callVerification() {
                return this.props.verification(this.state, this.props)
            }

            /**
             * @private
             * @param {(string|number|object|array, undefined)} value
             * @param {(string|number|object|array)} defValue
             * @return {Boolean}
             * */
            _checkHasChanged(value, defValue) {
                const extractedValue = this._extractActualValue(value)

                // При сравнивании с неизвестным значением считается что нет изменения
                if (extractedValue === undefined) return false

                // Для значений типа Array
                if (extractedValue instanceof Array) {
                    return this._isArrayValuesChanged(value, defValue)
                }

                // Для простых значений и значений {value: ...}
                return extractedValue !== this._extractActualValue(defValue)
            }

            /**
             * @private
             * @param {array} value
             * @param {array, undefined} defValue
             * @return {Boolean}
             * */
            _isArrayValuesChanged(value, defValue = []) {
                // Если длинна не совпадает это не одинаковые значения
                if (value.length !== defValue.length) return true

                let isEqual = false

                for (let i = 0; i < value.length; i += 1) {
                    const val1 = this._extractActualValue(value[i])
                    const val2 = this._extractActualValue(defValue[i])

                    if (val1 !== val2 || typeof val1 !== typeof val2) {
                        isEqual = true
                        break
                    }
                }

                return isEqual
            }

            /**
             * @private
             * @param {(string|number|object)} value
             * @return {string|number|object}
             * */
            _extractActualValue(value) {
                // Если приходит value как объект необходимо вытащить истинное value
                // Функция выносенна отдельно так как в других частях приложения она тоже используется
                return extractValue(value)
            }

            /**
             * Мержет state с обновленными ключами и дергает только родительский хэндлер props.onChange
             * @private
             * @param {object} toUpdate - ключи и значения для записи в state например {value: '123'}
             * @return {object} возвращает обновленный state
             * */
            _callOnlyParentHandler(toUpdate) {
                const state = this._completeState(toUpdate)

                if (this.props.onChange) this.props.onChange(state)

                return state
            }

            /**
             * Мержет state с обновленными ключами и дергает и родительский и из контеста onChange
             * @private
             * @param {object} toUpdate - ключи и значения для записи в state например {value: '123'}
             * @return {object} возвращает обновленный state
             * */
            _callAllHandlers(toUpdate) {
                const state = this._completeState(toUpdate)

                if (this.props.onChange) this.props.onChange(state)
                if (this.context.onChange) this.context.onChange(state, this.props.name)

                return state
            }

            /**
             * Хэндлер в input на фокус
             * @private
             * */
            @autobind
            _onFocus(e) {
                this.setState({focus: true})

                if (this.props.onFocus) this.props.onFocus(e)
            }

            /**
             * Хэндлер в input на блюр. Вызывает верификацию! Если есть ошибка обновляет state и все хандлеры
             * @private
             * */
            @autobind
            _onBlur(e) {
                // Пока блюр проверят ошибки только в base, возможно вообще нужно отключить это!
                // Поговорил с Женей - решили пока отключить это
                /* const error = this._callVerification()

                 if (targetType === 'base' && error.mes !== this.state.error) {
                 // Важно! Так как маска зараза скидывает пустую маску в пустую строку важно взять именно оттуда
                 const value = e.target.value || ''
                 const toUpdate = {error: error.mes, focus: false, value}

                 this.setState(toUpdate)

                 this._callAllHandlers(toUpdate)
                 } else {
                 this.setState({focus: false})
                 }*/

                this.setState({focus: false})

                if (this.props.onBlur) this.props.onBlur(e)
            }

            /**
             * Хэндлер в input на onChange. Блокирует ввод данных если не удолетворяет regexp
             * @param {any} value - любое значение подымающеся из обвернутого инпута
             * @param {String} error - ошибка - возможность устанавливать ошибки через onChange
             * @private
             * */
            @autobind
            _onChange(value, error = '') {
                if (this.props.disabled || this.props.readOnly) return

                // Проверяем допустимые символы
                // Проверка на regexp данных живет теперь только в BaseInput
                // deprecated
                //if (this.props.regexp && this.props.regexp.test(value)) return

                const toUpdate = {
                    value,
                    error,
                    hasChanged: this._checkHasChanged(value, this.props.defaultValue)
                }

                this.setState(toUpdate)

                this._callAllHandlers(toUpdate)
            }

            /**
             * Хэндлер в input на mouseDown
             * @private
             * */
            @autobind
            _onMouseDown(e) {
                if (this.props.onMouseDown) this.props.onMouseDown(e)
            }

            /**
             * Хэндлер в input на keyDown
             * @private
             * */
            @autobind
            _onKeyDown(e) {
                if (this.props.disabled || this.props.readOnly) return

                if (e.keyCode === 13 && this.props.onEnter) this.props.onEnter(e)
            }

            /**
             * Запись ссылки на input
             * @private
             * */
            @autobind
            _saveRefToNodeWillFocus(i) {
                this.input = i
            }

            /**
             * @public
             * */
            @autobind
            focus() {
                if (this.input) this.input.focus()
            }

            /**
             * Публичный метод для установки любых значений в state инпута c вызовом родительского хэндлера
             * например this.input.setValue({value: 123, error: 'someError'})
             * @public
             * @param {object} needUpdate - ключи и значения которые нужно обновить
             * @return {object} возвращает полный обновленный state
             * */
            @autobind
            setValue(needUpdate) {
                const {
                    value = this.state.value,
                    defaultValue = this.state.defaultValue, //
                    error = '', // если не будет переданна определенная ошибка по умолчанию она скидываестя
                    ...other
                } = needUpdate

                const hasChanged = this._checkHasChanged(value, defaultValue)

                const toUpdate = {value, defaultValue, hasChanged, error, ...other}

                this.setState(toUpdate)

                return this._callOnlyParentHandler(toUpdate)
            }

            /**
             * this.input.resetValue()
             * Публичный метод для сброса значения value в state на дефолтный defaultValue
             * Обнуляет error, hasChanged
             * @public
             * @return {object} возвращает полный обновленный state
             * */
            @autobind
            resetValue() {
                const toUpdate = {
                    error: '',
                    value: this.props.defaultValue,
                    hasChanged: false
                }

                this.setState(toUpdate)

                return this._callOnlyParentHandler(toUpdate)
            }

            /**
             * this.input.dropValue()
             * Публичный метод для сброса значения value в state на initialDefValue (обнуление значения)
             * Обнуляет error, hasChanged
             * @public
             * @return {object} возвращает полный обновленный state
             * */
            @autobind
            dropValue() {
                const toUpdate = {
                    error: '',
                    value: initialDefValue,
                    hasChanged: this._checkHasChanged(initialDefValue, this.state.defaultValue)
                }

                this.setState(toUpdate)

                return this._callOnlyParentHandler(toUpdate)
            }

            /**
             * this.input.verify()
             * Публичный метод для вызова верификации. Если есть ошибка обноляет state и вызывает родительский OnChange
             * @public
             * @return {object} возвращает полный обновленный state
             * */
            @autobind
            verify() {
                const error = this._callVerification()

                if (error.hasMistake) {
                    const toUpdate = {error: error.mes}

                    this.setState(toUpdate)

                    return this._callOnlyParentHandler(toUpdate)
                }

                return this.state
            }

            _completeProps() {
                const {value, error, focus} = this.state
                const other = this.props

                return {
                    ...other,
                    onChange: this._onChange,
                    onKeyDown: this._onKeyDown,
                    onBlur: this._onBlur,
                    onFocus: this._onFocus,
                    onMouseDown: this._onMouseDown,
                    saveRefToNodeWillFocus: this._saveRefToNodeWillFocus,
                    value,
                    error,
                    focus
                }
            }

            render() {
                const props = this._completeProps()

                return <Input {...props} />
            }
        }

        return FormInput
    }
}

export default formInput