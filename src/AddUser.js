import React from 'react';
import Form from "./Form"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AddUser extends React.Component {

    constructor() {
        super ();
        this.state = {
            isHiddenForm: true,
            submitForm: false
        }
        this.showForm = this.showForm.bind(this);
        this.setSubmitForm = this.setSubmitForm.bind(this);

    }

    showForm() {
        if(this.state.isHiddenForm === 'true') this.noSubmitForm();

        this.setState({
            isHiddenForm: !this.state.isHiddenForm
        });

    }

    setSubmitForm() {
        this.setState({
            submitForm: 'true'
        });
    }

    noSubmitForm() {
        this.setState({
            submitForm: 'false'
        });
    }

    infoForm() {
        return (
            <div className="info-list-users"><FontAwesomeIcon icon="exclamation-circle" color="#dc0f0f" /> You can't add new user because of a limit.</div>
        );
    }

    infoAddUser() {
        return (
            <div className="info-list-users"><FontAwesomeIcon icon="check" color="#28a745"/> You have successfully added an user.</div>
        );
    }

    render() {
        return (
            <div id="form-user">
                {this.state.isHiddenForm ? <button type="button" className="btn-add-user btn btn-success" disabled={this.props.addUser} onClick={this.showForm}><FontAwesomeIcon icon="plus-circle"/> Add User</button> : <Form checkEmail={this.props.checkEmail} addUserFunc={this.props.addUserFunc} show={this.showForm} info={this.setSubmitForm}/>}
                {this.state.submitForm && this.state.isHiddenForm ? this.infoAddUser() : ''}
                {this.props.addUser ? this.infoForm() : ''}
            </div>
        );
    }

}

export default AddUser;