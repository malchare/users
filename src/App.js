import React, { Component } from 'react';
import './App.css';
import CurrentUsers from './CurrentUsers';
import AddUser from './AddUser';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faExclamationCircle, faPlusCircle, faCheck, faSort } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes, faExclamationCircle, faPlusCircle, faCheck, faSort)

class App extends Component {

  constructor() {
    super();

    this.state = {
      users: [],
      sort: 'asc',
      param: ''
    }

    this.deleteUserFromList = this.deleteUserFromList.bind(this);
    this.addUserToList = this.addUserToList.bind(this);
    this.sortTable = this.sortTable.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(json => this.setState({ users: json }));
  }

  deleteUserFromList = (id) => {
    const updateUsers = this.state.users.filter(el => el.id !== id)
    this.setState({ 
      users: updateUsers 
    }, () => {this.setId()});
  }

  setId() {
    this.state.users.forEach((user, index) => {
      user.id = index + 1;
    });
  }

  checkEmail(email) {
    let emailExist = false;
    this.state.users.forEach((user, index) => {
        if(user.email === email) {
          emailExist = true;
          return;
        }
    });
    if(emailExist) return false;
    else return true;
  }

  addUserToList = (nameInput, emailInput) => {
    let newID = this.state.users.length + 1;
    let user = {id: newID, name: nameInput, email: emailInput}
    let list = this.state.users;

    list.push(user);
    this.setState({
      users: list
    });
  }

  sortTable() {
    let tableSort;

    if(this.state.sort === 'asc') {
      tableSort = this.state.users.sort((a, b) => a.name > b.name)
    } else {
      tableSort = this.state.users.sort((a, b) => a.name < b.name)  
    }

    this.setState({
      users: tableSort
    });

    if (this.state.sort === 'asc') {
      this.setState({ sort: 'desc' });
    }
    else {
      this.setState({ sort: 'asc' });
    }
  }

  render() {

    const { users } = this.state;

    return (
      <div className="App">
        <div className="container">
          <header className="App-header">
            <div className="web-app">
              <a href="" rel="noopener noreferrer">Users app</a>
            </div>
          </header>
          <div className="app-content">
            <AddUser addUser={users.length >= 10} addUserFunc={this.addUserToList} checkEmail={this.checkEmail}/>
            {users ? <CurrentUsers usersList={users} deleteFunc={this.deleteUserFromList} sort={this.sortTable}/> : 'Loading...'} 
          </div>
        </div>
        <div className="foot">
          <p>&copy; 2018 Małgorzata Charewicz</p>
        </div>
      </div>
 
    );
  }
}

export default App;
