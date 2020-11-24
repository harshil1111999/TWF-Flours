import './App.css';
import React, { useEffect, useState } from 'react'
import fire from './config/fire'
import Profile from './component/Profile';
import Login from './component/Login';
import Signup from './component/Signup';
import { useDataLayerValue } from './dataManagement/DataLayer';

function App() {

  //flag for to check which (login / signup) component to render
  const [flag, setFlag] = useState(1)

  //for to create seperate data layer to stop prop-drilling problem
  const [{user}, dispatch] = useDataLayerValue();

  const authListner = () => {
    fire.auth().onAuthStateChanged((u) => {
      if(u != null) {
        dispatch({
          type: "SET_USER",
          user: u
        })
      } else {
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  }

  useEffect(() => {
    authListner();
  }, [])

  return (
    <div>
        {
          user ? (<Profile />) : (
            <div className="container">
              <div className="box is-flex" style={{margin: "20px", flexDirection: "column", alignItems: "center"}}>
              {/* Top login and signup option */}
              {
                flag === 0 ? (
                  <div className="is-flex header" style={{width: "80%"}}>
                      <button id="signup" onClick={() => setFlag(0)} style={{display: "flex", flex: 1, 
                      fontSize: "40px", borderWidth: "0px", borderRight: "2px solid lightgray", cursor: "pointer",
                      outline: "none", justifyContent: "center", 
                      alignItems: "center", transform: "scale(0.98)", 
                      boxShadow: "3px 2px 22px 1px rgba(0, 0, 0, 0.24)",
                      background: "rgb(72, 61, 139)", color: "whitesmoke" }}>Signup</button>
                      <button id="login" onClick={() => setFlag(1)} style={{display: "flex", flex: 1, 
                      fontSize: "40px", border: "none", justifyContent: "center", outline: "none", 
                      cursor: "pointer", alignItems: "center",
                      background: "rgb(72, 61, 139)", color: "whitesmoke"}}>Login</button>
                  </div>
              ) : (
                  <div className="is-flex header" style={{width: "80%"}}>
                      <button id="signup" onClick={() => setFlag(0)} style={{display: "flex", flex: 1, 
                      fontSize: "40px", borderWidth: "0px", borderRight: "2px solid lightgray", 
                      cursor: "pointer", outline: "none", justifyContent: "center", 
                      alignItems: "center", background: "rgb(72, 61, 139)", color: "whitesmoke"}}>Signup</button>
                      <button id="login" onClick={() => setFlag(1)} style={{display: "flex", flex: 1, 
                      fontSize: "40px", border: "none", justifyContent: "center", outline: "none", 
                      cursor: "pointer", alignItems: "center", transform: "scale(0.98)",
                      boxShadow: "3px 2px 22px 1px rgba(0, 0, 0, 0.24)", 
                      background: "rgb(72, 61, 139)", color: "whitesmoke" }}>Login</button>
                  </div>
                )
              }
              {flag ? (<Login />) : (<Signup />)}
              </div>
            </div>
          )
        }
      </div>
  )
}

export default App