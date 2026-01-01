import React, {  useContext, useState } from "react";
import cross from "../assets/cross_icon.png"
import { DataContext } from "../Context/DataContext";
import axios from "axios";

const Loginpopup = ({setShowLogin}) => {

  const  {url, setToken} = useContext(DataContext)
 
  const [currstate, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",

  })
  const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({...data,[name]:value}))
  }

  const onLogin = async (event) =>{
    event.preventDefault();
    let newUrl = url;
    if(currstate=== "Login"){
      newUrl += '/api/user/login'
    }else{
      newUrl += '/api/user/register'
    }
    const response = await axios.post(newUrl, data)
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }


  }
  
  return (
    <div className="position-absolute z-index-1 w-full h-full bg-white bg-opacity-80 top-0 left-0   grid">
      <form onSubmit={onLogin} className="place-self-center w-[23vw,330px] color-[#808080] bg-orange-300 flex flex-col gap-[25px] px-4 py-4 rounded-md font-size-[14px] my-30">
        <div className="flex justify-between items-center  mx-3">
          <h2 className="text-xl color-white font-semibold">{currstate}</h2>
          <img onClick={() => setShowLogin(false)} src={cross} alt="" className="w-[16px] cursor-pointer" />
        </div>
        <div className="flex flex-col gap-4 ">
          {currstate === "Login" ? (
            <></>
          ) : (
            <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder="Your Name" className="outline-none border b-1-[#c9c9c9] p-2 border-radius-[4px] rounded-md mx-3" required />
          )}

          <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your Email" className="rounded-md mx-3 px-2 py-2" required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" className="rounded-md mx-3 px-2 py-2" required />
        </div>
        <button type="submit" className="my-2 bg-white mx-30 p-2 rounded-md font-bold hover:bg-tomato-500  font-size-[15px] cursor-pointer">{currstate === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="flex items-start gap-3 mt-[-15px]">
          <input type="checkbox" className="mt-[5px]" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currstate === "Login" ? (
          <p className="color-darkcyan font-weight-500 cursor-pointer">
            Create A new account? <span className="color-black font-bold cursor-pointer" onClick={()=>setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p className="color-darkcyan font-weight-500 cursor-pointer">
            Already have an account <span className="color-black font-bold cursor-pointer" onClick={()=>setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Loginpopup;
