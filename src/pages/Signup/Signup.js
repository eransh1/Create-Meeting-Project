import React, { useState } from "react";
import styles from "./Signup.module.css";
import { auth } from "../../firebase/config"
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { create } from "../../redux/newUserSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.jpg"
import googleLogo from "../../images/google.png"

function Signup() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("Individual");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch();

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        dispatch(
          create({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            profilePic: auth.currentUser.photoURL,
            userType: userType,
            loginType: "google",
          })
        );
      })
      .then(() => {
        navigate("/dashboard")
      })
      .catch((error) => {
        alert(error);
      });
  };

  const signUpEmail = (e) => {
    e.preventDefault();
    setLoading(true)
    if(password.length<6){toast.error("Password should be min 6 letters");return}
    if (password === confirmPassword) {
      const newUser={
        name:null,
        email: email,
        userType,
        password,
      }
      createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then(() => {
        dispatch(create({ newUser }));
      }).then(()=>{
        toast.success("Successfully Registered")
        setLoading(false)
      })
      .then(() => {
      
          navigate("/");
       
        
      }).catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <>
       <section className={styles.loginOuterCont}>
       <ToastContainer/>
        <div className={styles.leftCont}>
            <div className={styles.brandLogoCont}>
                <img className={styles.brandLogo} src={logo} alt="" />
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
           <h1 className={styles.rightContHeading}>SIGNUP</h1> 
           <button onClick={signInWithGoogle} className={styles.googleBtn}><span className={styles.gIconCont}><img className={styles.gICon} src={googleLogo} alt="gICon" /></span>Sign up with google </button>
           <p className={styles.orText}>-OR-</p>
           <form onSubmit={signUpEmail} className={styles.form}>
             <input
             className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Your E-Mail"
                required
                autocomplete="off"
              />
              <input
              className={styles.input}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter a password"
                required
                autocomplete="off"
              />
               <input
               className={styles.input}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                placeholder="Confirm Password"
                required
                autocomplete="off"
              />



            <button disabled={loading} className={styles.Button} type="submit">Sign Up</button>
           </form>
           <p className={styles.links}>Already have an account? <Link className={styles.linkk} to="/">Login Here
            </Link></p>
        </div>
     </section>
    </>
  );
}

export default Signup;
