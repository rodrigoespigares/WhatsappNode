import React, { useState } from 'react'
import { socket } from '../../socket';

import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    FacebookAuthProvider

} from "firebase/auth";
import { auth } from '../../config';
import { Icon } from '@iconify/react';
import './Login.css';
import {useNavigate} from 'react-router-dom'
import lang from './lang/es.js'


let emailRegistro = "";
let emailInicio = "";
let passInicio = "";
let passRegistro = "";
export default function Login() {

let [errores, setErrores] = useState([]);

let navega = useNavigate();
    function iniciaSesionGoogle() {
        setErrores([])
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                socket.emit("login",user);
                navega('/chat');
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                setErrores([...errores, errorMessage])
            });
    }
    function inicioCorreo() {
        
        signInWithEmailAndPassword(auth, emailInicio, passInicio)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                socket.emit("login",user);
                navega('/chat');

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode == "auth/missing-email"){
                    document.getElementById("inicioMail").classList.add("err");
                    setErrores([...errores, "Invalid email"])
                }
                if(errorCode == "auth/invalid-email"){
                    document.getElementById("inicioMail").classList.add("err");
                    setErrores([...errores, "Invalid email"])
                }
                if(errorCode == "auth/invalid-credential"){
                    document.getElementById("inicioMail").classList.add("err");
                    document.getElementById("inicioPass").classList.add("err");
                    setErrores([...errores, "Login error"])
                }
            });
    }

    function registroCorreo() {
        console.log(emailRegistro)
        createUserWithEmailAndPassword(auth, emailRegistro, passRegistro)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
                socket.emit("login",user);
                navega('/chat');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            
                if (errorCode == "auth/weak-password") {
                    document.getElementById("registroPass").classList.add("err");
                    setErrores([...errores, "Password must have more characters"])
                }
                if (errorCode == "auth/invalid-email") {
                    document.getElementById("registroMail").classList.add("err");
                    setErrores([...errores, "Invalid email"])
                }
                if (errorCode == "auth/email-already-in-use") {
                    document.getElementById("registroMail").classList.add("err");
                    setErrores([...errores, "Email in use"])
                }
            });
    }
    function iniciaSesionGitHub() {
        setErrores([])
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
    
            // The signed-in user info.
            const user = result.user;
            socket.emit("login",user);
            navega('/chat');
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            // ...
            setErrores([...errores, errorMessage])
        });
    }
    function iniciaSesionFacebook() {
        setErrores([])
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
    
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
    
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            socket.emit("login",user);
            navega('/chat');
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
            setErrores([...errores, errorMessage])
            // ...
        });
    }

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');


    
    function cambioClase(e) {
        if(e.target.id == 'signUp'){
            e.target.parentElement.parentElement.parentElement.parentElement.classList.add('right-panel-active')
        }else if(e.target.id == 'signIn'){
            e.target.parentElement.parentElement.parentElement.parentElement.classList.remove('right-panel-active')
        }
        
    }
    
  return (
    
        <section id="login__register">
        <div className="container" id="container">
            <div className="form-container sign-up-container">
                <div className="form">
                    <h1>{lang.register.title}</h1>
                    <div className='alert alert-danger' hidden={!errores.length>0}>
                        <h2>Error</h2>
                        {errores}
                    </div>
                    <div className="social-container">
                        <button onClick={iniciaSesionGoogle} type="button" className="social">
                            <Icon icon="mingcute:google-fill" />
                        </button>
                        <button onClick={iniciaSesionFacebook} type="button" className="social">
                            <Icon icon="bxl:facebook" />
                        </button>
                        <button onClick={iniciaSesionGitHub} type="button" className="social">
                            <Icon icon="fluent-mdl2:git-hub-logo" />
                        </button>
                    </div>
                    <span>{lang.register.subtitle}</span>
                    <input type="text" placeholder={lang.register.input.name} />
                    <input id='registroMail' type="email" placeholder={lang.register.input.mail} onChange={(e) => {
                      emailRegistro = e.target.value;
                      console.log(emailRegistro)
                      setErrores([])
                      document.getElementById("registroMail").classList.remove("err")
                    }}/>
                    <input id='registroPass' type="password" placeholder={lang.register.input.pass} onChange={(e) => {
                      passRegistro = e.target.value;
                      setErrores([])
                      document.getElementById("registroPass").classList.remove("err")
                    }}/>
                    <button onClick={registroCorreo} className="buttons">{lang.register.btn}</button>
                </div>
            </div>
            <div className="form-container sign-in-container">
                <div className="form">
                    <h1>{lang.login.title}</h1>
                    <div className='alert alert-danger' hidden={!errores.length>0}>
                        <h2>Error</h2>
                        {errores}
                    </div>
                    <div className="social-container">
                        <button onClick={iniciaSesionGoogle} type="button" className="social">
                            <Icon icon="mingcute:google-fill" />
                        </button>
                        <button onClick={iniciaSesionFacebook} type="button" className="social">
                            <Icon icon="bxl:facebook" />
                        </button>
                        <button onClick={iniciaSesionGitHub} type="button" className="social">
                            <Icon icon="fluent-mdl2:git-hub-logo" />
                        </button>
                    </div>
                    <span>{lang.login.subtitle}</span>
                    <input id='inicioMail' type="email" placeholder={lang.login.input.mail} onChange={(e) => {
                        emailInicio = e.target.value;
                        setErrores([])
                        document.getElementById("inicioMail").classList.remove("err")
                    }}/>
                    <input id='inicioPass' type="password" placeholder={lang.login.input.pass} onChange={(e) => {
                        passInicio = e.target.value;
                        setErrores([])
                        document.getElementById("inicioPass").classList.remove("err")
                    }}/>
                    <button onClick={inicioCorreo} className="buttons">{lang.login.btn}</button>
                </div>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                    <h1>{lang.content.p1.title}</h1>
                        <p>
                        {lang.content.p1.subtitle}
                        </p>
                        <button onClick={cambioClase} className="buttons ghost" id="signIn">{lang.content.p1.btn}</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                    <h1>{lang.content.p2.title}</h1>
                    <p>{lang.content.p2.subtitle}</p>
                    <button onClick={cambioClase} className="buttons ghost" id="signUp">{lang.content.p2.btn}</button>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}
