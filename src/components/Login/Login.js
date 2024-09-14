import React, { useState,useReducer ,useRef,useEffect,useContext} from "react";
import Input from "../UI/Input/Input";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context"

const emailreducer=(state,action)=>{

  

    if(action.type==="USER_INPUT"){
        return {value:action.payload,isValid:action.payload.includes("@")};
    }
    if(action.type==="INPUT_BLUR"){
        return {value:state.value,isValid:state.value.includes("@")}
    }
    return {value:"",isValid:false};

}


const passwordReducer=(state,action)=>{
    if(action.type==="USER_INPUT"){
        return {value:action.payload,isValid:action.payload.trim().length>6}
    }
    if(action.type==="INPUT_BLUR"){
        return {value:state.value,isValid:state.value.trim().length>6}
    }
    return {value:"",isValid:false}

}
const Login = (props) => {
  const authCtx=useContext(AuthContext);
 const emailInputRef=useRef();
 const passwordInputRef=useRef();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail]=useReducer(emailreducer,{
    value:"",
    isValid:null,
  })

  const [passwordState,dispatchPassword]=useReducer(passwordReducer,{
    value:"",
    isValid:null
  })

  const emailChangeHandler = (event) => {
    dispatchEmail({type:"USER_INPUT",payload:event.target.value});
    setFormIsValid(
        emailState.value.includes("@") && passwordState.value.trim().length > 6
      );
    
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:"USER_INPUT",payload:event.target.value});
    setFormIsValid(
        emailState.value.includes("@") && passwordState.value.trim().length > 6
      );

  };

  const validateEmailHandler = () => {
    dispatchEmail({type:"INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:"INPUT_BLUR"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      authCtx.onLogin(emailState.value,passwordState.value);


    } else if(!emailState.isValid){
      emailInputRef.current.focus();

    } else{
      passwordInputRef.current.focus();

    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input ref={emailInputRef} id="email" type="email" label="E_MAIL" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
        <Input
            ref={passwordInputRef}
            type="password"
            id="password"
            label="PASSWORD"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
          
          
        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
