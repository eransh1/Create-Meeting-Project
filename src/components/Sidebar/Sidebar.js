import React from 'react'
import styles from "./Sidebar.module.css"
import logo from "../../images/logo.jpg"
import {AiFillHome} from "react-icons/ai"
import {CgProfile} from "react-icons/cg"
import {AiOutlineBell} from "react-icons/ai"
import {AiOutlineMessage} from "react-icons/ai"
import {BiLogOut} from "react-icons/bi"

const Sidebar = ({handleClick}) => {
  return (
   <>
    <section className={styles.sidebar}>
<img className={styles.logo} src={logo} alt="logo" />
<AiFillHome className={styles.homeIcon}/>
<CgProfile className={styles.profileIcon}/>
<AiOutlineBell className={styles.profileIcon}/>
<AiOutlineMessage className={styles.profileIcon}/>
<BiLogOut onClick={handleClick} className={styles.logoutIcon}/>
    </section>
   </>
  )
}

export default Sidebar