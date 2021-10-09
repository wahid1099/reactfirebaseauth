import React, {useState} from 'react';
import  initializeAuthentication from './Firebase/firebase.initialize';
import {createUserWithEmailAndPassword,getAuth ,sendEmailVerification,FacebookAuthProvider ,signInWithPopup }from "firebase/auth";
initializeAuthentication();
const auth = getAuth();
const facebookprovider = new FacebookAuthProvider();
const EmailLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError]=useState('');
    const [isLogin, setIsLogin] = useState(false);

    const handleRegistration=(e)=>{
        e.preventDefault();
        if(password.length<6){
            setError('Password Must be at least 6 charecters long');
            return;
        }
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError('Password must contain two upper case');
            return;
        }if(isLogin){

        }
        else{
            registernewuser(email,password);
        }



    }
    //gettting emmail and setting it
    const handleEmailChange=(e)=>{
        setEmail(e.target.value);
        console.log(e.target.value);

    }
    const handlepassChange=(e)=>{
        setPassword(e.target.value);
        console.log(e.target.value);

    }
    //registering new user
    const registernewuser=(email,password)=>{
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                verifyEmail();
                setError('');

                // ...
            })
            .catch((error) => {
                setError(error.message);
                console.log(error)
            });


    }
    const verifyEmail=()=>{
        //send verifacation
        sendEmailVerification(auth.currentUser)
            .then((result) => {
                console.log(result);

                // Email verification sent!
                // ...
            });
    }
const handlefacebookLogin=()=>{
    signInWithPopup(auth, facebookprovider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
         console.log(user)
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            // ...
        })
        .catch((error) => {
         console.log(error)
        });

}
    return (
        <div>
            <form className="container" onSubmit={handleRegistration}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input  type="email" onBlur={handleEmailChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                           placeholder="Enter email" required/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                            else.</small>
                     </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onBlur={handlepassChange} required/>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <div className="row mb-3 text-danger">{error}</div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <button  className="btn btn-primary" onClick={handlefacebookLogin}>FACEBOOK LOG IN</button>
        </div>
    );
};

export default EmailLogin;