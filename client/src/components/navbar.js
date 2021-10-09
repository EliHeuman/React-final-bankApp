import React from 'react';
import Nav from 'react-bootstrap/Nav';
import ReactTooltip from 'react-tooltip';
import Button from 'react-bootstrap/Button';
import {UserContext, NameDisplay} from '../context.js';

//Navbar Component.
function NavBar(props){
  const ctx = React.useContext(UserContext);
  // const [show, setShow] = useState(true);
  // useEffect(()=>{
  //   setShow(ctx.auth[0].loggedIn);
  // },[ctx.auth,show]);
  return(
  //Navbar usinng Bootstrap.
    <Nav variant="pills"  className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Nav.Item >
        <Button className="navbar-brand" href="#/">
          BadBank
        </Button>
      </Nav.Item>
{/* Home page button */}
        <Nav.Link data-tip data-for="home" href="#/" >
          Home Page
            <ReactTooltip id="home" place="top" effect="solid">
              Welcome to RedRock bank page
            </ReactTooltip>
        </Nav.Link>
{/* Withdraw button */}
        <Nav.Link data-tip data-for="login" href="#/login/" >
          Login
            <ReactTooltip id="login" place="top" effect="solid">
              Here you can Login to your account
            </ReactTooltip>
        </Nav.Link>)    
{/* Create Account button */}
        <Nav.Link data-tip data-for="createaccount" href="#/CreateAccount/" >
          Create Account
            <ReactTooltip id="createaccount" place="top" effect="solid">
              Here you can create a new account
            </ReactTooltip>
        </Nav.Link>
{/* Deposit button */}
        <Nav.Link data-tip data-for="deposit" href="#/deposit/" >
          Deposit
            <ReactTooltip id="deposit" place="top" effect="solid">
              Here you can deposit money into your account
            </ReactTooltip>
        </Nav.Link>
{/* Withdraw button */}
        <Nav.Link data-tip data-for="withdraw" href="#/withdraw/" loggedIn={ctx.auth[0].loggedIn} >
          Withdraw
            <ReactTooltip id="withdraw" place="top" effect="solid">
              Here you can deposit withdraw from your account
            </ReactTooltip>
        </Nav.Link>
{/* All Data button */}
        <Nav.Link data-tip data-for="allData" href="#/alldata/" >
          All Data
            <ReactTooltip id="allData" place="top" effect="solid">
              Here you can see all data for new accounts
            </ReactTooltip>
        </Nav.Link>
{/* User logout */}
        <Nav.Link data-tip data-for="logout" href="#/logout/" >
                  Logout
                    <ReactTooltip id="logout" place="top" effect="solid">
                      Here you can logout from your account
                    </ReactTooltip>
                </Nav.Link>
        {/* User name */}
          <Nav.Item className="pull-right" >
            <NameDisplay  dispalyName={ctx.dispalyName}/>
          </Nav.Item>
        </Nav>

    
  );
}

export default NavBar;