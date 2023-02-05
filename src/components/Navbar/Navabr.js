import React, { useEffect, useState } from 'react'
import styles from "./Navbar.module.css"
import {GiConfirmed} from "react-icons/gi"
import {AiOutlineCloseCircle} from "react-icons/ai"
import {MdPendingActions} from "react-icons/md"
import {AiFillFileAdd} from "react-icons/ai"
import TodayMeeting from '../Today Meeting/TodayMeeting'
import userImg from "../../images/userIcon.png"
import InfoCont from '../Info Cont/InfoCont'
import NewMeeting from '../New Meeting/NewMeeting'
import { useDispatch, useSelector } from 'react-redux'
import EditMeeting from '../Edit Meeting/EditMeeting'
import { setUserData } from '../../redux/userSlice'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Navabr = ({showOnly,setShowOnly}) => {
  const [newMeeting,setNewMeeting]=useState(false)
  const user = useSelector(state=>state.user);
  const [todayMeeting,setTodayMeeting]=useState([])
  const [otherdayMeeting,setOtherdayMeeting]=useState([])
  const[expiredMeeting,setExpiredMeeting]=useState([])
  const [infoData,setInfoData]=useState(null)
  const[editMeetData,setEditMeetData]=useState(null)
  const dispatch=useDispatch()

//SORT ARRAY ACCORDING TO STATUS
useEffect(()=>{
let oldMeetArray
if(showOnly==="All"){
  getMeetingArray(user?.userData?.meeting)
  return}
else if(showOnly==="Confirmed"){
  oldMeetArray=user?.userData?.meeting.filter((meet)=>{return meet.status==="confirmed"})
  getMeetingArray(oldMeetArray)
  return
}
else if(showOnly==="Pending"){
  oldMeetArray=user?.userData?.meeting.filter((meet)=>{return meet.status==="pending"})
  getMeetingArray(oldMeetArray)
  return
}
else if(showOnly==="Cancelled"){
  oldMeetArray=user?.userData?.meeting.filter((meet)=>{return meet.status==="rejected"})
  getMeetingArray(oldMeetArray)
  return
}
},[showOnly])


//SORT MEETING FROM LATEST TO OLDEST DATE
function latest(a,b){
  return Number(new Date(a.date).getTime())-Number(new Date(b.date).getTime())
 }
 
 //SORT MEETING FROM LATEST TO OLDEST TIME
 function latestTime(a,b){
   const [aHourString, aMinute] = a.from.split(":");
   const [bHourString, bMinute] = b.from.split(":");
   if(aHourString===bHourString){return Number(aMinute)-Number(bMinute)}
   else{return Number(aHourString)-Number(bHourString)
   }
  }

//GET MEETING ARRAY
useEffect(()=>{
  let meetArray=user?.userData?.meeting
  let todayMeet=[]
  let otherDayMeet=[]
  let expiredMeet=[]
if(!user){return}
if(!user.userData){return}
if(user?.userData?.meeting.length===0){return;}
meetArray.map((meet)=>{
if(new Date(meet.date).toDateString().slice(4)===new Date().toDateString().slice(4)){
  todayMeet.push(meet)
}
else if(new Date(meet.date)<new Date()){expiredMeet.push(meet)}
else if(new Date(meet.date)>new Date()){otherDayMeet.push(meet)}
})
todayMeet.sort(latest)
todayMeet.sort(latestTime)
otherDayMeet.sort(latest)
expiredMeet.sort(latest)
setTodayMeeting(todayMeet)
setOtherdayMeeting(otherDayMeet)
setExpiredMeeting(expiredMeet)

},[user])

//GET NEW MEETING ARRAY
const getMeetingArray=(meet)=>{
  let meetArray=meet
  let todayMeet=[]
  let otherDayMeet=[]
  let expiredMeet=[]
if(!user){return}
if(!user.userData){return}
if(user?.userData?.meeting.length===0){return;}
meetArray.map((meet)=>{
if(new Date(meet.date).toDateString().slice(4)===new Date().toDateString().slice(4)){
  todayMeet.push(meet)
}
else if(new Date(meet.date)<new Date()){expiredMeet.push(meet)}
else if(new Date(meet.date)>new Date()){otherDayMeet.push(meet)}
})
todayMeet.sort(latest)
todayMeet.sort(latestTime)
otherDayMeet.sort(latest)
expiredMeet.sort(latest)
setTodayMeeting(todayMeet)
setOtherdayMeeting(otherDayMeet)
setExpiredMeeting(expiredMeet)
}


//DELETE MEETING

const handleDeleteMeet=(id)=>{

  const meetArray=user?.userData?.meeting
  const newMeetArr=meetArray.filter((meet)=>{
    return meet.uid!==id
  })
  const newUserData={...user.userData,meeting:newMeetArr}
  dispatch(setUserData(newUserData))
updateInFirebase(newMeetArr)
}

const updateInFirebase=async(data)=>{
  try {
      const userDocumentRef=doc(db,"Users",user?.user?.email)
      await updateDoc(userDocumentRef,{
             meeting:data
          })
           toast.success("Successfully Deleted")      
  } catch (error) {
    console.log(error.message)
  }
}

  return (
    <>
    <ToastContainer/>
    {newMeeting&&<NewMeeting setNewMeeting={setNewMeeting}/>}
    {editMeetData&&<EditMeeting editMeetData={editMeetData} setEditMeetData={setEditMeetData}/>}
    <InfoCont infoData={infoData} setInfoData={setInfoData}/>
        <section className={styles.navbar}>
        <section className={styles.innerCont}>
        <div className={styles.infoCont}>
        <h1 className={styles.heading}>My Meetings</h1>
        <div className={styles.userInfoCont}>
          <img className={styles.userImage} src={user?.userData?.image} alt="userImg" />
          <p className={styles.userName}>{user?.userData?.name}</p>
        </div>
        </div>
           
<div className={styles.outerCont}>
            <div className={styles.showToggler}>
                <p className={styles.showText}>Show Only:</p>

                <button onClick={()=>{setShowOnly("All")}} className={showOnly==="All"?styles.showButtonActive:styles.showButton}>All</button>
                <button onClick={()=>{setShowOnly("Confirmed")}} className={showOnly==="Confirmed"?styles.showButtonActive:styles.showButton}>Confirmed <span><GiConfirmed className={styles.icon1}/></span></button>
                <button onClick={()=>{setShowOnly("Pending")}} className={showOnly==="Pending"?styles.showButtonActive:styles.showButton}>Pending <span><MdPendingActions className={styles.icon2}/></span></button>
                <button onClick={()=>{setShowOnly("Cancelled")}} className={showOnly==="Cancelled"?styles.showButtonActive:styles.showButton}>Cancelled <span><AiOutlineCloseCircle className={styles.icon3}/></span></button>
            </div>
            <button onClick={()=>setNewMeeting(true)} className={styles.addMeetingBtn}> <span><AiFillFileAdd className={styles.addMeetIcon}/></span>Add Meeting</button>
            </div>
            {todayMeeting.length!==0&&<><h1 className={styles.todayText}>Today</h1>
            <TodayMeeting handleDeleteMeet={handleDeleteMeet} setEditMeetData={setEditMeetData} meetArray={todayMeeting} setInfoData={setInfoData}/>
            </>}
            <h1 style={{color:"#0081C9"}} className={styles.todayText}>Upcoming</h1>
            <TodayMeeting handleDeleteMeet={handleDeleteMeet} setInfoData={setInfoData} setEditMeetData={setEditMeetData} meetArray={otherdayMeeting}/>
            {expiredMeeting.length!==0&&<><h1 style={{color:"red"}} className={styles.todayText}>Expired</h1>
            <TodayMeeting handleDeleteMeet={handleDeleteMeet} setInfoData={setInfoData} setEditMeetData={setEditMeetData} meetArray={expiredMeeting}/>
            </>}
            </section>
        </section>
    </>
  )
}

export default Navabr