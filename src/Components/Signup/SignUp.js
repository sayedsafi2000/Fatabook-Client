import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../Context/AuthProvider';
import { toast } from 'react-hot-toast';
import { GoogleAuthProvider } from 'firebase/auth';
const SignUp = () => {
    const location = useLocation();
    const { createUser, updateUser, providerLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    // const from = location.state?.from?.pathname || "/";
    const googleProvider = new GoogleAuthProvider();
    const [signUpError, setsignUpError] = useState("")

    const handleSignup = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;
        const usersInfo = { email, name, photoURL }
        setsignUpError("");
        createUser(email, password)
            .then(result => {
                const user = result.user;
                updateSignInUser(name, photoURL)
                console.log(user);
                fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(usersInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)

                        toast.success("user created successfully");
                        navigate("/");
                    })
                form.reset();
            })

            .catch(err => {
                setsignUpError(err.message);
                console.error(err)
            });
    };
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

    const updateSignInUser = (name, photoURL) => {
        const profile = { displayName: name, photoURL: photoURL }
        updateUser(profile)
            .then(() => {
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <section className=" dark:bg-gray-900 none lg:flex justify-center w-10/12 mx-auto pt-10">

            <div className='w-full lg:w-1/2 '>
                <img className='w-full lg:w-[600px]' src="signup.png" alt="" />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-0 mx-auto  lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-0 lg:p-6 space-y-4 md:space-y-6 ">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create and account
                        </h1>
                        <form onSubmit={handleSignup} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Full Name" required="" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="photoURL">
                                    PhotoURL
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="photoURL" name='photoURL' type="text" placeholder='Enter your photo Url' />
                            </div>
                            <button type="submit" className="w-full btn text-white font-bold border-none bg-blue-600">Create an account</button>
                            <p className="text-red-600">{signUpError}</p>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                        <button onClick={handleGoogleSignin} className="btn bg-white hover:bg-slate-500 hover:text-white text-black border-1 mx-auto w-full"> <span className=' text-xl mr-4'>
                            <FcGoogle ></FcGoogle>
                        </span> Signup with Google</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;