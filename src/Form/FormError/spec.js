import React from 'react'
import {shallow} from 'enzyme'
import FormError from './index'

describe('блок с ошибками FormError', () => {
    const defaultContext = {
        formData: {
            errors: '',
            hasMistake: false
        }
    }

    const setup = (props, context) => {
        const wrapper = shallow(<FormError {...props} />, {
            context: {
                ...context
            }
        })
        const instance = wrapper.instance()

        return {wrapper, props, instance}
    }

    test('сделать snapshot', () => {
        const {wrapper} = setup(null, defaultContext)
        expect(wrapper).toMatchSnapshot()
    })

    test('если функция не передана и есть ошибка, то вызывать renderFirstError', () => {
        const {wrapper, instance} = setup(null, {
            formData: {
                errors: ['error'],
                hasMistake: true
            }
        })
        jest.spyOn(instance, 'renderFirstError')
        wrapper.setProps()
        expect(instance.renderFirstError.mock.calls.length).toBe(1)
    })

    test('если функция не передана и есть ошибка, то вызывать renderFirstError и рендерить первую ошибку', () => {
        const {wrapper, instance} = setup(null, {
            formData: {
                errors: ['error1', 'error2'],
                hasMistake: true
            }
        })
        expect(wrapper.find('.form--globalError')).toMatchSnapshot()
    })

})