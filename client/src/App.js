import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import axios from 'axios';
import './index.css';
import { Route, HashRouter } from 'react-router-dom';
import {UserContext} from './context';
import Navbar from './components/navbar.js';
import Home from './components/home.js';
import CreateAccount from './components/createaccount.js';
import AllData from './components/alldata.js';
import Deposit from './components/deposit.js';
import Withdraw from './components/withdraw.js';
import Logout from './components/logout';
import Login from './components/login';
// const apiUrl = `http://localhost:8080`;

  
class App extends Component {

      // async createUser() {
      //   await axios.get(apiUrl + '/user-create');
      //   this.loadUsers();
      // }
    
      // async deleteAllUsers() {
      //   await axios.get(apiUrl + '/users-delete');
      //   this.setState({
      //     users: [],
      //   });
      // }
    
      // async loadUsers() {
      //   const res = await axios.get(apiUrl + '/users');
      //   this.setState({
      //     users: res.data,
      //   });
      // }
    
      // componentDidMount() {
      //   this.loadUsers();
      // }
  render() {
    return (
  //Create routing to all components.
      <HashRouter>
  {/* Create a context provider and a users array to share data in the components. */}
        <UserContext.Provider value={{user:[], loginRes:[], auth:[{ loggedIn: false}], dispalyName :[]}}>
          <Navbar/>
            <Route path= "/" exact component={Home} />
            <Route path= "/alldata" exact component={AllData} />
            <Route path="/login/" component={Login} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/logout/" component={Logout} />
            {/* <NameDisplay/> */}
        </UserContext.Provider>
      </HashRouter>
    );
  }
}

export default App;