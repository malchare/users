import React from 'react';
import FormErrors from './FormErrors'

class Form extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            formErrors: {name: '', email: ''},
            nameValid: false,
            emailValid: false,
            formValid: false
        }

        this.nameInput = React.createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetInputs = this.resetInputs.bind(this);
        this.clear = this.clear.bind(this);
    }

    componentDidMount() {
        this.focusTextInput();
    }

    focusTextInput() {
        this.nameInput.current.focus();
    }

    handleSubmit(event) {
        let name = this.state.name;
        let email = this.state.email;

        if(this.state.formValid) {
            this.props.addUserFunc(name, email);
        }
        event.preventDefault();
    }

    handleUserInput(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({[name]: value}, () => {this.validateField(name, value)}); //
    }

    clear() {
        const name = '';
        const email = '';
        this.setState({name: name, email: email});

        document.getElementById('nameInput').value = '';
        document.getElementById('emailInput').value = '';
    }

    resetInputs() {
        let name = this.state.name;
        let email = this.state.email;
        if(name || email) {
            return (
                <button onClick={this.clear}></button>
            );
        }
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let nameValid = this.state.nameValid;
      
        switch(fieldName) {
            case 'name':
                nameValid = value.toString().length <= 20;
                fieldValidationErrors.name = nameValid ? '' : 'is too long';    
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'invalid';
                break;
            default:
            break;
        }
        
        this.setState({formErrors: fieldValidationErrors, nameValid: nameValid, emailValid: emailValid}, this.validateForm);
      }

    validateForm() {
        this.setState({formValid: this.state.nameValid && this.state.emailValid});
    }

    render() {
        return(
            <div>
            <form onSubmit={this.handleSubmit}>
                <input ref={this.nameInput} id="nameInput" name="name" type="text" placeholder="name" onChange={(event) => this.handleUserInput(event)}/>
                <input id="emailInput" type="email" name="email" placeholder="email" onChange={(event) => this.handleUserInput(event)}/>
                <input disabled={!this.state.formValid} type="submit" value="Submit"/>
                {this.resetInputs()}
            </form>
                <FormErrors formErrors={this.state.formErrors} />
            </div>
        );
    }



}

export default Form;