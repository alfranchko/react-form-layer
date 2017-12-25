import React from 'react'
import {mount} from 'enzyme'
import formInput from './index'

// Инпут который будет декарироваться в основных кейсах
// Спецом сделанно что он пустой совсем чтобы протестить именно formInput
function SomeInput() {

    return <input />
}

SomeInput.defaultProps = {
    value: ''
}

const defaultVerification = jest.fn(() => {
    return {
        hasMistake: false,
        mes: ''
    }
})

const initialOptions = {
    defaultName: 'textInput',
    defaultValue: '',
    defaultVerification
}

const FormInput = formInput(initialOptions)(SomeInput)

const setup = (props, context = {}) => {
    const wrapper = mount(<FormInput {...props} />, {lifecycleExperimental: true, context})
    const instance = wrapper.instance()

    return {wrapper, props, instance, context}
}

// LIFE CYCLE
jest.spyOn(FormInput.prototype, 'componentDidMount')
jest.spyOn(FormInput.prototype, 'componentWillUnmount')
jest.spyOn(FormInput.prototype, 'componentWillReceiveProps')
// PRIVATE
jest.spyOn(FormInput.prototype, '_completeState')
jest.spyOn(FormInput.prototype, '_callVerification')
jest.spyOn(FormInput.prototype, '_checkHasChanged')
jest.spyOn(FormInput.prototype, '_isArrayValuesChanged')
jest.spyOn(FormInput.prototype, '_extractActualValue')
jest.spyOn(FormInput.prototype, '_callOnlyParentHandler')
jest.spyOn(FormInput.prototype, '_callAllHandlers')
jest.spyOn(FormInput.prototype, '_onFocus')
jest.spyOn(FormInput.prototype, '_onBlur')
jest.spyOn(FormInput.prototype, '_onChange')
jest.spyOn(FormInput.prototype, '_onMouseDown')
jest.spyOn(FormInput.prototype, '_onKeyDown')
jest.spyOn(FormInput.prototype, '_saveRefToNodeWillFocus')
jest.spyOn(FormInput.prototype, '_completeProps')
// PUBLIC
jest.spyOn(FormInput.prototype, 'focus')
jest.spyOn(FormInput.prototype, 'setValue')
jest.spyOn(FormInput.prototype, 'resetValue')
jest.spyOn(FormInput.prototype, 'dropValue')
jest.spyOn(FormInput.prototype, 'verify')

const {
    componentDidMount, componentWillUnmount, componentWillReceiveProps, _completeState,
    _callVerification, _checkHasChanged, _isArrayValuesChanged, _extractActualValue, _callOnlyParentHandler, _callAllHandlers,
    _onFocus, _onBlur, _onChange, _onMouseDown, _onKeyDown, _saveRefToNodeWillFocus, focus, setValue,
    resetValue, dropValue, verify, _completeProps
} = FormInput.prototype

function assign(initial, expected) {
    return Object.assign({}, initial, expected)
}

describe('FormInput', () => {
    beforeEach(() => {
        // LIFE CYCLE
        componentDidMount.mockClear()
        componentWillUnmount.mockClear()
        componentWillReceiveProps.mockClear()
        // PRIVATE
        _completeState.mockClear()
        _callVerification.mockClear()
        _checkHasChanged.mockClear()
        _isArrayValuesChanged.mockClear()
        _extractActualValue.mockClear()
        _callOnlyParentHandler.mockClear()
        _callAllHandlers.mockClear()
        _onFocus.mockClear()
        _onBlur.mockClear()
        _onChange.mockClear()
        _onMouseDown.mockClear()
        _onKeyDown.mockClear()
        _completeProps.mockClear()
        // PUBLIC
        _saveRefToNodeWillFocus.mockClear()
        focus.mockClear()
        setValue.mockClear()
        resetValue.mockClear()
        dropValue.mockClear()
        verify.mockClear()
    })

    describe('life cycle methods', () => {
        describe('constructor', () => {
            const initialState = {
                value: '',
                defaultValue: '',
                error: '',
                focus: false,
                hasChanged: false
            }

            test('если пустые пропсы и контекст в state должно быть пусто', () => {
                const {instance} = setup()

                expect(instance.state).toEqual(initialState)
                expect(_checkHasChanged).toHaveBeenCalledWith(undefined, '')
            })
            test('переданные значения устанавливаются в state, если есть дефолтное то оно становится value в state', () => {
                const ex1 = setup({defaultValue: 'defVal', error: 'hasError', focus: true})

                expect(ex1.instance.state).toEqual(assign(initialState, {
                    value: 'defVal', // установилось дефолтное
                    defaultValue: 'defVal',
                    error: 'hasError',
                    hasChanged: false,
                    focus: true
                }))

                const ex2 = setup({defaultValue: 'defVal', value: 'someVal'})

                expect(ex2.instance.state).toEqual(assign(initialState, {
                    value: 'someVal',
                    defaultValue: 'defVal',
                    hasChanged: true
                }))

                // Пример с value - object
                const ex3 = setup({defaultValue: {value: null, label: ''}})

                expect(ex3.instance.state).toEqual(assign(initialState, {
                    value: {value: null, label: ''},
                    defaultValue: {value: null, label: ''},
                    hasChanged: false
                }))
            })
            test('если в контексте есть registerInput то он вызывается', () => {
                const {instance, context} = setup({}, {registerInput: jest.fn()})

                expect(instance.state).toEqual(initialState)

                expect(context.registerInput).toBeCalledWith(instance, instance.props)
            })
        })

        describe('componentDidMount', () => {
            test('если передан в пропсах focus то вызовится метод focus', () => {
                setup()
                expect(focus).not.toHaveBeenCalled()

                setup({focus: true})
                expect(focus).toHaveBeenCalled()
            })
        })

        describe('componentWillUnmount', () => {
            test('если есть в контексте unregisterInput то он вызывается и this.props.name', () => {
                const unregisterInput = jest.fn()
                const {wrapper} = setup({name: 'some_name'}, {unregisterInput})

                wrapper.unmount()

                expect(unregisterInput).toHaveBeenCalledWith('some_name')
            })
        })

        describe('componentWillReceiveProps', () => {
            const initialState = {
                value: 'initial_val',
                defaultValue: 'initial_val',
                error: '',
                focus: false,
                hasChanged: false
            }

            const initialProps = {
                name: 'some_name',
                onChange: jest.fn(),
                value: 'initial_val',
                defaultValue: 'initial_val'
            }

            const initialContext = {
                onChange: jest.fn()
            }

            beforeEach(() => {
                initialProps.onChange.mockClear()
                initialContext.onChange.mockClear()
            })

            test('если меняется props.focus ничего не должно измениться', () => {
                const {wrapper, instance, props, context} = setup(initialProps, initialContext)

                expect(instance.state).toEqual(initialState)

                // Меняем focus  - ничего не
                wrapper.setProps({focus: true})

                expect(instance.state).toEqual(initialState)
                expect(_checkHasChanged.mock.calls.length).toBe(3) // так как она в конструкторе вызывается и для value и defValue
                expect(props.onChange).not.toHaveBeenCalled()
                expect(context.onChange).not.toHaveBeenCalled()
            })

            test('если меняется props.value оно обновляется в state, проверяется hasChanged, вызываются хэндлеры', () => {
                const {wrapper, instance, props, context} = setup(initialProps, initialContext)

                wrapper.setProps({value: 'new_val'})

                expect(_checkHasChanged).toHaveBeenCalledWith('new_val', initialState.defaultValue)
                expect(instance.state).toEqual(assign(initialState, {value: 'new_val', hasChanged: true}))

                expect(props.onChange).toHaveBeenCalledWith(instance.state)
                expect(context.onChange).toHaveBeenCalledWith(instance.state, initialProps.name)
            })

            test('если меняется props.defultValue оно обновляется в state, проверяется hasChanged, вызываются хэндлеры', () => {
                const {wrapper, instance, props, context} = setup(initialProps, initialContext)

                wrapper.setProps({defaultValue: 'new_def_val'})

                expect(_checkHasChanged).toHaveBeenCalledWith(props.value, 'new_def_val')
                expect(instance.state).toEqual(assign(initialState, {defaultValue: 'new_def_val', hasChanged: true}))

                expect(props.onChange).toHaveBeenCalledWith(instance.state)
                expect(context.onChange).toHaveBeenCalledWith(instance.state, initialProps.name)
            })

            test('если меняется props.error оно обновляется в state и проверяется hasChanged', () => {
                const {wrapper, instance, props, context} = setup(initialProps, initialContext)

                wrapper.setProps({error: 'new_error'})

                expect(_checkHasChanged).toHaveBeenCalledWith(props.value, props.defaultValue)
                expect(instance.state).toEqual(assign(initialState, {error: 'new_error'}))

                expect(props.onChange).not.toHaveBeenCalled()
                expect(context.onChange).not.toHaveBeenCalled()
            })

            test('если меняется и value и defaultValue, hasChanged отрабатывает по новым значениям, вызываются хэндлеры', () => {
                const {wrapper, instance, props, context} = setup(initialProps, initialContext)

                wrapper.setProps({value: 'new_val', defaultValue: 'new_val'})

                expect(_checkHasChanged).toHaveBeenCalledWith('new_val', 'new_val')
                expect(instance.state).toEqual(assign(initialState, {value: 'new_val', defaultValue: 'new_val'}))

                wrapper.setProps({value: 'new_val_2', defaultValue: 'new_val'})

                expect(_checkHasChanged).toHaveBeenCalledWith('new_val_2', 'new_val')
                expect(instance.state).toEqual(assign(initialState, {
                    value: 'new_val_2',
                    defaultValue: 'new_val',
                    hasChanged: true
                }))

                expect(props.onChange).toHaveBeenCalledWith(instance.state)
                expect(context.onChange).toHaveBeenCalledWith(instance.state, initialProps.name)
            })
        })
    })

    describe('private methods', () => {
        describe('_completeState', () => {
            test('вызыванный без параметров должен возвращать все что в state', () => {
                const {instance} = setup()

                expect(instance._completeState()).toEqual(instance.state)
            })

            test('с переданными значениями должен вернуть смерженный state', () => {
                const {instance} = setup()
                const newKeys = {value: 'someVal', hasChanged: false}

                expect(instance._completeState(newKeys)).toEqual(assign(instance.state, newKeys))
            })
        })

        describe('_callVerification', () => {
            test('должен вызвать verification из пропсов со значением state.value и props.required, ' +
                'а также с остальными props и остальным state для любых вообще проверок', () => {
                const verifyFunc = jest.fn()
                const {instance} = setup({verification: verifyFunc, required: true, value: 'someValue'})

                instance._callVerification()

                expect(verifyFunc).toHaveBeenCalledWith(instance.state, instance.props)
            })
        })

        describe('_checkHasChanged', () => {
            const checkHasChanged = _checkHasChanged.bind(FormInput.prototype)

            test('обычные значения проверяет на неравенствоПроверяет объекты {value:...} по вложенным value', () => {
                expect(checkHasChanged('', '')).toBe(false)
                expect(checkHasChanged(null, '')).toBe(true)
                expect(checkHasChanged(null, null)).toBe(false)
                expect(checkHasChanged('val', 'defVal')).toBe(true)
            })

            test('значения типа {value:...} проверяет также на равенство по вложенным value', () => {
                expect(checkHasChanged({value: null}, {value: null})).toBe(false)
                expect(checkHasChanged({value: ''}, {value: ''})).toBe(false)
                expect(checkHasChanged({value: 0}, {value: 0})).toBe(false)
                expect(checkHasChanged({value: null}, {value: ''})).toBe(true)
                expect(checkHasChanged({value: ''}, {value: '123'})).toBe(true)
                expect(checkHasChanged({value: 123}, {value: '123'})).toBe(true) // Разные типы данных
                expect(checkHasChanged({value: 0}, {value: 1})).toBe(true)
            })

            test('значения типа [1,2,3] а также [{value...}, {value...] проверяет на состав а не по ссылке', () => {
                expect(checkHasChanged([], [])).toBe(false)
                expect(checkHasChanged([1, 2, 3], [1, 2, 3])).toBe(false)
                expect(checkHasChanged([1, 2, 3], [1])).toBe(true)
                expect(checkHasChanged([], [1])).toBe(true)
                expect(checkHasChanged([1], [])).toBe(true)
                expect(checkHasChanged([1], [{value: 1}])).toBe(false) // разный состав значений
                expect(checkHasChanged([{value: 1}], [{value: 1}])).toBe(false)
                expect(checkHasChanged([{value: 1}], [{value: '1'}])).toBe(true) // разные типы данных истинных значений
                expect(checkHasChanged([], [{value: 1}])).toBe(true)
                expect(checkHasChanged([{value: 1}], [])).toBe(true)
                expect(checkHasChanged([{value: 1}], [{value: 1}, {value: 2}])).toBe(true)
            })

            test('если value заходит как undefined - считается что нет изменения с любым defaultValue', () => {
                expect(checkHasChanged(undefined, null)).toBe(false)
                expect(checkHasChanged(undefined, 'defVal')).toBe(false)
                expect(checkHasChanged(undefined, {value: null})).toBe(false)
                expect(checkHasChanged(undefined, {value: ''})).toBe(false)
                expect(checkHasChanged(undefined, {value: 0})).toBe(false)
                expect(checkHasChanged(undefined, [])).toBe(false)
                expect(checkHasChanged(undefined, [1, 2, 3])).toBe(false)
                expect(checkHasChanged(undefined, [{value: 1}])).toBe(false)
            })
        })

        describe('_isArrayValuesChanged', () => {
            const isArrayValuesChanged = _isArrayValuesChanged.bind(FormInput.prototype)

            test('проверяет равенство по составу массива', () => {
                expect(isArrayValuesChanged([], [])).toBe(false)
                expect(isArrayValuesChanged([], undefined)).toBe(false)
                expect(isArrayValuesChanged([1], [1])).toBe(false)
                expect(isArrayValuesChanged([null], [null])).toBe(false)

                expect(isArrayValuesChanged([1], undefined)).toBe(true)
                expect(isArrayValuesChanged([1], [1, 2])).toBe(true)
                expect(isArrayValuesChanged([null], [1])).toBe(true)
                expect(isArrayValuesChanged([undefined], [1])).toBe(true)
                expect(isArrayValuesChanged(['1'], [1])).toBe(true) // разные типы данных
            })

            test('проверяет вложенность {value:...}', () => {
                expect(isArrayValuesChanged([{}], [{}])).toBe(false)
                expect(isArrayValuesChanged([{value: 1}], [{value: 1}])).toBe(false)
                expect(isArrayValuesChanged([{value: 1}, {value: 2}], [{value: 1}, {value: 2}])).toBe(false)

                expect(isArrayValuesChanged([{value: 1}], undefined)).toBe(true)
                expect(isArrayValuesChanged([{value: 1}], [])).toBe(true)
                expect(isArrayValuesChanged([{value: 1}], [{}, {}])).toBe(true)
                expect(isArrayValuesChanged([{value: 1}], [{value: 2}])).toBe(true)
                expect(isArrayValuesChanged([{value: 1}], [{value: '1'}])).toBe(true)
            })
        })

        describe('_extractActualValue', () => {
            test('если value приходит объектом вытаскивает из него value', () => {
                expect(_extractActualValue('')).toBe('')
                expect(_extractActualValue(null)).toBe(null)
                expect(_extractActualValue(1)).toBe(1)
                expect(_extractActualValue('val')).toBe('val')
                expect(_extractActualValue({value: null})).toBe(null)
                expect(_extractActualValue({value: '123'})).toBe('123')
                expect(_extractActualValue({value: 0})).toBe(0)
                expect(_extractActualValue({not_value: '123'})).toBe(undefined)
                const arr = []
                expect(_extractActualValue(arr)).toBe(arr)
                const arr2 = [1, 2, 3]
                expect(_extractActualValue(arr2)).toBe(arr2)
            })
        })

        describe('_callOnlyParentHandler', () => {
            const changedValues = {value: 'new_val'}

            test('вызывает _completeState с изменными значениями, всегда возвращает смерженный state', () => {
                const {instance} = setup()

                const res = instance._callOnlyParentHandler(changedValues)

                expect(_completeState).toHaveBeenCalledWith(changedValues)
                expect(res).toEqual(assign(instance.state, changedValues))
            })
            test('дергает только props.onChange с мерженным state, всегда возвращает смерженный state', () => {
                const {instance, props, context} = setup({onChange: jest.fn()}, {onChange: jest.fn()}) // пропсы и контекст

                const res = instance._callOnlyParentHandler(changedValues)

                expect(_completeState).toHaveBeenCalledWith(changedValues)

                expect(props.onChange).toHaveBeenCalledWith(assign(instance.state, changedValues))
                expect(context.onChange).not.toHaveBeenCalled()
                expect(res).toEqual(assign(instance.state, changedValues))
            })
        })

        describe('_callAllHandlers', () => {
            const changedValues = {value: 'new_val'}

            test('вызывает _completeState с изменными значениями, всегда возвращает смерженный state', () => {
                const {instance} = setup()

                const res = instance._callAllHandlers(changedValues)

                expect(_completeState).toHaveBeenCalledWith(changedValues)
                expect(res).toEqual(assign(instance.state, changedValues))
            })
            test('дергает c мерженным state и props.onChange и context.onChange, во второй еще передается props.name', () => {
                const {instance} = setup({onChange: jest.fn()}, {onChange: jest.fn()}) // пропсы и контекст

                const res = instance._callAllHandlers(changedValues)

                expect(_completeState).toHaveBeenCalledWith(changedValues)

                expect(instance.props.onChange).toHaveBeenCalledWith(assign(instance.state, changedValues))
                expect(instance.context.onChange).toHaveBeenCalledWith(assign(instance.state, changedValues), instance.props.name)
                expect(res).toEqual(assign(instance.state, changedValues))
            })
        })

        describe('_onFocus', () => {
            test('когда инпут фокусируется вызывается _onFocus, записывается в state focus true и вызывается хандлер', () => {
                const {wrapper, instance, props} = setup({onFocus: jest.fn()})

                expect(instance.state.focus).toBe(false)

                const event = {target: 'node'}
                wrapper.find('SomeInput').props().onFocus(event)

                expect(_onFocus).toHaveBeenCalledWith(event)
                expect(props.onFocus).toHaveBeenCalledWith(event)
                expect(instance.state.focus).toBe(true)
            })
        })

        describe('_onBlur', () => {
            const initialState = {
                value: '123',
                defaultValue: '',
                error: '',
                focus: false,
                hasChanged: true
            }

            const initialProps = {
                onBlur: jest.fn(),
                value: '123',
                verification: () => ({hasMistake: true, mes: 'Опана'}), // всегда вернем ошибку
                required: true
            }

            test('если ошибка новая должен обновится state, но теперь нет верификации на блюр', () => {
                const {wrapper, instance, props} = setup(initialProps)

                expect(instance.state).toEqual(initialState)

                wrapper.find('SomeInput').props().onFocus()

                expect(instance.state).toEqual(assign(initialState, {focus: true}))

                const event = {target: 'node'}
                wrapper.find('SomeInput').props().onBlur(event)


                expect(instance.state).toEqual(assign(initialState, {focus: false}))

                // теперь на блюр verification не вызывается
                expect(_callVerification).not.toHaveBeenCalled()
                expect(_callAllHandlers).not.toHaveBeenCalledWith()
                expect(_onBlur).toHaveBeenCalledWith(event)
                expect(props.onBlur).toHaveBeenCalledWith(event)

                initialProps.onBlur.mockClear()
            })
            test('если нет ошибки или такая же просто обновляется focus false, вызваются _callVerification, props.onBlur', () => {
                const {wrapper, instance, props} = setup(initialProps)

                expect(instance.state).toEqual(initialState)

                instance.setState({
                    error: 'Опана',
                    focus: true,
                })

                const event = {target: 'node'}
                wrapper.find('SomeInput').props().onBlur(event)

                expect(instance.state).toEqual(assign(initialState, {error: 'Опана', focus: false}))

                expect(_callVerification).not.toHaveBeenCalled()
                expect(_callAllHandlers).not.toHaveBeenCalled() // Не должна вызваться!
                expect(_onBlur).toHaveBeenCalledWith(event)
                expect(props.onBlur).toHaveBeenCalledWith(event)

                initialProps.onBlur.mockClear()
            })

            // Тест не актуален если в блюре не происходит верификации
            /* test.only('при ошибке и в state и в _callAllHandlers должно уходить value из e.target - так надо для корректной работы маски', () => {
             const {wrapper, instance} = setup(initialProps)

             const event = {target: {value: 'from_target'}}
             wrapper.find('SomeInput').props().onBlur(event)

             const updated = {value: 'from_target', error: '', focus: false}

             expect(instance.state).toEqual(assign(initialState, updated))
             expect(_callAllHandlers).toHaveBeenCalledWith(updated)

             initialProps.onBlur.mockClear()
             })*/
        })

        describe('_onСhange', () => {
            const event = {target: {value: '123'}}

            test('если disabled должно сразу выходить из функции', () => {
                const {wrapper, instance} = setup({disabled: true})

                wrapper.find('SomeInput').props().onChange(event)

                expect(instance.state).toMatchObject({value: '', hasChanged: false})
                expect(_callAllHandlers).not.toHaveBeenCalled()
            })
            test('если readOnly должно сразу выходить из функции', () => {
                const {wrapper, instance} = setup({readOnly: true})

                wrapper.find('SomeInput').props().onChange(event)

                expect(instance.state).toMatchObject({value: '', hasChanged: false})
                expect(_callAllHandlers).not.toHaveBeenCalled()
            })
            test('если все гуд проверяет hasChanged, обновляет state, и вызывает _callAllHandlers', () => {
                const {wrapper, instance} = setup()

                expect(instance.state).toMatchObject({value: '', hasChanged: false})

                wrapper.find('SomeInput').props().onChange('123')

                expect(instance.state).toMatchObject({value: '123', hasChanged: true})
                expect(_checkHasChanged).toHaveBeenCalledWith('123', instance.state.defaultValue)
                expect(_callAllHandlers).toHaveBeenCalledWith({value: '123', error: '', hasChanged: true})
            })
            test('возможно передавать вторым параметром error, которая обновится в state', () => {
                const {wrapper, instance} = setup()

                expect(instance.state).toMatchObject({value: '', error: '', hasChanged: false})

                wrapper.find('SomeInput').props().onChange('123', 'errorFromChild')

                expect(instance.state).toMatchObject({value: '123', error: 'errorFromChild', hasChanged: true})
                expect(_checkHasChanged).toHaveBeenCalledWith('123', instance.state.defaultValue)
                expect(_callAllHandlers).toHaveBeenCalledWith({value: '123', error: 'errorFromChild', hasChanged: true})
            })
        })

        describe('_onMouseDown', () => {
            test('если есть props.onMouseDown вызывает его с event', () => {
                const {wrapper, props} = setup({onMouseDown: jest.fn()})

                const event = {target: {value: '123'}}
                wrapper.find('SomeInput').props().onMouseDown(event)

                expect(props.onMouseDown).toHaveBeenCalledWith(event)
            })
        })

        describe('_onKeyDown', () => {
            test('если disabled должно сразу выходить из функции', () => {
                const {wrapper, props} = setup({disabled: true, onEnter: jest.fn()})

                const event = {keyCode: 13}
                wrapper.find('SomeInput').props().onKeyDown(event)

                expect(props.onEnter).not.toHaveBeenCalled()
            })
            test('если readOnly должно сразу выходить из функции', () => {
                const {wrapper, props} = setup({readOnly: true, onEnter: jest.fn()})

                const event = {keyCode: 13}
                wrapper.find('SomeInput').props().onKeyDown(event)

                expect(props.onEnter).not.toHaveBeenCalled()
            })
            test('если нажата клавиша enter вызывается prop.onEnter если он есть', () => {
                const {wrapper, props} = setup({onEnter: jest.fn()})

                const event = {keyCode: 13}
                wrapper.find('SomeInput').props().onKeyDown(event)

                expect(props.onEnter).toHaveBeenCalled()
                expect(props.onEnter.mock.calls[0][0]).toMatchObject({keyCode: 13})
            })
        })

        describe('_saveRefToNodeWillFocus', () => {
            test('вызывается при рендере сохраняет ссылку на input в this', () => {
                const {instance} = setup()

                instance._saveRefToNodeWillFocus({mock: 'input'})

                expect(instance.input).toEqual({mock: 'input'})
            })
        })

        describe('_completeProps', () => {

            test('должно сформировать пропсы, которые идут в ребенка определенным образом', () => {

                const verification = jest.fn()

                const {wrapper, instance} = setup({
                    value: 'initValue',
                    defaultValue: 'initDefaultValue',
                    error: 'initError',
                    focus: false,
                    onChange: () => {
                    },
                    onKeyDown: () => {
                    },
                    onBlur: () => {
                    },
                    onFocus: () => {
                    },
                    onMouseDown: () => {
                    },
                    name: 'nameFromProps',
                    disabled: true,
                    readOnly: true,
                    icon: 'iconFromProps',
                    link: 'linkFromProps',
                    className: 'classFromProps',
                    someElse: true,
                    verification
                })


                // Заранее подменим state отличный от пропс
                wrapper.setState({
                    value: 'valueFromState',
                    error: 'errorFromState',
                    focus: true
                })

                expect(wrapper.find('SomeInput').props()).toEqual({
                    // value, error и focus должно взяться из state
                    value: 'valueFromState',
                    error: 'errorFromState',
                    focus: true,
                    // Это должно взяться из собственных методов
                    // onChange, onKeyDown, onBlur, onFocus, onMouseDown, saveRefToNodeWillFocus,
                    onChange: instance._onChange,
                    onKeyDown: instance._onKeyDown,
                    onBlur: instance._onBlur,
                    onFocus: instance._onFocus,
                    onMouseDown: instance._onMouseDown,
                    saveRefToNodeWillFocus: instance._saveRefToNodeWillFocus,
                    // Все остальное должно пройти как есть
                    name: 'nameFromProps',
                    disabled: true,
                    readOnly: true,
                    icon: 'iconFromProps',
                    link: 'linkFromProps',
                    className: 'classFromProps',
                    someElse: true,
                    defaultValue: 'initDefaultValue',
                    verification
                })
            })
        })
    })

    describe('public methods', () => {
        describe('focus', () => {
            test('должен вызывать метод focus у this.input', () => {
                const {instance} = setup()

                instance.input = {
                    focus: jest.fn()
                }

                instance.focus()

                expect(instance.input.focus).toHaveBeenCalled()
            })
        })
        describe('setValue', () => {
            test('записывает в state измененные значение и вызвает _callOnlyParentHandler, возвращает обновленный state', () => {
                const {instance} = setup()

                const res = instance.setValue({value: '123', error: 'haserror'})

                expect(instance.state).toMatchObject({value: '123', hasChanged: true, error: 'haserror'})
                expect(res).toEqual(instance.state)
            })
            test('если не пришла определенная ошибка записывает error:"", возвращает обновленный state', () => {
                const {instance} = setup()

                instance.setState({error: 'haserror'})

                const res = instance.setValue({value: '123'})

                // Ошибочка сброиться должна
                expect(instance.state).toMatchObject({value: '123', hasChanged: true, error: ''})
                expect(res).toEqual(instance.state)
            })
            test('всегда проверяет hasChanged, возвращает обновленный state', () => {
                const {instance} = setup()

                _checkHasChanged.mockClear()

                instance.setState({error: 'haserror'})

                expect(_checkHasChanged).not.toHaveBeenCalled()

                const res = instance.setValue({value: '123'})

                expect(_checkHasChanged).toHaveBeenCalledWith('123', instance.state.defaultValue)
                expect(instance.state).toMatchObject({value: '123', hasChanged: true, error: ''})
                expect(res).toEqual(instance.state)

                const res2 = instance.setValue({value: undefined, defaultValue: 'new_def'})

                expect(_checkHasChanged).toHaveBeenCalledWith(instance.state.value, 'new_def')
                expect(instance.state).toMatchObject({value: '123', hasChanged: true, error: ''})
                expect(res2).toEqual(instance.state)
            })
        })
        describe('resetValue', () => {
            test('сбрасывает value в дефолтное, сбрасывает ошибку, вызывает _callOnlyParentHandler и возвращает state', () => {
                const {wrapper, instance} = setup({defaultValue: 'defVal'})

                expect(instance.state).toEqual({
                    value: 'defVal',
                    defaultValue: 'defVal',
                    error: '',
                    focus: false,
                    hasChanged: false
                })

                wrapper.setState({
                    value: '123',
                    error: 'error',
                    hasChanged: true,
                    focus: true
                })

                const res = instance.resetValue()

                expect(instance.state).toEqual({
                    value: 'defVal',
                    defaultValue: 'defVal',
                    hasChanged: false,
                    error: '',
                    focus: true
                })
                expect(instance.state).toEqual(res)
            })
        })

        describe('dropValue', () => {
            test('обнуляет value, сбрасывает ошибку, вызывает _callOnlyParentHandler и возвращает state', () => {
                const {wrapper, instance} = setup()

                expect(instance.state).toEqual({
                    value: '',
                    defaultValue: '',
                    error: '',
                    focus: false,
                    hasChanged: false
                })

                wrapper.setState({
                    value: '123',
                    error: 'error',
                    hasChanged: true,
                    focus: true
                })

                const res = instance.dropValue()

                expect(instance.state).toEqual({
                    value: '',
                    defaultValue: '',
                    hasChanged: false,
                    error: '',
                    focus: true
                })
                expect(instance.state).toEqual(res)
            })

            test('проверяет hasChanged в отличие от resetValue', () => {
                const {wrapper, instance} = setup({defaultValue: 'defVal'})

                expect(instance.state).toEqual({
                    value: 'defVal',
                    defaultValue: 'defVal',
                    error: '',
                    focus: false,
                    hasChanged: false
                })

                wrapper.setState({
                    value: '123',
                    error: 'error',
                    hasChanged: true,
                    focus: true
                })

                const res = instance.dropValue()

                expect(instance.state).toEqual({
                    value: '',
                    defaultValue: 'defVal',
                    hasChanged: true, // !!! проверяет
                    error: '',
                    focus: true
                })
                expect(instance.state).toEqual(res)
            })
        })

        describe('verify', () => {
            test('вызывает _callVerification, если есть ошибка пишет в state, вызывает _callOnlyParentHandler', () => {
                const {wrapper, instance} = setup({
                    defaultValue: 'defVal',
                    verification: () => ({hasMistake: false, mes: ''})
                })

                expect(instance.state).toEqual({
                    value: 'defVal',
                    defaultValue: 'defVal',
                    error: '',
                    focus: false,
                    hasChanged: false
                })

                const res = instance.verify()

                expect(instance.state).toEqual({
                    value: 'defVal',
                    defaultValue: 'defVal',
                    hasChanged: false,
                    error: '',
                    focus: false
                })
                expect(instance.state).toEqual(res)
                expect(_callOnlyParentHandler).not.toHaveBeenCalled()

                wrapper.setProps({verification: () => ({hasMistake: true, mes: 'Опана'})}) // Вернет ошибку

                const res2 = instance.verify()

                expect(instance.state).toEqual({
                    value: 'defVal',
                    defaultValue: 'defVal',
                    hasChanged: false,
                    error: 'Опана',
                    focus: false
                })
                expect(instance.state).toEqual(res2)
                expect(_callOnlyParentHandler).toHaveBeenCalledWith({error: 'Опана'})
            })
        })
    })
})