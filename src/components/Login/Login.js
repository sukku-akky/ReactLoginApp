import React, { useState,useReducer ,useRef,useEffect} from "react";
import Input from "../UI/Input/Input";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";


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
  const emailRef=useRef(null);

  useEffect(()=>{
    if(emailRef.current){
      emailRef.current.focus();
    }

  },[])
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
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id="email" type="email" label="E_MAIL" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} ref={emailRef}/>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          
          <Input
            type="password"
            id="password"
            label="PASSWORD"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
