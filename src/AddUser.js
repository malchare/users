import React from 'react';
import Form from "./Form"

class AddUser extends React.Component {

    constructor() {
        super ();
        this.state = {
            isHiddenForm: true
        }
        this.showForm = this.showForm.bind(this);
    }

    showForm() {
        this.setState({
            isHiddenForm: !this.state.isHiddenForm
        });
    }

    render() {
        return (
            <div id="form-user">
                <button disabled={!this.props.addUser} onClick={this.showForm}>Add User</button>
                {this.props.addUser ? <div className="info-list-users">You can't add new user because of limit</div> : ''}
                {this.state.isHiddenForm ? null : <Form addUserFunc={this.props.addUserFunc}/>}
            </div>
        );
    }

}

export default AddUser;