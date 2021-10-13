import React from 'react';
import {Card} from '../context';
import {UserContext} from '../context.js';

//badgoogle auth
function FaildToSignIn (){
    const ctx = React.useContext(UserContext);
    setTimeout(window.location.reload(true),3000);
    return(
      <Card
          txtcolor="white"
          header="Login"
          
          title="User dosent exist try to creat a new account"
          bgcolor="dark"
          body={ 
                    <div>
                  <h3>Welcom to BadBank you are logged in.<br/>
                   First log out before try to create a new account</h3>
                   <h5>{`${ctx.loginRes[0]}`}</h5>
                  </div>
            
            }
        />
    )
};
export default FaildToSignIn;