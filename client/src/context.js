//This Context page is for components that get used in more than one place.
import React from 'react';
import 'bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
const UserContext = React.createContext(null);
const axios = require('axios');



//ATM is the banking interface component.
function ATM(props) {
  return (
        <label>
          <InputGroup className="mb-3">
          <InputGroup.Prepend >
            <InputGroup.Text  >$0</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
          id="number-input" onChange={props.onChange}
          />
          </InputGroup>
          <Button size="sm" onChange={props.onChange} style={{float: 'right'}} className="btn btn-dark" type="submit" margin="150" value="Submit" id="submit-input" disabled={props.validTransaction}>{props.btnText}</Button>
        </label>
  );
};

//Account is the banking calculation component.
function Account(props) {
  const {ctx , depositStatus} = props;
  let accountBalance = ctx.user[0].balance;
  const [deposit, setDeposit] = React.useState('');
  const [totalState, setTotalState] = React.useState(accountBalance);
  const [isDeposit, setIsDeposit] = React.useState(depositStatus);
  const [validTransaction, setValidTransaction] = React.useState(true);
  const [success, setSuccess] = React.useState(true);
  let status = `Account Balance $ ${totalState} `;
//btnText depends on the Deposit or Withdraw component.
  let btnText = isDeposit ? 'Deposit' : 'Withdraw';

//Checks validity of users input.  
  function handleChange(event) {
//Checks for a number and then sets setDeposit.
    if (isNaN(Number(event.target.value))){
        return(alert("Not a Number!")
      );
    };

    setDeposit(Number(event.target.value));
//Checks if balance is sufficient.
    let isValid = (isDeposit ? totalState + Number(event.target.value) : totalState - Number(event.target.value));
    if (isValid < 0 ) alert("The balance is to low in your account!");
    console.log(`isDeposit ${isDeposit}`);
    console.log(`totalState ${totalState}`);
    console.log(`deposit ${deposit}`);
    console.log(`isValid ${isValid}`);
    setValidTransaction(((isValid < 0) || (event.target.value.length < 1)) ? true : false);
  };
//submits users input to the context.
  function handleSubmit(event) {
//checks if users entered a negative number on submit.
    if(deposit < 0) {
      return (alert(`Can not ${btnText} a negative number`));

    };
//Calculates and sets new account total. 
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    ctx.user[0].balance = newTotal;
    balanceUpdate();
    event.preventDefault();
    setValidTransaction(newTotal- deposit < 0 ? true : false );
    setSuccess(true);
    clearForm();
    setDeposit(0)
  };

//update DB
async function balanceUpdate (){
  console.log(`balanceUpdate props + ${ctx.user[0].balance}`);
  const amount = ctx.user[0].balance;
  const email  = ctx.user[0].email;
  const url = `http://localhost:8080/update/${email}/${amount}`;
  // const url = `http://165.232.72.24:8080/update/${email}/${amount}`;        
                await axios.get(url)
                .then((res) =>{
                  console.log(res);
                }).catch((err) =>{
                  console.log(err);
                });
    
     return ;

}
//clears form.
  function clearForm () {
    setSuccess(!success);
    setValidTransaction(true);
  };

  return (
    // Changes between success message and Deposit\ Withdraw ATM.
    success ? (  
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <h4>{btnText} Amount</h4> 
      <ATM btnText={btnText} onChange={handleChange} isDeposit={isDeposit}  validTransaction={validTransaction} ></ATM>
    </form>
    ):(
      <div>
        <h5>{btnText} Success, <br></br> Your balance is {totalState}</h5>
        
        <button variant="outline-success" type="submit" className="btn btn-light" onClick={clearForm}>{btnText}</button>
      </div>
    )
  );
};

//Card component.
function Card(props){
//Sets bootstrap className.
    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      return 'card mb-3 ' + bg + txt;
    }
  
    return (
      <div className={classes()} style={{Width: "30rem", maxWidth: "50%", float:"none" , margin: "0 auto",   position: "relative",
      top: "2rem" }}>
        <div className="card-header">{props.header}</div>
        <div className="card-body">
          {props.title && (<h5 className="card-title">{props.title}</h5>)}
          {props.text && (<p className="card-text">{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
        </div>
      </div>      
    );    
};


//export components
export {Card, UserContext, ATM, Account};
