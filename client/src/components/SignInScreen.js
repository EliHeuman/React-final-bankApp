// Import FirebaseAuth and firebase.
import React, { useState } from 'react';
import { useCookies, withCookies } from "react-cookie";
import {UserContext} from '../context.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
const axios = require('axios');
// Configure Firebase.
const config = {
  apiKey: "AIzaSyAiqm6BsEMPCsaikajAe1GHqSZn2sCyPEA",
  authDomain: "badbank-app-mit-xpro.firebaseapp.com",
  projectId: "badbank-app-mit-xpro",
  storageBucket: "badbank-app-mit-xpro.appspot.com",
  messagingSenderId: "91504037023",
  appId: "1:91504037023:web:118fd478b73cbcc208a6aa"
};
firebase.initializeApp(config);




function SignInScreen(props) {
  const [authUser, setAuthUser] = useState();
  const [cookies, setCookie] = useCookies(["user"]);
  const ctx = React.useContext(UserContext);
  let expires = new Date();
      expires.setMinutes( expires.getMinutes() + 250 );
  // Configure FirebaseUI.
      const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: "/" ,
        callbacks: {
          signInSuccessWithAuthResult: async (authResult) => {
            const userEmail = authResult.user.email;
            console.log(userEmail);
            let expires = new Date();
            expires.setMinutes( expires.getMinutes() + 250 );
            
            ctx.loginRes.pop();
            ctx.user.pop();
            // const url = `http://localhost:8080/account/find/${userEmail}`;
            const url = `http://165.232.72.24:8080/account/find/${userEmail}`;
            await axios.get(url)
                .then((res) =>{
                  ctx.loginRes.push(res.data);
                  ctx.dispalyName.push(res.data[0].username);
                  console.log(ctx.loginRes[0]);
                }).catch((err) =>{
                  console.log(err);
                }).then(() =>{
                if(ctx.loginRes[0] !== 'User doesn\'t exists'){
                    ctx.user.push(...ctx.loginRes[0]);
                    ctx.auth[0].loggedIn = true;
                    ctx.loginRes[0] = 'Success';
                    setCookie('User', ctx.user[0], { 
                      path: "/",
                      expires,
                    });
                    setCookie('Name', ctx.user[0].username, { 
                      path: "/",
                      expires,
                    });
                    alert("Login successful!");
                  }else{
                    alert("Login failed!");
                  }
                });
                  console.log('loggedIn: ' + ctx.auth[0].loggedIn);
          }
        },
        // We will display Google and Facebook as auth providers.
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
      };
 
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default withCookies(SignInScreen);