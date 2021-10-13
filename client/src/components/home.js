import React from 'react';
import { withCookies } from "react-cookie";
import {Card} from '../context';
import badbank from '../images/bank.png';
//Home Component.
function Home(props){

  return (
//Card Component.
  <>
    <Card
      txtcolor="white"
      header="RedRock BadBank"
      
      title="Welcome to RedRock bank"
      text="Eli-HeumanFullStackBankingApplication, You can move around using the navigation bar."
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

export default withCookies(Home);