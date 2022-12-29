import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const Login = () => {
    const [loginError, setloginError] = useState("");
    const { signIn, providerLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        setloginError("");
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate("/")
            })
            .catch(err => {
                setloginError(err.message);
                // console.log(err)
            })

    }
    const handleGoogleSignin = () => {
        providerLogin(googleProvider)
            .then(result => {
                saveTodb(result?.user?.displayName,
                    result?.user?.email);
                console.log(result.user)
            })
            .catch(err => console.error(err));
    }
    const saveTodb = (name, email) => {
        const user = { name, email };
        fetch(`http://localhost:5000/users/${email}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success("user created successfully");
                navigate("/");
            });
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900 lg:flex justify-center">
                <div className='w-full lg:w-1/2 '>
                    <img className='w-full lg:w-[600px]' src="signup.png" alt="" />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6  mx-auto lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Please Login
                            </h1>
                            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6" action="#">

                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>

                                <button type="submit" className="w-full text-blaxk btn btn-ghonst">Log In</button>
                                <p className='text-red-600'>{loginError}</p>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don't you have an account? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">SignUp Here</Link>
                                </p>
                            </form>
                            <button onClick={handleGoogleSignin} className="btn bg-white hover:bg-slate-500 hover:text-white text-black border-1 mx-auto w-full"> <span className=' text-xl mr-4'>
                                <FcGoogle></FcGoogle>
                            </span> Signup with Google</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;