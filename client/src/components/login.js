import React, { useEffect }from 'react';
import { useCookies, withCookies } from "react-cookie";
import {Card, UserContext} from '../context';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
import SignInScreen from './SignInScreen.js'; 
const axios = require('axios');



//CreateAccount Component.
function Login(props){
  const ctx = React.useContext(UserContext);
  const [show, setShow]               = React.useState(ctx.auth[0].loggedIn ? false : true);
  const [status, setStatus]           = React.useState('');
  const [email, setEmail]             = React.useState('');
  const [password, setPassword]       = React.useState('');
  const [validButton, setvalidButton] = React.useState(false);
  const [cookies, setCookie] = useCookies(["user"]);
   //test if user is logedin
   let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)Name\s*\=\s*([^;]*).*$)|^.*$/, "$1");

   let sessionEmail = cookieValue.length > 0 ? props.allCookies.User.email : '';
   let googleEmail  = cookieValue.length > 0 ? props.allCookies.Email : '';
   console.log(sessionEmail);

   useEffect(()=>{
    if(!ctx.auth[0].loggedIn  && (sessionEmail !== '' || googleEmail !== '') ){
      async function ifSignIn() {
      let expires = new Date();
      expires.setMinutes( expires.getMinutes() + 250 );
      
      ctx.loginRes.pop();
      ctx.user.pop();
      const url = `http://localhost:8080/account/find/${sessionEmail}`;
      // const url = `http://165.232.72.24:8080/account/find/${sessionEmail}`;
      await axios.get(url)
      .then((res) =>{
        ctx.user.push(...res.data);
      }).catch((err) =>{
        console.log(err);
      });
        ctx.auth[0].loggedIn = true;
        setShow(false);
        console.log('loggedIn: ' + ctx.auth[0].loggedIn);
      }
      ifSignIn();
    }
},[]);  


// Validation for the email state.
  function emailValidation(email) {
    if (email.trim() === '') {
      setStatus('Error: Email is required');
      return  alert('Email is required');
    }
    return true;
  }
// Validation for the password state.
  function passwordValidation(password) {
    if (password.length < 8) {
      setStatus('Error: The password is not long enough.');
      return   alert('The password is not long enough (it needs at least eight characters).');
    }
    return true;
  }
//Validate and submit account data.
async function handleLogin() {
    setTimeout(() => setStatus(''),4000);
    let expires = new Date();
    expires.setMinutes( expires.getMinutes() + 30 );
    if (
        emailValidation(email      ) &&
        passwordValidation(password)
    ){
                ctx.loginRes.pop();
                const url = `http://localhost:8080/account/signin/${email}//${password}`;
                // const url = `http://165.232.72.24:8080/account/signin/${email}/${password}`;
                await axios.get(url)
                .then((res) =>{
                  ctx.loginRes.push(res.data);
                  setCookie('User', res.data[0], { 
                    path: "/",
                    expires,
                  });
                  ctx.dispalyName.push(res.data[0].username);
                  console.log(ctx.loginRes[0]);
                }).catch((err) =>{
                  console.log(err);
                }).then(() =>{
                if(ctx.loginRes[0] !== 'User doesn\'t exists'){
                    ctx.user.push(...ctx.loginRes[0]);
                    ctx.auth[0].loggedIn = true;
                    ctx.loginRes[0] = 'Success';
                    setCookie('Name', ctx.user[0].username, { 
                      path: "/",
                      expires,
                    });
                  }
                });
                  console.log('loggedIn: ' + ctx.auth[0].loggedIn);
                  setShow(false);
    }
     return ;
}    
//Clears form data.
  function clearForm(){
    setEmail('');
    setPassword('');
    setShow(true);
  }

  //Disables and enables the submit button.
  function handleChange (props){
    if(props.id === 'email') setEmail(props.value);
    if(props.id === 'password') setPassword(props.value);
    }
  return (<>
    <Card
      header="Login"
    //   title="Login to your account"
      status={status}
      body={ 
//if log in is successful show component
        show ? ( <>
          <form>
            <InputGroup className="mb-3" >
              <Col xs="5" >
                <InputGroup.Prepend> 
                  <InputGroup.Text  >Email</InputGroup.Text>
                </InputGroup.Prepend> 
                <FormControl
                  type="input"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e)=>handleChange(e.target)}
                />
              </Col>
            </InputGroup>
            <InputGroup className="mb-3">
              <Col xs="5">
                <InputGroup.Prepend> 
                  <InputGroup.Text  >Password</InputGroup.Text>
                </InputGroup.Prepend> 
                <FormControl
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e)=>handleChange(e.target)}
                />
              </Col>
            </InputGroup>   
            <Button
              size="sm"
              style={{float:'left',  margin: "15px"}}
              className="btn btn-dark" type="submit"
              value="Submit" id="submit-input"
              disabled={validButton}
              onClick={handleLogin}
            >
              Login
            </Button>       
          </form> 
              <SignInScreen/>
              </>
            ):(!ctx.auth[0].loggedIn ? ( 
              <div>
              <h5>{`${ctx.loginRes}`}</h5>
              <Button
                variant="outline-secondry"
                type="submit"
                className="btn btn-dark"
                onClick={clearForm}
              >
                Try to login again
              </Button>
              </div>
            ):(
                  <div>
                  <h3>Welcom to BadBank you are logged in.<br/>
                   First log out before try to login</h3>
                   </div>
              )
            )
        }
      />
    </>
  )
}

export default withCookies(Login);