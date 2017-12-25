## Form Api

```jsx
import React, {Component} from 'react'
import Form from 'react-form-layer'
import BaseInput from '../../components/BaseInput'


class Example extends Component {

    /*
    * All methods are examples for demonstration and are not required to use
    */

    // HANDLERS
    
    onChange = (formData) => {
        console.log(formData)
    }
    
    onSubmit = (formData) => {
        console.log(formData)
    }
    
    onReset = (formData) => {
        console.log(formData)
    }
    
    
    // PUBLIC API USAGE
    getValues(){
        const formData = this.form.getValues()
        // ...
    }
    
    setValues(){
        const formData = this.form.setValues({
            field1: {value: 123}
        })
        // ...
    }
    
    resetValues(){
        const formData = this.form.resetValues()
        // ...
    }
    
    dropValues(){
        const formData = this.form.dropValues()
        // ...
    }
    
    verify(){
        const formData = this.form.verify()
        // ...
    }

    render() {

        return (
            <Form 
                ref={(instance)=>{
                    // To access the public api Form
                    // need to write reference to the form instance
                    this.form = instance
                }}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                onReset={this.onReset}
            >
                <BaseInput name="field1" />
                <BaseInput name="Field2" />
                <button type="submit">Submit</ button>
                <button type="reset">Reset</ button>
            </Form>
        )
    }

}

export default Example
```

... readme in process