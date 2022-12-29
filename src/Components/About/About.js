import React, { useContext } from 'react';
import { FcCellPhone, FcEditImage } from 'react-icons/fc';
import { AuthContext } from '../../Context/AuthProvider';
import AboutModal from './AboutModal';

const About = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className='w-9/12 mx-auto text-center mt-10 bg-white shadow-lg py-10'>
            <div className='text-end mr-10'>
                {/* <button htmlFor="my-modal-3" className=' btn bg-transparent border-2 border-teal-500 text-black hover:bg-teal-300 hover:border-teal-500'>Edit <FcCellPhone></FcCellPhone> </button> */}

                <AboutModal user={user}></AboutModal>
            </div>
            <div>
                <img className='w-36 rounded-full border-2 border-teal-500 p-1 mx-auto mb-5' src={user?.photoURL} alt="" />
                <label htmlFor="name mr-3" className='mr-3 text-start'>Name: </label>
                <input readOnly className="text-lg  bg-transparent border-0 text-gray-600" defaultValue={user?.displayName} /> <br />
                <label htmlFor="name" className='text-start mr-3'>Email: </label>
                <input readOnly className="text-lg  bg-transparent border-0 text-gray-600 " defaultValue={user?.email} /> <br />
                <label htmlFor="name" className='mr-3 text-start'>Education: </label>
                <input className="text-lg  bg-transparent border-0 text-gray-600 " />
                <br />
                <label htmlFor="name" className='mr-3 text-start'>Address: </label>
                <input className="text-lg  bg-transparent border-0 text-gray-600 " />
            </div>
            
        </div>
    );
};

export default About;