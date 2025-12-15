import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {registerfunction} from "../services/Apis";
import {useNavigate} from "react-router-dom"
import { NavLink } from "react-router-dom"


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
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', backgroundColor: 'white' }}>
      <div className="card-modern animate-fade-in">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--primary-600)', marginBottom: '0.5rem' }}>Create Account</h1>
          <p style={{ color: 'var(--gray-500)' }}>Join our hematology analysis platform to get started</p>
        </div>
        <form>
          <div className="form-group">
            <label className="form-label" htmlFor="fname">Full Name</label>
            <input 
              className="form-control-modern"
              type="text" 
              name="fname" 
              id="fname"
              value={inputdata.fname}
              onChange={handleChange} 
              placeholder='Enter your full name'
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input 
              className="form-control-modern"
              type="email" 
              name="email" 
              id="email"
              value={inputdata.email}
              onChange={handleChange}  
              placeholder='Enter your email address'
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="phone">Phone Number</label>
            <input 
              className="form-control-modern"
              type="tel" 
              name="phone" 
              id="phone"
              value={inputdata.phone}
              onChange={handleChange}  
              placeholder='Enter your phone number'
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-group">
              <input 
                className="form-control-modern"
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
                className='btn-icon' 
                onClick={() => setPassShow(!passhow)}
                aria-label={passhow ? "Hide password" : "Show password"}
              >
                {passhow ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <button 
            className='btn-modern' 
            onClick={handleSubmit}
            type="button"
          >
            Create Account
          </button>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--gray-500)', fontSize: '0.9rem' }}>
            Already have an account? <NavLink to="/" style={{ color: 'var(--primary-600)', fontWeight: '600' }}>Sign in here</NavLink>
          </p>
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