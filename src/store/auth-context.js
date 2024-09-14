import React from "react";

const AuthContext=React.createContext({
  isLoggedIn:false,
  onLogin:[],
  onLogOut:()=>{
    
  }
});

export default AuthContext;