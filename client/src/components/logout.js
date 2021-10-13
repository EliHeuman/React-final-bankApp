import React from 'react';
import { Card,  UserContext } from '../context';
import badbank from '../images/bank.png';
import firebase from 'firebase/app';
import 'firebase/auth';

//Logout Component.

function Logout(){
    const ctx = React.useContext(UserContext);
    let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)Name\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      // Similar to componentDidMount and componentDidUpdate:
      let isLoggedIn = ctx.auth[0].loggedIn;
      console.log(ctx.auth[0].loggedIn);
      if(isLoggedIn || cookieValue.length > 0 ){
       window.location.reload(true);
        }

        function deleteAllCookies() {
          var cookies = document.cookie.split(";");
      
          for (var i = 0; i < cookies.length; i++) {
              var cookie = cookies[i];
              var eqPos = cookie.indexOf("=");
              var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
              document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
          }
      }
      const logout = () => {
        ctx.user.pop();
        ctx.loginRes.pop();
        ctx.dispalyName.pop();
        ctx.auth[0].loggedIn = false;
        deleteAllCookies();
        firebase.auth().signOut();
      };
      logout();
  return (
//Card Component.
  <>
    <Card
      txtcolor="white"
      header="RedRock bank Logout Page"
      
      title="You logged out successfully."
      bgcolor="dark"
      body={( <>
        <img 
          style={{
            display:     "block",
            marginLeft:  "auto",
            marginRight: "auto"}
          }
          src={badbank} 
          className='figure-img img-fluid rounded shadow-3 mb-3' 
          alt="Responsive"
        />
    </>
      )}
      />
  </> 
  ); 
};

export default Logout;