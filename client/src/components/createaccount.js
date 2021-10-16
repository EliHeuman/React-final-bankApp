import React, { useEffect } from 'react';
import { useCookies, withCookies } from "react-cookie";
import {Card, UserContext} from '../context';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
const axios = require('axios');


//CreateAccount Component.
function CreateAccount(props){
  const ctx = React.useContext(UserContext);
  const [show, setShow]         = React.useState(ctx.auth[0].loggedIn ? false : true );
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [validButton, setvalidButton] = React.useState(true);
  const [cookies, setCookie] = useCookies(["user"]);

  //test if user is logedin
  let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)Name\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  let sessionEmail = cookieValue.length > 0 ? props.allCookies.User.email : '';
  console.log(sessionEmail);
  useEffect(()=>{
      if(!ctx.auth[0].loggedIn  && sessionEmail !== ''){
        async function ifSignIn() {
        let expires = new Date();
        expires.setMinutes( expires.getMinutes() + 250 );
        
        ctx.loginRes.pop();
        ctx.user.pop();
        // const url = `http://localhost:8080/account/find/${sessionEmail}`;
        const url = `http://165.232.72.24:8080/account/find/${sessionEmail}`;
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


// Validation for the name state.
  function nameValidation(fieldName, fieldValue) {
    if (fieldValue.trim() === '') {
      setStatus( `Error: ${fieldName} is required`);
      return alert(`${fieldName} is required`);
    }
    return true;
  }
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
async function handleCreate() {
  // console.log(name,email,password);
    let expires = new Date();
    expires.setMinutes( expires.getMinutes() + 30 );
    if (
        nameValidation('Name', name) &&
        emailValidation(email      ) &&
        passwordValidation(password)
    ){
      ctx.loginRes.pop();
     // console.log(name,email,password);
      // const url = `http://localhost:8080/account/create/${name}/${email}/${password}`;
      // const  url2 = `http://localhost:8080/account/find/${email}`;
      const url = `http://165.232.72.24:8080/account/create/${name}/${email}/${password}`;
      const  url2 = `http://165.232.72.24:8080/account/find/${email}`;
      const testFetch = async () => {
        await axios.post(url)
            .then((res) =>{
              ctx.loginRes.push(res.data);
              console.log(ctx.loginRes[0]);
            }).catch((err) =>{
              console.log(err);
            }).then(async () =>{
              if(ctx.loginRes[0] === 'Success'){
              const  getUser = async () =>{
                // Make a request for a user with a given email
                await axios.get(url2)
                  .then(function (response) {
                    // handle success
                    ctx.user.push(...response.data);
                    setCookie('User', ctx.user[0], { 
                      path: "/",
                      expires
                    });
                    console.log(response);
                  })
                  .catch(function (error) {
                    // handle error
                    console.log(error);
                  })
                  .then(function () {
                    // always executed
                    ctx.auth[0].loggedIn = true;
                    setCookie('Name', ctx.user[0].username, { 
                      path: "/",
                      expires,
                    });
                  });
                };
                  // const res = await  axios.get(url2).catch((err) =>{
                    getUser();
              }
            });
          };
          testFetch();
       console.log('response: ' + ctx.loginRes);
       console.log('loggedIn: ' + ctx.auth[0].loggedIn);
       setShow(false);
     } 
     return ;
  }    
//Clears form data.
  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  //Disables and enables the submit button.
  function handleChange (props){
    if(props.id === 'name') setName(props.value);
    if(props.id === 'email') setEmail(props.value);
    if(props.id === 'password') setPassword(props.value);
    if(props.value !== '')setvalidButton(false);
    if(props.id === 'name' && props.value === '') setvalidButton((email === '') && (password === '') ? true : false);
    if(props.id === 'email' && props.value === '') setvalidButton((name === '') && (password === '') ? true : false);
    if(props.id === 'password' && props.value === '') setvalidButton((email === '') && (name === '') ? true : false);
    }
  return (
    <Card
      header="Create Account"
      status={status}
      body={ 
//if log in is successful show component
          show ? ( 
            <form>
              <InputGroup className="mb-3">
                <Col xs="5">
                  <InputGroup.Prepend> 
                    <InputGroup.Text  >Name</InputGroup.Text>
                  </InputGroup.Prepend> 
                  <FormControl
                    type="input"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e)=>handleChange(e.target)}
                
                  />
                </Col>
              </InputGroup>
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
                onClick={handleCreate}
              >
                Create Account
              </Button>        
            </form> 
              ):(!ctx.auth[0].loggedIn ? ( 
                <div>
                {/* Success */}
                <h5>{`${ctx.loginRes}`}</h5>
                <Button
                  variant="outline-secondry"
                  type="submit"
                  className="btn btn-dark"
                  onClick={clearForm}
                >
                  Add an account
                </Button>
                </div>
              ):(
                  <div>
                  <h3>Welcom to BadBank you are logged in.<br/>
                   First log out before try to create a new account</h3>
                   <h5>{`${(ctx.loginRes[0] ? ctx.loginRes[0] : '')}`}</h5>
                  </div>
              )
              )}
    />
  )
}

export default withCookies(CreateAccount);