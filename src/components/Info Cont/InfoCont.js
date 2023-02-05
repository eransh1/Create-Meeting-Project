import React from 'react'
import styles from "./InfoCont.module.css"
import {AiFillCloseCircle} from "react-icons/ai"
import {RxDotFilled} from "react-icons/rx"

const InfoCont = ({infoData,setInfoData}) => {
  return (
    <>
      <section style={{transform:infoData?"translate(0px)":""}} className={styles.outerCont}>
<AiFillCloseCircle onClick={()=>setInfoData(false)} className={styles.closeIcon}/>
<div className={styles.InnerCont}>
<h3 className={styles.presentDate}>{new Date(infoData?.date).toDateString().slice(4)}</h3>
<div className={styles.titleCont}>
<h3 className={styles.head}>Title:</h3>
<h3 className={styles.title}>{infoData?.title}</h3>
</div>
<div className={styles.statusCont}>
<p className={styles.statusHead}>Status:</p>
<p style={{color:infoData?.status==="confirmed"?"green":infoData?.status==="pending"?"orange":infoData?.status==="rejected"?"red":""}} className={styles.status}><span><RxDotFilled className={styles.dot}/></span>{infoData?.status}</p>
</div>
<div className={styles.desCont}>
<p className={styles.desHead}>Description: </p>
<p className={styles.description}>{infoData?.des}</p>
</div>

<div className={styles.timeCont}>
<p className={styles.timeHead}>Time:</p>
<p className={styles.time}><span>{infoData?.from}</span>-<span>{infoData?.to}</span>   </p>
</div>

</div>
      </section>  
    </>
  )
}

export default InfoCont