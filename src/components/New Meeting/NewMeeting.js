import React, { useState } from 'react'
import styles from "./NewMeeting.module.css"
import {AiFillCloseCircle} from "react-icons/ai"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { setUserData } from '../../redux/userSlice';


const NewMeeting = ({setNewMeeting}) => {
    const user = useSelector(state=>state.user);
const [newMeetData,setNewMeetData]=useState({title:"",name:"",status:"confirmed",des:"",date:"",from:"14:00",to:"14:30"})

const dispatch=useDispatch()

const handleChange=(e)=>{
const {name,value}=e.target
setNewMeetData((prev)=>{return {...prev,[name]:value}})
}

const handleFormSubmit=(e)=>{
e.preventDefault()
const [aHourString, aMinute] = newMeetData.from.split(":");
  const [bHourString, bMinute] = newMeetData.to.split(":");
  if(!(aHourString<=bHourString)){toast.error("Time cannot be negtive");return}
toast("Processing")
let userData=user.userData
let meetingData
if(user.userData.meeting.length>0){meetingData=user.userData.meeting}
else{meetingData=[]}
const newMeetingData=[...meetingData,{...newMeetData,uid:new Date().getTime()}]

const newUserData={...userData,meeting:newMeetingData}
dispatch(setUserData(newUserData))
updateInFirebase(newMeetingData)
}

const updateInFirebase=async(data)=>{
    try {
        const userDocumentRef=doc(db,"Users",user?.user?.email)
        await updateDoc(userDocumentRef,{
               meeting:data
            })
             toast.success("Successfully Created") 
             setNewMeeting(false)     
    } catch (error) {
      console.log(error.message)
    }
}

  return (
    <>
        <section className={styles.outerCont}>
<div className={styles.innerCont}>
<ToastContainer/>
    <div className={styles.closeIconCont}><AiFillCloseCircle onClick={()=>setNewMeeting(false)} className={styles.closeIcon}/></div>
    <h1 className={styles.title}>New Meeting</h1>
    <form onSubmit={handleFormSubmit} className={styles.form}>
    <input value={newMeetData.title} onChange={handleChange} name='title' className={styles.input} type="text" placeholder='Title*'  required/>
    <label className={styles.statusInputText} for="status">Status:</label>
<select value={newMeetData.status} onChange={handleChange} className={styles.input} name="status" id="status" required>
  <option value="confirmed">Confirmed</option>
  <option value="pending">Pending</option>
  <option value="rejected">Rejected</option>
</select>
    <input value={newMeetData.name} onChange={handleChange} name='name' className={styles.input} type="text" placeholder='Name of Client*'  required/>
    <textarea value={newMeetData.des} onChange={handleChange} name='des' className={styles.input} placeholder='Description*' rows="3" required></textarea>
   <div className={styles.dNTCont}>
   <div><span className={styles.label}>Date*: </span> <input value={newMeetData.date} onChange={handleChange} name='date' className={styles.date} type="date" required/></div>  
   <div><span className={styles.label}>From*: </span> <input value={newMeetData.from} onChange={handleChange} name='from' className={styles.date} type="time" required/></div> 
   <div><span className={styles.label}>To*: </span> <input value={newMeetData.to} onChange={handleChange} name='to' className={styles.date} type="time" required/></div> 
   </div>
   <button className={styles.btn} type='submit'>Create</button>
    </form>
</div>
        </section>
    </>
  )
}

export default NewMeeting