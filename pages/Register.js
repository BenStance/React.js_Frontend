import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import '../assets/styles/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import teyoraLogo from '../assets/images/logo bg.png'; // Add your logo path here
import { FaEnvelope, FaLock, FaUser, FaArrowLeft } from 'react-icons/fa';
import { Carousel } from 'react-bootstrap';
import pic1 from '../assets/images/pict3.jpg';
import pic2 from '../assets/images/pict5.jpg';
import pic3 from '../assets/images/pict6.jpg';

const Register = () => {
  const [useEmail, setUseEmail] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate for redirection

  const handleUseEmailClick = () => {
    setUseEmail(true);
  };

  const handleBackClick = () => {
    setUseEmail(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        
        // Redirect to login page after success using navigate
        setTimeout(() => {
          navigate('/login');  // Redirect to login page
        }, 1000);  // Delay for showing success message

      } else {
        setErrorMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration. Please try again.");
      console.error('Error:', error);
    }
  };

  return (
    <div className='p-10 h-screen flex items-center justify-center wrapperbg'>
      <section className="container-fluid flex flex-col md:flex-row items-center p-7 rounded-lg shadow-lg max-w-4xl w-full wrapperbg2">
        <div className="w-full md:w-3/5 h-full">
          <div className="backpic">
            <div className="backpic-content3">
              <Carousel>
                <Carousel.Item>
                  <img className="d-block w-100 carousel-image2" src={pic1} alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100 carousel-image2" src={pic2} alt="Second slide" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100 carousel-image2" src={pic3} alt="Third slide" />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/5 h-full px-6 lg:px-16 xl:px-12 flex items-center justify-center form-width">
          <div className="w-full h-100">
            <div className="flex justify-center mb-6">
              <a href='/'>
                <img src={teyoraLogo} alt="Teyora Logo" className="w-32" />
              </a>
            </div>
            <form className="mt-6" onSubmit={handleSubmit}>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>}
              {useEmail && (
                <button 
                  type="button" 
                  className="absolute top-3 right-3 bg-gray-100 p-2 rounded-full" 
                  onClick={handleBackClick}
                >
                  <FaArrowLeft className="text-gray-500" />
                </button>
              )}
              {!useEmail ? (
                <>
                  <button type="button" className="btn-primary w-full" onClick={handleUseEmailClick}>
                    Use Email to Sign Up
                  </button>
                  <div className="flex items-center justify-center my-4">
                    <span className="line"></span>
                    <span className="mx-4 text-gray-500">or use Google</span>
                    <span className="line"></span>
                  </div>
                  <button type="button" className="btn-google2 mt-4 w-full">
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 48 48">
                        <defs>
                          <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                        </defs>
                        <clipPath id="b"><use href="#a" overflow="visible" /></clipPath>
                        <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/>
                        <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/>
                        <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/>
                        <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/>
                      </svg>
                      <span className="ml-4">Register with Google</span>
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <div className="relative">
                    <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Email Address" 
                      className="input-field pl-10" 
                      autoComplete="off" 
                      required 
                      value={formData.email} 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="relative mt-4">
                    <FaUser className="absolute top-3 left-3 text-gray-400" />
                    <input 
                      type="text" 
                      name="username" 
                      placeholder="Username" 
                      className="input-field pl-10" 
                      required 
                      value={formData.username} 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="relative mt-4">
                    <FaLock className="absolute top-3 left-3 text-gray-400" />
                    <input 
                      type="password" 
                      name="password" 
                      placeholder="Password" 
                      className="input-field pl-10" 
                      required 
                      value={formData.password} 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="relative mt-4">
                    <FaLock className="absolute top-3 left-3 text-gray-400" />
                    <input 
                      type="password" 
                      name="repeatPassword" 
                      placeholder="Repeat Password" 
                      className="input-field pl-10" 
                      required 
                      value={formData.repeatPassword} 
                      onChange={handleChange} 
                    />
                  </div>
                  <button type="submit" className="btn-primary mt-6 w-full">Register</button>
                </>
              )}
              {useEmail && (
                <div className="login-footer mt-6 flex flex-col md:flex-row items-center justify-center text-center md:text-left">
                  <a href="/login" className="register-link mt-2 md:mt-0">Already have an account? Log in</a>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
