import React, {Component} from 'react'
import {shallow, mount} from 'enzyme'
import Form from './index'
import formInput from '../FormInput'


class SimpleInput extends Component {

    onChange = (e) => {
        const {value} = e.target

        this.props.onChange(value)
    }

    render() {
        return <input onChange={this.onChange} value={this.props.value} />
    }
}


const BaseInput = formInput({
    defaultName: 'base',
    defaultValue: '',
    defaultVerification: jest.fn()
})(SimpleInput)


const setupWithInputs = (props) => {
    const wrapper = mount(
        <Form {...props} >
            <BaseInput name="field_1" />
            <BaseInput name="field_2" />
        </Form>
    )
    const instance = wrapper.instance()

    return {wrapper, props, instance}
}

const setupEmpty = (props) => {
    const wrapper = shallow(
        <Form {...props} />
    )
    const instance = wrapper.instance()

    return {wrapper, props, instance}
}


jest.spyOn(Form.prototype, 'componentDidMount')
jest.spyOn(Form.prototype, 'componentWillUnmount')
jest.spyOn(Form.prototype, '_initialOnChange')
jest.spyOn(Form.prototype, '_updateForm')
jest.spyOn(Form.prototype, '_updateInputs')
jest.spyOn(Form.prototype, '_createFormData')
jest.spyOn(Form.prototype, 'registerInput')
jest.spyOn(Form.prototype, 'unregisterInput')
jest.spyOn(Form.prototype, 'onChange')
jest.spyOn(Form.prototype, 'validate')
jest.spyOn(Form.prototype, 'resetValues')
jest.spyOn(Form.prototype, 'dropValues')


const {
    componentDidMount,
    componentWillUnmount,
    _initialOnChange,
    _updateForm,
    _updateInputs,
    _createFormData,
    registerInput,
    unregisterInput,
    onChange,
    validate,
    resetValues,
    dropValues,
} = Form.prototype


describe('Form', () => {

    test('markUp', () => {
        const Children = () => <div>Children</div>

        const wrapper = shallow(
            <Form className="someClassName">
                <Children />
            </Form>
        )


        expect(wrapper).toMatchSnapshot()
    })

    describe('Methods', () => {
        beforeEach(() => {
            componentDidMount.mockClear()
            componentWillUnmount.mockClear()
            _initialOnChange.mockClear()
            _updateForm.mockClear()
            _updateInputs.mockClear()
            _createFormData.mockClear()
            registerInput.mockClear()
            unregisterInput.mockClear()
            onChange.mockClear()
            validate.mockClear()
            resetValues.mockClear()
            dropValues.mockClear()
        })

        test('getChildContext', () => {
            const {instance} = setupEmpty()

            const context = instance.getChildContext()

            expect(context).toEqual({
                onChange: instance.onChange,
                registerInput: instance.registerInput,
                unregisterInput: instance.unregisterInput,
                formData: {
                    values: {},
                    errors: {},
                    hasMistake: false,
                    hasChanged: false,
                },
            })
        })

        test('componentDidMount', () => {
            const onChangeProp = jest.fn()

            expect(registerInput).not.toHaveBeenCalled()
            expect(componentDidMount).not.toHaveBeenCalled()
            expect(_initialOnChange).not.toHaveBeenCalled()
            expect(_updateForm).not.toHaveBeenCalled()
            expect(_createFormData).not.toHaveBeenCalled()
            expect(onChange).not.toHaveBeenCalled()

            const {instance} = setupWithInputs({onChange: onChangeProp})

            expect(registerInput.mock.calls.length).toBe(2) // ибо два инпута зарегались
            expect(componentDidMount.mock.calls.length).toBe(1)
            expect(_initialOnChange.mock.calls.length).toBe(1)
            expect(_updateForm).toHaveBeenCalledWith(instance._inputs)
            expect(_createFormData).toHaveBeenCalledWith(instance._inputs, undefined)
            expect(instance._isMounted).toBe(true)

            const expectedState = {
                values: {
                    field_1: {name: 'field_1', value: '', error: '', hasChanged: false},
                    field_2: {name: 'field_2', value: '', error: '', hasChanged: false}
                },
                errors: {},
                hasChanged: false,
                hasMistake: false
            }

            expect(instance.state).toEqual(expectedState)
            expect(onChangeProp).toHaveBeenCalledWith(expectedState)
        })

        test('componentWillUnmount', () => {
            const {instance} = setupEmpty()
            expect(instance._isMounted).toBe(true)
            instance.componentWillUnmount()
            expect(instance._isMounted).toBe(false)
        })

        test('registerInput', () => {
            const {instance} = setupEmpty()
            const someInputInstance = {
                state: {
                    value: '',
                    error: '',
                    hasChanged: false
                }
            }
            const someInputProps = {name: 'some_name'}

            // update сработает однажды при манте
            expect(_updateForm.mock.calls.length).toBe(1)

            instance._isMounted = false
            expect(instance._inputs).toEqual({})

            instance.registerInput(someInputInstance, someInputProps)

            expect(instance._inputs).toEqual({some_name: {state: {value: '', error: '', hasChanged: false}}})
            // Когда несмонтированный компонент обновление не должно срабатывать
            expect(_updateForm.mock.calls.length).toBe(1)

            // Обнуляем, но устанавливаем _isMounted = true
            instance._isMounted = true
            instance._inputs = {}

            instance.registerInput(someInputInstance, someInputProps)
            expect(instance._inputs).toEqual({some_name: {state: {value: '', error: '', hasChanged: false}}})
            // Должна срабоать!! Так как на смаунтенном компоненте нужно обновлять новые инпутики
            expect(_updateForm.mock.calls.length).toBe(2)
        })

        test('unregisterInput', () => {
            const {instance} = setupWithInputs()
            // update сработает однажды при маунте
            expect(_updateForm.mock.calls.length).toBe(1)

            expect(instance.state).toEqual({
                values: {
                    field_1: {name: 'field_1', value: '', error: '', hasChanged: false},
                    field_2: {name: 'field_2', value: '', error: '', hasChanged: false}
                },
                errors: {},
                hasChanged: false,
                hasMistake: false
            })
            expect(typeof instance._inputs.field_1).toBe('object')
            expect(typeof instance._inputs.field_2).toBe('object')

            instance.unregisterInput('field_1')

            expect(_updateForm.mock.calls.length).toBe(2)
            expect(instance.state).toEqual({
                values: {
                    field_2: {name: 'field_2', value: '', error: '', hasChanged: false}
                },
                errors: {},
                hasChanged: false,
                hasMistake: false
            })

            expect(typeof instance._inputs.field_1).toBe('undefined')
            expect(typeof instance._inputs.field_2).toBe('object')

            // Если не смаунтен то не должно вызываться _updateForm и обновляться state
            instance._isMounted = false

            instance.unregisterInput('field_2')
            expect(_updateForm.mock.calls.length).toBe(2)
        })

        test('onChange', () => {
            const {instance} = setupWithInputs()
            expect(_updateForm.mock.calls.length).toBe(1)

            const inputChangedState = {
                value: 'opa',
                error: '',
                hasChanged: true
            }

            instance.onChange(inputChangedState, 'field_1')

            expect(_updateForm).toHaveBeenCalledWith(instance._inputs, {state: inputChangedState, name: 'field_1'})

            expect(instance.getValues()).toEqual({
                values: {
                    field_1: {name: 'field_1', value: 'opa', error: '', hasChanged: true},
                    field_2: {name: 'field_2', value: '', error: '', hasChanged: false}
                },
                errors: {},
                hasChanged: true,
                hasMistake: false
            })
        })

        test('getValues', () => {
            const {instance} = setupWithInputs()

            expect(instance.getValues()).toEqual({
                values: {
                    field_1: {name: 'field_1', value: '', error: '', hasChanged: false},
                    field_2: {name: 'field_2', value: '', error: '', hasChanged: false}
                },
                errors: {},
                hasChanged: false,
                hasMistake: false
            })
        })

        test('setValues', () => {
            expect(_updateInputs).not.toHaveBeenCalled()
            expect(_updateForm).not.toHaveBeenCalled()

            const {instance} = setupWithInputs()
            expect(_updateForm.mock.calls.length).toBe(1)

            // Изначально
            expect(instance._inputs.field_1.state).toEqual({
                defaultValue: '',
                error: '',
                focus: false,
                hasChanged: false,
                value: '',
            })

            instance.setValues({field_1: {value: 'new_value'}})

            expect(_updateInputs.mock.calls.length).toBe(1)
            expect(_updateForm.mock.calls.length).toBe(2)

            expect(instance._inputs.field_1.state).toEqual({
                defaultValue: '',
                error: '',
                focus: false,
                hasChanged: true, // !!!
                value: 'new_value', // !!!
            })

            // Можем записать в инпут че егодно!
            instance.setValues({field_1: {value: 'new_value2', defaultValue: 'def', error: 'опа'}})

            expect(instance._inputs.field_1.state).toEqual({
                defaultValue: 'def', // !!!
                error: 'опа', // !!!
                focus: false,
                hasChanged: true, // !!!
                value: 'new_value2', // !!!
            })
        })

        test('resetValues', () => {
            expect(_updateInputs).not.toHaveBeenCalled()
            expect(_updateForm).not.toHaveBeenCalled()

            const {instance} = setupWithInputs()
            expect(_updateForm.mock.calls.length).toBe(1)

            // ченить засунем в инпут
            instance._inputs.field_1.setState({value: 'tratata', hasChanged: true})
            expect(instance._inputs.field_1.state).toEqual({
                defaultValue: '',
                error: '',
                focus: false,
                hasChanged: true,
                value: 'tratata',
            })

            instance.resetValues()

            expect(_updateInputs.mock.calls.length).toBe(1)
            expect(_updateForm.mock.calls.length).toBe(2)

            expect(instance._inputs.field_1.state).toEqual({
                defaultValue: '',
                error: '',
                focus: false,
                hasChanged: false,
                value: '', // !!!
            })
        })

        test('dropValues', () => {
            expect(_updateInputs).not.toHaveBeenCalled()
            expect(_updateForm).not.toHaveBeenCalled()

            const {instance} = setupWithInputs()
            expect(_updateForm.mock.calls.length).toBe(1)

            // ченить засунем в инпут
            instance._inputs.field_1.setState({value: 'tra', defaultValue: 'tratata', hasChanged: true})
            expect(instance._inputs.field_1.state).toEqual({
                defaultValue: 'tratata',
                error: '',
                focus: false,
                hasChanged: true,
                value: 'tra',
            })

            instance.dropValues()

            expect(_updateInputs.mock.calls.length).toBe(1)
            expect(_updateForm.mock.calls.length).toBe(2)

            expect(instance._inputs.field_1.state).toEqual({
                defaultValue: 'tratata',
                error: '',
                focus: false,
                hasChanged: true, // !!! ПРоверяет hasChanged
                value: ''
            })
        })

        test('validate', () => {
            expect(_updateInputs).not.toHaveBeenCalled()
            expect(_updateForm).not.toHaveBeenCalled()

            const {instance} = setupEmpty()

            instance._inputs = {
                field_1: {
                    verify: jest.fn(() => ({value: 'reseted'}))
                },
                field_2: {
                    verify: jest.fn(() => ({value: 'reseted'}))
                }
            }

            const {field_1, field_2} = instance._inputs

            expect(_updateForm.mock.calls.length).toBe(1)

            instance.validate()

            expect(field_1.verify.mock.calls.length).toBe(1)
            expect(field_2.verify.mock.calls.length).toBe(1)
            expect(_updateInputs.mock.calls.length).toBe(1)
            expect(_updateForm.mock.calls.length).toBe(2)
        })

        test('_onSubmit', () => {
            const event = {preventDefault: jest.fn()}
            const {instance, wrapper} = setupEmpty()

            expect(validate).not.toHaveBeenCalled()

            instance._onSubmit(event)

            expect(validate).toHaveBeenCalled()
            expect(event.preventDefault.mock.calls.length).toBe(1)
            event.preventDefault.mockClear()

            // Передадим хэндлер - теперь он должен вызываться и вызывать validate
            const onSubmitProp = jest.fn()
            wrapper.setProps({onSubmit: onSubmitProp})

            instance._onSubmit(event)
            expect(validate.mock.calls.length).toBe(2)
            expect(onSubmitProp).toHaveBeenCalledWith(instance.state)
            expect(event.preventDefault.mock.calls.length).toBe(1)
            event.preventDefault.mockClear()
            onSubmitProp.mockClear()

            // Если ест ошибка то хандлер не должен вызываться!!!
            // сначала подменем validate ибо он завязан на инпуты сильно
            instance.validate = jest.fn(() => ({hasMistake: true}))

            instance._onSubmit(event)
            expect(validate.mock.calls.length).toBe(2)
            expect(onSubmitProp).not.toHaveBeenCalled()
            expect(event.preventDefault.mock.calls.length).toBe(1)
        })

        test('_onReset', () => {
            const event = {preventDefault: jest.fn()}
            const formData = {errors: {}, hasChanged: false, hasMistake: false, values: {}}
            const {instance, wrapper} = setupEmpty()

            instance._onReset(event)

            expect(resetValues).toHaveBeenCalled()
            expect(event.preventDefault.mock.calls.length).toBe(1)
            event.preventDefault.mockClear()
            resetValues.mockClear()

            // Передадим хэндлер - теперь он должен вызываться и вызывать validate
            const onResetProp = jest.fn()
            wrapper.setProps({onReset: onResetProp})

            instance._onReset(event)

            expect(resetValues.mock.calls.length).toBe(1)
            expect(onResetProp).toHaveBeenCalledWith(formData)
            expect(event.preventDefault.mock.calls.length).toBe(1)
            event.preventDefault.mockClear()
        })

        test('_initialOnChange', () => {
            const {instance} = setupEmpty()
            _updateForm.mockClear()

            expect(_updateForm).not.toHaveBeenCalled()

            instance._initialOnChange()

            expect(_updateForm).toHaveBeenCalledWith(instance._inputs)
        })

        test('_updateForm', () => {
            const onChangeProp = jest.fn()
            const formData = {values: {}, errors: {}, hasMistake: false, hasChanged: false}
            const lastChanged = {state: {}, name: 'last'}
            const {instance} = setupEmpty({onChange: onChangeProp})
            // подменим чтобы исключить
            Form.prototype._createFormData = jest.fn(() => formData)

            instance._updateForm(instance._inputs, lastChanged)

            expect(Form.prototype._createFormData).toHaveBeenCalledWith(instance._inputs, lastChanged)
            expect(instance.state).toEqual(formData)
            expect(onChangeProp).toHaveBeenCalledWith(formData)

            // Вернем обратно
            Form.prototype._createFormData = _createFormData
        })

        test('_updateInputs', () => {
            const {instance} = setupEmpty()
            const inputs = {
                field1: {
                    someMethod: jest.fn(() => ({value: '123', error: '123'}))
                },
                field2: {
                    someMethod: jest.fn(() => ({value: 'opa', error: 'opa'}))
                }
            }

            instance._inputs = inputs

            const needUpdate = instance._inputs
            const worker = jest.fn((input) => input.someMethod())

            const result = instance._updateInputs(needUpdate, worker)

            expect(inputs.field1.someMethod).toHaveBeenCalled()
            expect(inputs.field2.someMethod).toHaveBeenCalled()
            expect(result).toEqual({
                field1: {state: {value: '123', error: '123'}},
                field2: {state: {value: 'opa', error: 'opa'}}
            })
        })

        describe('_createFormData', () => {
            test('Нет ошибки нет изменений есть только значение одно', () => {
                const inputs = {
                    field_1: {state: {name: 'field_1', value: 'opa', error: '', hasChanged: false}},
                    field_2: {state: {name: 'field_2', value: '', error: '', hasChanged: false}}
                }

                const formData = _createFormData(inputs, undefined)

                expect(formData).toEqual({
                    values: {
                        field_1: {name: 'field_1', value: 'opa', error: '', hasChanged: false},
                        field_2: {name: 'field_2', value: '', error: '', hasChanged: false}
                    },
                    errors: {},
                    hasChanged: false,
                    hasMistake: false
                })
            })

            test('Есть ошибка и есть изменение', () => {
                const inputs = {
                    field_1: {state: {name: 'field_1', value: 'opa', error: '', hasChanged: true}},
                    field_2: {state: {name: 'field_2', value: '', error: 'ups', hasChanged: false}}
                }
                const formData = _createFormData(inputs, undefined)

                expect(formData).toEqual({
                    values: {
                        field_1: {name: 'field_1', value: 'opa', error: '', hasChanged: true},
                        field_2: {name: 'field_2', value: '', error: 'ups', hasChanged: false}
                    },
                    errors: {field_2: 'ups'},
                    hasChanged: true,
                    hasMistake: true
                })
            })

            test('есть ошибка и иередан lastChanged ', () => {
                const inputs = {
                    field_1: {state: {name: 'field_1', value: 'opa', error: '', hasChanged: false}},
                    field_2: {state: {name: 'field_2', value: '', error: 'ups', hasChanged: true}}
                }
                const lastChanged = {state: {name: 'field_2', value: '', error: '', hasChanged: false}, name: 'field_2'}
                const formData = _createFormData(inputs, lastChanged)

                expect(formData).toEqual({
                    values: {
                        field_1: {name: 'field_1', value: 'opa', error: '', hasChanged: false},
                        field_2: {name: 'field_2', value: '', error: '', hasChanged: false}
                    },
                    errors: {},
                    hasChanged: false,
                    hasMistake: false
                })
            })
        })
    })
})