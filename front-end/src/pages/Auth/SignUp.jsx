import React, { useState } from 'react'
import PasswordInput from '../../assets/components/Input/PasswordInput';
import { useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInastance';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const Navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!name) {
      setError( "Plase enter your name" );
      return;
    }

    if (!validateEmail(email)) {
      setError( "Plase enter a valid email address." );
      return;
    }

    if (!password) {
      setError("Please enter the Password");
      return;
    }

    setError("");

    // SignUp API Call
    try {
      const response = await axiosInstance.post('/create-account', {
        fullName: name,
        email: email,
        password: password,
      });

      // Handle Success SignUp Response
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        Navigate('/dashboard'); 
      }

    } catch(error){
      // Handle the SignUp Error
      if (
        error.response && 
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred.Please try again.");
      }
    }
  };

  return (
    <div className='h-screen bg-cyan-50 overflow-h1 relative'>

      {/* <div className='login-ui-box right-10 -top-40' />
      <div className='login-ui-box bg-cyan-200 -bottom-40 right-1/2' /> */}

      <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
      <div className='w-2/4 h-[90vh] flex items-end bg-signup-bg-img bg-center rounded-lg p-10 z-50'>
      <div>
        <h4 className='text-5xl text-white font-semibold leading-[58px]'>
          Join Us & <br /> Start Your Adventure!
        </h4>
        <p className='text-[15px] text-white leading-6 pr-7 mt-4'>
          Discover the Magic of Sri Lanka at Your Fingertips
        </p>
        <ul className='text-[15px] text-white leading-6 pr-7 mt-4 list-disc list-inside'>
          <li>Exclusive travel offers 🏝️</li>
          <li>Personalized trip itineraries 🗺️</li>
          <li>Hassle-free booking experience 📲</li>
        </ul>
      </div>
    </div>


         <div className='w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20'>
          <form onSubmit={handleSignUp}>
            <h4 className='text-2xl font-semibold mb-7'>SignUp</h4>


            <input 
            type="text"
            placeholder='Full Name'
            className='input-box'
            value={name}
            onChange={({target})=>{ 
              setName(target.value)
            }}
            />

            <input 
            type="text"
            placeholder='Email'
            className='input-box'
            value={email}
            onChange={({target})=>{ 
              setEmail(target.value)
            }}
            />



            <PasswordInput  value={password}
            onChange={({target})=>{ 
              setPassword(target.value)
            }} />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'>
            CREATE ACCOUNT
            </button>

            <p className='text-xs text-slate-500 text-center my-4'>OR</p>

            <button 
              type='button'
              className='btn-primary btn-light'
              onClick={() => {
                Navigate("/login");
              }}
              >
                LOGIN
            </button>
          </form>
         </div>
      </div>
    </div>
  )
}

export default SignUp