import React,{Fragment,useState,useEffect,useContext} from "react";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import Login from "./components/Login/Login";
import AuthContext from "./store/auth-context";

const App=()=>{
  const[isLoggedIn,setIsLoggedIn] =useState(false);

  const userLoggedInStatus=localStorage.getItem("isLoggedIn");

  useEffect(()=>{
    if(userLoggedInStatus==="1"){
      setIsLoggedIn(true);
    }

  },[])



  const loginHandler=(email,password)=>{
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn","1");
  }

  const logoutHandler=()=>{
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  }
  return (
    <AuthContext.Provider value={{
      isLoggedIn:isLoggedIn,
      onLogOut:logoutHandler
    }}>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />

      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
