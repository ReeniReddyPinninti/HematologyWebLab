import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { sentOtpFunction } from "../services/Apis";
import Spinner from 'react-bootstrap/Spinner';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [spiner,setSpiner] = useState(false);

    const navigate = useNavigate();

    // sendotp
    const sendOtp = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("Enter Your Email !")
        } else if (!email.includes("@")) {
            toast.error("Enter Valid Email !")
        }
        if(password === ""){
            toast.error("Enter Your Password")
        } else if(password.length < 6){
            toast.error("password length minimum 6 character")
        }
        else {
            setSpiner(true)
            const data = {
                email: email,
                password:password
            }

            const response = await sentOtpFunction(data);

            if (response.status === 200) {
                setSpiner(false)
                navigate("/user/otp",{state:email,password})
                
            } else {
                toast.error(response.response.data.error);
                setSpiner(false); // Make sure to stop spinner on error
            }
        }
    }

    return (
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', backgroundColor: 'white' }}>
            <div className="card-modern animate-fade-in">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '1.75rem', color: 'var(--primary-600)', marginBottom: '0.5rem' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--gray-500)' }}>Sign in to access your hematology analysis dashboard</p>
                </div>
                <form>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input 
                            className="form-control-modern"
                            type="email" 
                            name="email" 
                            id="email"
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder='Enter your email address'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input 
                            className="form-control-modern"
                            type="password" 
                            name="password" 
                            id="password"
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder='Enter your password'
                            required
                        />
                    </div>
                    <button 
                        className="btn-modern" 
                        onClick={sendOtp}
                        disabled={spiner}
                        type="button"
                    >
                        {spiner ? (
                            <>
                                <span>Signing In...</span>
                                <Spinner animation="border" size="sm" style={{ marginLeft: '0.5rem' }} />
                            </>
                        ) : 'Sign In'}
                    </button>
                    <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                        Don't have an account? <NavLink to="/register" style={{ color: 'var(--primary-600)', fontWeight: '600' }}>Create one here</NavLink>
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

export default Login