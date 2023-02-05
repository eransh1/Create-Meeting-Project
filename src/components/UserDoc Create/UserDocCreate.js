import { doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../../firebase/config'
import styles from "./UserDocCreate.module.css"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const UserDocCreate = ({setNoUserData}) => {
const[name,setName]=useState("")
const user = useSelector(state=>state.user);


//CHECK FOR USER DATA
useEffect(()=>{
    if(!user){return}
    if(user.user&&!user.userData){setNoUserData(true);return}
    setNoUserData(false)
    },[user])

const createUserDoc=async(e)=>{
e.preventDefault()

toast("Processing Your Request")
try {
    await setDoc(
        doc(db, "Users", user?.user?.email),{
            name:name,
            image:"https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
            meeting:[]
        })
        setNoUserData(false)       
} catch (error) {
  console.log(error.message)
}
}

  return (
    <>
        <section className={styles.outerCont}>
            <div className={styles.innerCont}>
            <ToastContainer/>
            <h1 className={styles.text}>General Info</h1>
                <form onSubmit={createUserDoc} className={styles.form}>
                    <input onChange={(e)=>setName(e.target.value)} className={styles.input} type="text" name="name" placeholder='Full Name' value={name} required/>
                    <button type='submit' className={styles.btn}>Submit</button>
                </form>
            </div>
        </section>
    </>
  )
}

export default UserDocCreate