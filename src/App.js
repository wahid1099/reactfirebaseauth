import logo from './logo.svg';
import './App.css';
import { GoogleAuthProvider,getAuth, signInWithPopup,signOut,GithubAuthProvider  } from "firebase/auth";
import  initializeAuthentication from './Firebase/firebase.initialize';
import {useState} from "react";
import EmailLogin from "./EmailLogin";
initializeAuthentication();
const provider = new GoogleAuthProvider();
const githubprovider = new GithubAuthProvider();


function App() {
    const [user,setUser]=useState({});
    const auth = getAuth();
    const handleGooglesingIn=()=>{
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
               const {displayName, email, photoURL}=result.user;
               console.log(result);
               const  loggedInusr={
                   name:displayName,
                   email:email,
                   photo:photoURL
               };
               setUser(loggedInusr);
            }).catch((error) => {
            console.log(error)

        });
    }

    const handleSignout = ()=>{
        signOut(auth)
            .then(()=>{
                setUser({});
            })

    }
    const handleGithubLogIn=()=>{
        signInWithPopup(auth, githubprovider)
            .then((result) => {
                const {displayName, email, photoURL}=result.user;
                const loggedInuser={
                    name:displayName,
                    email:email,
                    photo:photoURL
                };
                setUser(loggedInuser);
                console.log(user)



            }).catch((error) => {
          console.log(error)
        });

    }
  return (
    <div className="App">
        {!user.name ?
            <div>
                <button onClick={handleGooglesingIn}>Google log in</button>
                <button onClick={handleGithubLogIn}>Github Sing In</button>
            </div>:
            <button onClick={handleSignout}>Singout</button>


        }

        <br/>
        {
            user.name && <div>
                <h2>Welcome {user.name}</h2>
                <p>Your email is {user.email}</p>
                     <img src={user.photo} alt="user photo"/>
            </div>
        }


        <EmailLogin></EmailLogin>
    </div>
  );
}

export default App;
