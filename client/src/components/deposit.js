import React from 'react';
import {Card} from '../context';
import {UserContext} from '../context.js';
import {Account} from '../context';
 
//Create Deposit Component.
function Deposit(){
// ctx has users data as context.
  const ctx = React.useContext(UserContext);

  
  return (
//Card Component.
    <>
      <Card
          header="Deposit" 
          bgcolor="dark"     
          body={
//if logedin pass props
            ctx.auth[0].loggedIn ? (
// Account Component with depositStatus set to true.
                <Account
                  ctx = {ctx}
                  depositStatus = {true}
               />
               ):(
                    <h3>Log in first to deposit to your account</h3>
                  )
          }
        />
    </>
  )
}  


export default Deposit;