import React, { Component } from 'react';
import logo from './logo.svg';
import logounamo from './assets/logo-unamo-main.svg';
import './App.css';
import CurrentUsers from './CurrentUsers';
import AddUser from './AddUser';

import { library } from '@fortawesome/fontawesome-svg-core'
import {faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes)

class App extends Component {

  constructor() {
    super();

    this.state = {
      users: [],
      sort: 'asc'
    }

    this.deleteUserFromList = this.deleteUserFromList.bind(this);
    this.addUserToList = this.addUserToList.bind(this);
    this.sortowanie = this.sortowanie.bind(this);
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
    console.log(this.state.users);
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

  sortowanie() {
    //console.log("ssssss");
    if(this.state.sort === 'asc')
    {
      const tableSort = this.state.users.sort((a, b) => a.name > b.name)
      this.setState({
        users: tableSort,
      });

    } else {
      const tableSort = this.state.users.sort((a, b) => a.name < b.name)
      this.setState({
        users: tableSort,
      });
    }

    if (this.state.sort === 'asc') this.setState({ sort: 'desc' })
    else this.setState({ sort: 'asc' })
    //console.log(table);
  }

  render() {

    const { users } = this.state;

    return (
      <div className="App">
       
        <header className="App-header">
          <img className="logo-unamo" src={logounamo} alt="logo" title="logo unamo"/>
          <div className=""></div>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <AddUser addUser={users.length <= 10} addUserFunc={this.addUserToList}/>
          {users ? <CurrentUsers usersList={users} deleteFunc={this.deleteUserFromList}/> : 'Loading...'} 

          <button onClick={this.sortowanie}></button>
        </div>
      </div>
 
    );
  }
}

export default App;
