import React from 'react';
import { Card,  UserContext } from '../context';
import badbank from '../images/bank.png';
import cookie from 'react-cookies';

//Logout Component.

function Logout(){
    const ctx = React.useContext(UserContext);
    let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)Name\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      // Similar to componentDidMount and componentDidUpdate:
      // const initialState = {user:[], loginRes:[], auth:[{ loggedIn: false}]};
      let isLoggedIn = ctx.auth[0].loggedIn;
      console.log(ctx.auth[0].loggedIn);
      if(isLoggedIn || cookieValue.length > 0 ){
       window.location.reload(true);
        }
      const logout = () => {
        ctx.user.pop();
        ctx.loginRes.pop();
        ctx.dispalyName.pop();
        ctx.auth[0].loggedIn = false;
        cookie.remove('User', { path: '/' });
        cookie.remove('Name', { path: '/' });
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
      body={( 
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
      )}
      />
  </> 
  ); 
};

export default Logout;