import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { auth } from './firebase/config'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import { selectNewUser } from './redux/newUserSlice'
import { login, logout, selectUser } from './redux/userSlice'

const App = () => {
  const user = useSelector(selectUser);
  const newUser = useSelector(selectNewUser);
  const dispatch = useDispatch();
  const navigate=useNavigate()
console.log("newUser",newUser)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
          })
        )
      } else {
        dispatch(logout());
      }
    });
  }, []);

//CHECK IF USER IS ALREADY LOGGED IN

useEffect(()=>{
if(!user){return}
navigate("/dashboard")
},[user])

  return (
    <>
     <Routes>
     <Route path="/" element={<Login />} />
     <Route path="/signup" element={<Signup />} />
     <Route path='/dashboard' element={<Dashboard/>}></Route>
     </Routes> 
    </>
  )
}

export default App