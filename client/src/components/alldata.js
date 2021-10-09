import React from 'react';
import {Card} from '../context';
import Table from 'react-bootstrap/Table';
import {UserContext} from '../context.js';
//AllData Component.
function AllData(){
  const ctx = React.useContext(UserContext);
  let val = [ctx.user];
  let arr =[...val];

  return (
  //return Card Component
    <>
      <Card
        header="All Data in Store"
        body={
//if log in is successful show component
        ctx.auth[0].loggedIn ? ( 
//Table inside the card Component displays all account data from Create Account component.
          <Table striped bordered hover variant="dark" >
            <thead>
              <tr>
                <th>First Name</th>
                <th>Email</th>
                <th>Account Balance</th>
                <th>Account Password</th>
              </tr>
            </thead>
            <tbody>
            {arr.map((user) =>( 
              user.map((item) =>(
                <tr>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.balance}</td>
                  <td>{item.password}</td>
                </tr>
              
            ))))}
            </tbody>
          </Table>
          ):(
                <h3>You are not logged in.<br/>
                  First log in to show your account status</h3>
            )
        }
      />            
    </>
  );
}

export default AllData;