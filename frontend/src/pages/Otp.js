import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { userVerify } from "../services/Apis"
import { useAuthContext } from './useAuthContext'

const Otp = () => {
  const { dispatch } = useAuthContext()

  const [otp, setOtp] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();

    if (otp === "") {
      toast.error("Enter Your Otp")
    } else if (!/[^a-zA-Z]/.test(otp)) {
      toast.error("Enter Valid Otp")
    } else if (otp.length < 6) {
      toast.error("Otp Length minimum 6 digit")
    } else {
      const data = {
        otp, email: location.state
      }

      const response = await userVerify(data);
      const json = await response.json()
  
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(json))
        dispatch({type: 'LOGIN', payload: json})
        navigate("/dashboard")
      } else {
        toast.error(response.response.data.error)
      }
    }
  }

  return (
    <>
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', backgroundColor: 'white' }}>
        <div className="card-modern animate-fade-in">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--primary-600)', marginBottom: '0.5rem' }}>Two-Factor Authentication</h1>
            <p style={{ color: 'var(--gray-500)' }}>Please enter the OTP sent to your email</p>
          </div>
          <form>
            <div className="form-group">
              <label className="form-label" htmlFor="otp">OTP Code</label>
              <input 
                className="form-control-modern"
                type="text" 
                name="otp" 
                id="otp" 
                onChange={(e) => setOtp(e.target.value)} 
                placeholder='Enter 6-digit OTP' 
                maxLength="6"
              />
            </div>
            <button className='btn-modern' onClick={LoginUser} style={{ marginTop: '1rem' }}>Verify & Sign In</button>
          </form>
        </div>
        <ToastContainer position="top-right" autoClose={5000} />
      </section>
    </>
  )
}

export default Otp