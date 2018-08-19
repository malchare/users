import React from 'react';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



class CurrentUsers extends React.Component {

    constructor() {
        super();

        this.state = {
            deletedID: ''
        }
    }

    deleteUser(e, id) {

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        });
        this.props.deleteFunc(id);
        this.setState({deletedID: id}, () => {this.forceUpdate()}); //
    }


    UserFromData = users => {

        const id = users.id;
        const name = users.name;
        const email = users.email;

       return (
            <tr key={id}>
                <th scope="row">{id}</th>
                <td>{name}</td>
                <td>{email}</td>
                <td><a className="removeButton" onClick={(e) => this.deleteUser(e, id)}><FontAwesomeIcon icon="times" color="#b9b9b9"/></a></td>
            </tr>
       );
    }

    render() {
        return (
            <Table className="table-striped">
                <thead className="thead-light">
                    <tr>
                        <th>LP</th>
                        <th>USER</th>
                        <th>E-MAIL</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.usersList.map(this.UserFromData)}
                </tbody>
            </Table>
        );
    }
}

export default CurrentUsers;