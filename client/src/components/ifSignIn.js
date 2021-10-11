import { withCookies } from "react-cookie";

const axios = require('axios');

  //test if user is logedin
  async function  ifSignIn (props){
    const { ctx } = props;
    let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)Name\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    let sessionEmail = cookieValue.length > 0 ? props.allCookies.User.email : '';
    console.log(sessionEmail);
      if(!ctx.auth[0].loggedIn  && sessionEmail !== ''){
        let expires = new Date();
        expires.setMinutes( expires.getMinutes() + 30 );
        
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
          console.log('loggedIn: ' + ctx.auth[0].loggedIn);
      }
  }

export default withCookies(ifSignIn);