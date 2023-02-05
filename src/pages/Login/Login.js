import React, { useState,useEffect } from "react";
import styles from "./Login.module.css";
import { auth, db } from "../../firebase/config"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, setUserData } from "../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import logo from "../../images/logo.jpg"
import googleLogo from "../../images/google.png"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
  const provider = new GoogleAuthProvider();
const user=useSelector((state)=>state.user.user)


  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async () => {
        dispatch(
          login({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            profilePic: auth.currentUser.photoURL,
          })
        );
      })
      .catch((error) => {
        alert(error);
      });
  };

  const loginEmail = (e) => {
    e.preventDefault();
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)

      .then(() => {
        toast.success("Sucessfully logged in");
        setLoading(false)
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };


  return (
    <>
     <section className={styles.loginOuterCont}>
     <ToastContainer/>
        <div className={styles.leftCont}>
            <div className={styles.brandLogoCont}>
                <img className={styles.brandLogo} src={logo} alt="logo" />
                <p className={styles.brandName}>DSAPL</p>
            </div>
            <div className={styles.leftMidCont}>
                <h1 className={styles.leftMidContTopText}>YOUR DREAM</h1>
                <h1 className={styles.leftMidContBottomText}>OUR RESPONSIBILITY</h1>
            </div>
            <div className={styles.leftBottomCont}>
                <h1 className={styles.leftBottomContTopText}>If you can dream it we can complete it.</h1>
                <h1 className={styles.leftBottomContBottomText}>Because we very well believe in OUR MOTO</h1>
            </div>
        </div>
        <div className={styles.rightCont}>
           <h1 className={styles.rightContHeading}>LOGIN</h1> 
           <button onClick={signInWithGoogle} className={styles.googleBtn}><span className={styles.gIconCont}><img className={styles.gICon} src={googleLogo} alt="gICon" /></span>Log in with google </button>
           <p className={styles.orText}>-OR-</p>
           <form onSubmit={loginEmail} className={styles.form}>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className={styles.input} type="email" name="email" placeholder="Email Address" autocomplete="off" required/>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className={styles.input} type="password" name="email" placeholder="Password" autocomplete="off" required/>
            <button disabled={loading} className={styles.Button} type="submit">Login Now</button>
           </form>
           <p className={styles.randomtext}>Need an account? <Link className={styles.linkk} to="/signup">Sign Up
            </Link></p>
        </div>
     </section>
    </>
  );
}

export default Login;
