import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { remove } from '../../redux/newUserSlice';
import { logout, selectUser, setUserData } from '../../redux/userSlice';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navabr from '../../components/Navbar/Navabr';
import UserDocCreate from '../../components/UserDoc Create/UserDocCreate';
import { collection, getDocs, query } from 'firebase/firestore';

const Dashboard = () => {
    const dispatch=useDispatch()
    const user = useSelector(state=>state.user);
    const [noUserData,setNoUserData]=useState(false)
    const[showOnly,setShowOnly]=useState("All")
   
    const navigate=useNavigate()
console.log("user",user)

// CHECK FOR USER DOC DATA
useEffect(()=>{
  async function fetchUserDocFromFirebase(){
    const userDataRef = collection(db, "Users");
    const q = query(userDataRef);
    const querySnapshot = await getDocs(q);
   
    querySnapshot.forEach((doc) => {
    
     if(doc.id===user?.user?.email){
      dispatch(setUserData({...doc.data(),id:user.user.email})); 
     
     }
    }); 
  }
fetchUserDocFromFirebase()
},[noUserData])


//CHECK FOR USER DATA
useEffect(()=>{
if(!user){return}
if(user.user&&!user.userData){setNoUserData(true);return}
},[user])

//LOGOUT FUNCTION
const logoutt=()=>{
    signOut(auth)
     .then(() => {dispatch(logout());dispatch(remove());})
      .then(() => {toast.success("Sucessfully logged out");navigate("/");})
}
{/* <button onClick={logoutt}>LOgout</button> */}
  return (
    <>
    <ToastContainer/>
    {noUserData&&<UserDocCreate setNoUserData={setNoUserData}/>}
    {/* <Navabr showOnly={showOnly} setShowOnly={setShowOnly}/> */}
    <Sidebar handleClick={logoutt}/>
    
   </>
  )
}

export default Dashboard