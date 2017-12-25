import React, {Component} from 'react'
import TextInput from '../../components/CustomInputExamples/TextInput'
import CheckboxInput from '../../components/CustomInputExamples/CheckboxInput'
import SelectTypeInput from '../../components/CustomInputExamples/SelectTypeInput'
import Button from '../../components/Button'
import Form from '../../../src/Form'

const selectSource = [{
    value: 1,
    label: 'One'
}, {
    value: 2,
    label: 'Two'
}, {
    value: 3,
    label: 'Three'
}]


class Description extends Component {

    // HANDLERS
    onChange = (formData) => {
        console.log('onChange', formData)
    }

    onSubmit = (formData) => {
        console.log('onSubmit', formData)
    }

    onReset = (formData) => {
        console.log('onReset', formData)
    }

    // PUBLIC
    getValues = () => {
        const formData = this.form.getValues()
        console.log('getValues', formData)
    }

    setValues = () => {
        const formData = this.form.setValues({
            text: {
                value: 'blablabla'
            },
            checkbox: {
                value: true
            },
            select: {
                value: selectSource[2]
            }
        })
        console.log('setValues', formData)
    }

    validate = () => {
        const formData = this.form.validate()
        console.log('validate', formData)
    }

    resetValues = () => {
        const formData = this.form.resetValues()
        console.log('resetValues directly', formData)
    }

    dropValues = () => {
        const formData = this.form.dropValues()
        console.log('dropValues directly', formData)
    }

    render() {

        return (
            <div className="demoContent">
                <h3 className="demoTitle">Example</h3>
                <div className="demoDesc">
                    Custom Inputs and Form api example (see console)
                </div>
                <Form
                    ref={(instance) => this.form = instance}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    onReset={this.onReset}
                >
                    <TextInput
                        name="text"
                        placeHolder="TextInput"
                        required
                    />
                    <CheckboxInput
                        name="checkbox"
                        placeHolder="CheckboxInput"
                        label="Checkbox example"
                    />
                    <SelectTypeInput
                        name="select"
                        placeHolder="Select"
                        source={selectSource}
                    />
                    <div className="demoButtons">
                        <Button
                            type="submit"
                            text="save"
                        />
                        <Button
                            type="reset"
                            text="reset"
                        />
                        <Button
                            type="button"
                            text="getValues"
                            onClick={this.getValues}
                        />
                        <Button
                            type="button"
                            text="setValues"
                            onClick={this.setValues}
                        />
                        <Button
                            type="button"
                            text="validate"
                            onClick={this.validate}
                        />
                        <Button
                            type="button"
                            text="reset directly"
                            onClick={this.resetValues}
                        />
                        <Button
                            type="button"
                            text="drop"
                            onClick={this.dropValues}
                        />
                    </div>
                </Form>
            </div>
        )
    }

}

export default Description