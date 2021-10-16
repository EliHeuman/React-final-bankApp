import React, { useEffect } from 'react';
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
import SignInScreen from './components/SignInScreen';
import FaildToSignIn from './components/Faildsignin';
function App (){
  const  getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  console.log(getCookie('User'));

      useEffect(() => {
        // POST request using axios inside useEffect React hook
        console.log('testApp');
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    return (
  //Create routing to all components.
      <HashRouter>
  {/* Create a context provider and a users array to share data in the components. */}
        <UserContext.Provider value={{user:[], loginRes:[], auth:[{ loggedIn: false}], dispalyName :[]}}>
          <Navbar />
          <Route path= "/Eli-HeumanFullStackBankingApplication"              exact component={Home} />
            <Route path= "/"              exact component={Home} />
            <Route path= "/alldata"       exact component={AllData} />
            <Route path="/login/"         exact component={Login} />
            <Route path="/CreateAccount/" exact component={CreateAccount} />
            <Route path="/deposit/"       exact component={Deposit} />
            <Route path="/withdraw/"      exact component={Withdraw} />
            <Route path="/logout/"        exact component={Logout} />
            <Route path="/SignInScreen/"  exact component={SignInScreen} /> 
            <Route path="/faildToSignIn/"  exact component={FaildToSignIn} />  
        </UserContext.Provider>
      </HashRouter>
    )
  }


export default App;