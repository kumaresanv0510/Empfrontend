import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import '../styles/Signup.css';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            alert('User registered successfully!');
            navigate('/login');
        } catch (error) {
            alert(error.response?.data?.message || 'Error registering user.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Employee Management & Signup</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <AiOutlineUser className="icon" />
                    <input
                        type="text"
                        placeholder="Name"
                        {...register('name', { required: 'Name is required' })}
                    />
                </div>
                {errors.name && <p className="error-message">{errors.name.message}</p>}

                <div className="input-group">
                    <AiOutlineMail className="icon" />
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email address',
                            },
                        })}
                    />
                </div>
                {errors.email && <p className="error-message">{errors.email.message}</p>}

                <div className="input-group">
                    <AiOutlineLock className="icon" />
                    <input
                        type="password"
                        placeholder="Password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters',
                            },
                        })}
                    />
                </div>
                {errors.password && <p className="error-message">{errors.password.message}</p>}

                <button type="submit">Register</button>
                <button type="button" onClick={() => navigate('/login')}>Login</button>
            </form>
        </div>
    );
};

export default Signup;
