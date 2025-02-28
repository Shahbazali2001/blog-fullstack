import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import './App.css'
import authService from './appwrite/auth_service';
import {login, logout } from './store/authSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}));
      } else {
        dispatch(logout());
      }
    })
    .finally(()=>setLoading(false));
  },[]);

  return (
    <>
      <div>
        <h1>Loading...</h1>
        {loading && <div className="spinner"></div>}
      </div>
      <button onClick={() => setLoading(false)}>Stop Loading</button>
    </>
  )
}

export default App
