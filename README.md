# react-form-layer

A simple solution for organizing work with forms and inputs in React components

## Intro

React is an excellent library for creating SPA applications, 
but one of the recognized problems is working with forms and inputs. 
In each project you are forced to solve the following problems yourself:

* Every input should be made controllable. You must pass handlers and values to the props.
* It is necessary to invent the behavior of errors in the inputs
* We need to come up with a single organization for the work of both native and non-native form fields
* Each time you need to create the same code in forms for collecting data from the inputs, storing
  errors, setting values, collecting data for submit
* Other and other

React-form-layer offers the Forms and the FormInput components to solve all these problems. The advantage of this package is:
* encapsulates a duplicate code
* provides a public api
* allows you to create any custom inputs
* provides a solution of verifications based on pure functions like action creators in the redux

## Docs

* [Creating Inputs](docs/creatingInputs.md)
* [Form Basic Usage](docs/formBasicUsage.md)
* [Form API](docs/formApi.md)
* [FormInput API](docs/formInputApi.md)
* [Verifications](docs/creatingVerifications.md)

## Installation

```
npm install --save react-form-layer
```

## Basic usage

### Step 1 - create and decorate custom inputs

One of the advantages of react-form-layer is that it hides repetitive code and logic, but is sharpened
to work with custom inputs, because in each project, usually its own mechanics and design. Therefore,
the first step is the creation of simple intuitions in the project, for example, like this:

```jsx
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {formInput} from 'react-form-layer'


// The easiest variant required to work with Form and Form Input
class BaseInput extends Component {

    onChange(e) {
        const {value} = e.target

        //formInput passes the handler, you need call it
        this.props.onChange(value)
    }
    
    render(){
        const {value} = this.props
    
        return <input onChange={this.onChange} value={value} />
    }
}

const initialOptions = {
    defaultName: 'textInput',
    defaultValue: '',
    defaultVerification: defVerification // about this later
}

/* 
* After decorating, BaseInput will become fully compatible with the Form component
* You can use an inputs based on both native behavior
* and any other custom implementations not associated with native inputs
 */
export default formInput(initialOptions)(BaseInput)
 
```

### Step 2 - use decorated inputs and Form component

USE!

```jsx
import React, {Component} from 'react'
import Form from 'react-form-layer'
import BaseInput from '../../components/BaseInput'


class Example extends Component {
    
    onSubmit = (formData) => {
        console.log(formData)
    }

    render() {

        return (
            <Form onSubmit={this.onSubmit}>
                <BaseInput name="field1" />
                <BaseInput name="Field2" />
                <button type="submit">Submit</ button>
            </Form>
        )
    }

}

export default Example
```