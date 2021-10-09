import React from 'react';
import {Card, UserContext} from '../context';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
const axios = require('axios');

//CreateAccount Component.
function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [validButton, setvalidButton] = React.useState(true);
  const ctx = React.useContext(UserContext);
  // const response = [];
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
    setTimeout(() => setStatus(''),4000);
    if (
        nameValidation('Name', name) &&
        emailValidation(email      ) &&
        passwordValidation(password)
    ){
     // console.log(name,email,password);
      const url = `http://localhost:8080/account/create/${name}/${email}/${password}`;
     
          // var res  = await fetch(url);
          // var data = await res.json();    
          // console.log(data);
        await axios.get(url)
            .then((res) =>{
              ctx.loginRes.push(res.data);
              ctx.dispalyName.push(res.data[0].username);
            }).catch((err) =>{
              console.log(err);
            }).then(async () =>{
              if(ctx.loginRes[0] === 'Success'){
                // ctx.user.pop();
                const url = `http://localhost:8080/account/find/${email}`;
                
                await  axios.get(url)
                        .then((res) =>{
                          ctx.dispalyName.push(res.data[0].username);
                          ctx.loginRes.push(res.data);
                          ctx.user.push(res.data[0]);
                          ctx.loginRes.pop();
                        }).catch((err) =>{
                          console.log(err);
                        });
                ctx.auth[0].loggedIn = true;
              }
            });
       console.log('response: ' + ctx.loginRes);

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
    ctx.loginRes.pop();
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
        !ctx.auth[0].loggedIn ? ( 
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
                    type="input"
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
              ):(
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
              )
              ):(
                  <div>
                  <h3>Welcom to BadBank you are logged in.<br/>
                   First log out before try to create a new account</h3>
                   <h5>{`${ctx.loginRes}`}</h5>
                  </div>
              )
              }
    />
  )
}

export default CreateAccount;