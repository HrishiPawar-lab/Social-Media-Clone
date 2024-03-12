import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./register.css";
import Loader from '../Loader/Loader';

const Register = () => {
    const navigate = useNavigate();

    // Step 1: Registration data (username, email, password)
    const [registrationData, setRegistrationData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [newUser, setNewUser] = useState({});
    const [loading, setLoading] = useState(false); // Add loading state

    // Step 2: Cover picture upload data
    const [coverPicture, setCoverPicture] = useState('');

    // Step 3: Profile picture upload data
    const [profilePicture, setProfilePicture] = useState('');

    // Step 4: Current step of the registration process
    const [currentStep, setCurrentStep] = useState(1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistrationData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleCoverPictureChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setCoverPicture(base64);
    };

    const handleProfilePictureChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setProfilePicture(base64);
    };

    const handleStep2 = async () => {
        setLoading(true); // Set loading to true
        try {
            await axios.put(`http://localhost:9000/api/users/${newUser._id}/coverPicture`, { coverPicture });
            setCurrentStep(3);
        } catch (error) {
            console.error("Error uploading cover picture:", error);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handleStep3 = async () => {
        setLoading(true); // Set loading to true
        try {
            await axios.put(`http://localhost:9000/api/users/${newUser._id}/profilePicture`, { profilePicture });
            navigate('/login');
        } catch (error) {
            console.error("Error uploading profile picture:", error);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            const registerData = await axios.post("http://localhost:9000/api/auth/register", registrationData);
            setNewUser(registerData.data);
            if (registerData.data.username) {
                setCurrentStep(2);
            }
        } catch (error) {
            console.error("Error registering:", error);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    return (
        <div className="loginWrapper">
            <div className="loginbox">
                <div className='loginInBoxLeft' >
                    <h2 className='logo'>Social Media</h2>
                    <p>
                        Connecting Lives, One Post at a Time
                    </p>
                </div>
                <div className='loginBoxRight' >
                    <h2 className='logo mb-2'>Register</h2>
                    {loading && <Loader />} {/* Show loader when loading */}
                    {currentStep === 1 && (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter Username"
                                    name="username"
                                    value={registrationData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    name="email"
                                    value={registrationData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    name="password"
                                    value={registrationData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <button className='button' type="submit">Next</button>
                        </form>
                    )}
                    {currentStep === 2 && (
                        <div>
                            <input
                                type="file"
                                name="coverPicture"
                                onChange={handleCoverPictureChange}
                            />
                            <button className='mt-2 button' type="button" onClick={handleStep2}>Next</button>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div>
                            <input
                                type="file"
                                name="profilePicture"
                                onChange={handleProfilePictureChange}
                            />
                            <button
                                className='mt-2 button'
                                type="submit" onClick={handleStep3}>Register</button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Register;
