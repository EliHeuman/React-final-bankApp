import React from 'react';
import { Card,  UserContext } from '../context';
import badbank from '../images/bank.png';

//Logout Component.

function Logout(){
    const ctx = React.useContext(UserContext);
      // Similar to componentDidMount and componentDidUpdate:
      // const initialState = {user:[], loginRes:[], auth:[{ loggedIn: false}]};
      const logout = () => {
        ctx.user.pop();
        ctx.loginRes.pop();
        ctx.dispalyName.pop();
        ctx.auth[0].loggedIn = false;
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