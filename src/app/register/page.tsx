"use client"
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import axiosInstance from '../../../axiosInstance';
import { useRouter } from 'next/navigation';
import './../../app/components/layout/layout.css';
const Register = () => {
    const router = useRouter();
    const [showPassword,setShowPassword] = useState(false)
    const [showPassword2,setShowPassword2] = useState(false)
    const [formData2, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const { username, email, password, password2 } = formData2;
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const onChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData2, [e.target.name]: e.target.value });
        setError('')
    };

    function validatePassword(password: any) {
        // Regular expressions for different password criteria
        const containsLowercase = /[a-z]/.test(password);
        const containsUppercase = /[A-Z]/.test(password);
        const containsNumber = /[0-9]/.test(password);
        const containsSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
      
        // Check if all criteria are met
        const isLengthValid = password.length >= 8; // Minimum length of 8 characters
        const isLowercaseValid = containsLowercase;
        const isUppercaseValid = containsUppercase;
        const isNumberValid = containsNumber;
        const isSpecialValid = containsSpecial;
      
        if (!(isLengthValid && isLowercaseValid && isUppercaseValid && isNumberValid && isSpecialValid)) {
            setError("Password is not valid. It must meet the following criteria:");
            if (!isLengthValid) {
              setError("- Minimum length of 8 characters");
            }
            if (!isLowercaseValid) {
              setError("- Must contain at least one lowercase letter");
            }
            if (!isUppercaseValid) {
              setError("- Must contain at least one uppercase letter");
            }
            if (!isNumberValid) {
              setError("- Must contain at least one number");
            }
            if (!isSpecialValid) {
              setError("- Must contain at least one special character");
            }
          }else{
            setError('')
          }
        // Return an object with the validation results
        return {
          isLengthValid,
          isLowercaseValid,
          isUppercaseValid,
          isNumberValid,
          isSpecialValid,
          isValid:
            isLengthValid && isLowercaseValid && isUppercaseValid && isNumberValid && isSpecialValid,
        };
      }

      useEffect(() => {
        validatePassword(password);
      }, [password])

      useEffect(() => {
        validatePassword(password2)
      }, [password2])
      
      

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(password !== password2)
        {
            setError("Passwords mismatched")
            return
        }else{
            setLoading(true)
        }
        
        setError('');

        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };

     
    const data = {
        username: username,
        email: email,
        password: password,
      };

        try {
            // Make POST request to register endpoint
            const response = await axiosInstance.post('/api/auth/register', data,config);

            console.log('Registration successful');
            router.push('/login');
            // Redirect or perform any other action upon successful registration
        } catch (e: any) {
            console.log('error ', e.message);
            setError(e.response.data.error || 'something went wrong');
          }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-4 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-24 w-auto" src="news.png" alt="Company Logo" />
                <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-teal-600">Sign in to your account</h2>
            </div>

            {loading == false && <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form className="space-y-6" onSubmit={(e) => onSubmit(e)}>
                    <div>
                        <label htmlFor="username" className="block font-medium leading-6 text-gray-900">User name</label>
                        <div className="mt-2">
                            <input id="username" name="username" 
                            type="text"
                            placeholder='Enter username'
                             autoComplete="text" 
                             required
                             value={username}
                              onChange={(e) => onChange(e)}
                              className="input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" 
                            name="email" 
                            type="email"
                            placeholder='Enter Email Address'
                             autoComplete="email" 
                             required 
                             value={email}
                              onChange={(e) => onChange(e)}
                            className="input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block font-medium leading-6 text-gray-900">Password</label>
                        <div className="password mt-2">
                            <input id="password"
                             name="password"
                             type={showPassword ? "text" : "password"}
                              placeholder='Password'
                              autoComplete="new-password" 
                              required value={password}
                              onChange={(e) => onChange(e)}
                                className="input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                                <button
                                    type="button"
                                    className="text-black dark:text-white"
                                    onClick={() => {
                                        setShowPassword((prev) => !prev);
                                    }}
                                    >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="password2" className="block font-medium leading-6 text-gray-900">Confirm password</label>
                        <div className="password mt-2">
                            <input id="password2"
                             name="password2"
                             type={showPassword2 ? "text" : "password"}  required 
                              value={password2} onChange={onChange} className="input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                            <button
                                type="button"
                                className="text-black dark:text-white"
                                onClick={() => {
                                    setShowPassword2((prev) => !prev);
                                }}
                                >
                                {showPassword2 ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">Register</button>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm text-gray-500">
                    Already a member?
                    <a href="/login" className="font-semibold leading-6 text-teal-500 hover:text-teal-500"> Login</a>
                </p>
            </div>}
            {loading && <div className='loading'>
            Registering...please wait while we process
            </div>}
        </div>
    );
};




export default Register;
