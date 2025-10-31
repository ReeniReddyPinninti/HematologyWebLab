import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {registerfunction} from "../services/Apis";
import {useNavigate} from "react-router-dom"
import { NavLink } from "react-router-dom"
import "../styles/mix.css"

const Register = () => {

  const [passhow,setPassShow] = useState(false);

  const [inputdata,setInputdata] = useState({
    fname:"",
    email:"",
    password:"",
    phone:""
  });

  const navigate = useNavigate();
  

  // setinputvalue
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setInputdata({...inputdata,[name]:value})
  }


  // register data
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {fname,email,password, phone} = inputdata;

    if(fname === ""){
      toast.error("Enter Your Name")
    }else if(email === ""){
      toast.error("Enter Your Email")
    }else if(!email.includes("@")){
      toast.error("Enter Valid Email")
    }else if(password === ""){
      toast.error("Enter Your Password")
    }else if(password.length < 6){
      toast.error("password length minimum 6 character")
    }else{
      const response = await registerfunction(inputdata);
      
      if(response.status === 200){
        setInputdata({...inputdata,fname:"",email:"",password:"",phone:""});
        navigate("/")
      }else{
        toast.error(response.response.data.error);
      }
    }
  }


  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Create Account</h1>
          <p>Join our hematology analysis platform to get started</p>
        </div>
        <form>
          <div className="form_input">
            <label htmlFor="fname">Full Name</label>
            <input 
              type="text" 
              name="fname" 
              id="fname"
              value={inputdata.fname}
              onChange={handleChange} 
              placeholder='Enter your full name'
              required
            />
          </div>
          <div className="form_input">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              name="email" 
              id="email"
              value={inputdata.email}
              onChange={handleChange}  
              placeholder='Enter your email address'
              required
            />
          </div>
          <div className="form_input">
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              id="phone"
              value={inputdata.phone}
              onChange={handleChange}  
              placeholder='Enter your phone number'
            />
          </div>
          <div className="form_input">
            <label htmlFor="password">Password</label>
            <div className='two' style={{position: 'relative'}}>
              <input 
                type={!passhow ? "password" : "text"} 
                name="password" 
                id="password"
                value={inputdata.password}
                onChange={handleChange}  
                placeholder='Create a secure password'
                required
              />
              <button 
                type="button"
                className='showpass' 
                onClick={() => setPassShow(!passhow)}
              >
                {!passhow ? "👁️" : "🙈"}
              </button>
            </div>
          </div>
          <button 
            className='btn' 
            onClick={handleSubmit}
            type="button"
          >
            Create Account
          </button>
          <p>Already have an account? <NavLink to="/">Sign in here</NavLink></p>
        </form>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  )
}

export default Register