import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import "./Navbar.css"
const Navbar = () => {
    const navigate = useNavigate();
    const { user, logOut } = useContext(AuthContext);
    const handleLogout = () => {
        logOut();
        navigate("/")

    }
    return (
        <div className="navbar lg:w-10/12 mx-auto">
            <div className="navbar-start">
                <div className="dropdown mr-2" >
                    <label tabIndex={0} className=" lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow w-52">
                        <li><NavLink activeClassName="active" className="bg-transparent text-gray-800" to="/media">Media</NavLink></li>
                        <li><NavLink to="/message"className="bg-transparent text-gray-800">Message</NavLink></li>
                        <li><NavLink to="/about"className="bg-transparent text-gray-800">About</NavLink></li>
                        {
                            user?.email ? <li><a onClick={handleLogout}>Sign Out</a></li>
                                :
                                <li><NavLink to="signup">Signup</NavLink></li>
                        }
                    </ul>
                </div>
                <NavLink to="/" className="text-teal-500  font-bold text-xl">FataBook</NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to="/media" className="bg-transparent text-gray-800" activeClassName="active" >Media</NavLink></li>
                    <li><NavLink to="/message" className="bg-transparent text-gray-800">Message</NavLink></li>
                    <li><NavLink to="/about" className="bg-transparent text-gray-800">About</NavLink></li>
                    {
                        user?.email ? <li><a onClick={handleLogout}>Sign Out</a></li>
                            :
                            <li><NavLink to="signup">Signup</NavLink></li>
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.email && <img className='w-12 border-2 border-teal-500 p-1 h-12 rounded-full' src={user?.photoURL} alt="" />
                }
            </div>
        </div>
    );
};

export default Navbar;