import React from 'react'
import styles from "./TodayMeeting.module.css"
import {RxDotFilled} from "react-icons/rx"
import {AiFillInfoCircle} from "react-icons/ai"
import {AiFillDelete} from "react-icons/ai"
import {MdModeEditOutline} from "react-icons/md"


const TodayMeeting = ({meetArray,setInfoData,setEditMeetData,handleDeleteMeet}) => {

//MEETING TIME DIFFERENCE
function timeDiff(a,b){
  const [aHourString, aMinute] = a.split(":");
  const [bHourString, bMinute] = b.split(":");
  if(aHourString===bHourString){return Number(bMinute)-Number(aMinute)+" minutes"}
  else if(aHourString!==bHourString&&aMinute===bMinute){return  Number(bHourString)-Number(aHourString)+" hour"}
  else if(aHourString!==bHourString&&aMinute!==bMinute){
    return  Number(bHourString)-Number(aHourString)+" hour " +Number(bMinute)-Number(aMinute)+" minutes"
  }
}



  return (
   <>
    <section className={styles.outerCont}>
    {meetArray.length===0&& <div className={styles.noMeetingCont}>
<h1 className={styles.noMeetText}>No Meeting Scheduled</h1>
    </div>}
    {meetArray.length>0&&
      meetArray.map((meet)=>{
        return <>
        <div className={styles.meetingCont}>
            <div style={{backgroundColor:meet.status==="confirmed"?"green":meet.status==="pending"?"orange":meet.status==="rejected"?"red":""}} className={styles.togglerLine}></div>
            <div className={styles.timeDurationCont}>
               <h3 className={styles.time}>{meet.from}</h3> 
               <p className={styles.duration}>{timeDiff(meet.from,meet.to)}</p>
            </div>
            <div className={styles.withCont}>
            <p className={styles.withText}>With</p>
            <h3 className={styles.fullName}>{meet.name}</h3>
            </div>
            
            <div className={styles.dateNStatus}>
<h3 className={styles.date}>{new Date(meet.date).toDateString().slice(4)}</h3>
<p style={{color:meet.status==="confirmed"?"green":meet.status==="pending"?"orange":meet.status==="rejected"?"red":""}} className={styles.status}> <span><RxDotFilled className={styles.dot}/></span>{meet.status}</p>
            </div>
            <div className={styles.userIconCont}>
            <AiFillInfoCircle onClick={()=>{setInfoData(meet)}} className={styles.infoIcon}/>
            <AiFillDelete onClick={()=>handleDeleteMeet(meet.uid)} className={styles.delIcon}/>
            <MdModeEditOutline onClick={()=>setEditMeetData(meet)} className={styles.editIcon}/>
            </div>
        </div>
        </>
      })
        }
    </section>
   </>
  )
}

export default TodayMeeting