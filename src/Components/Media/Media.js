import React, { useContext, useEffect, useState } from 'react';
import { FcLike } from 'react-icons/fc';
import { AuthContext } from '../../Context/AuthProvider';

const Media = () => {
    const { user } = useContext(AuthContext);
    const [post, setpost] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/post/${user?.email}`)
            .then(res => res.json())
            .then(data => setpost(data))
    }, [user?.email])
    return (
        <div className='lg:w-9/12 mx-auto mb-10 '>
            {
                post.map(posts => <>
                    <div className='w-11/12 mx-auto bg-white shadow-lg px-5 py-10 mb-8 mt-5'>
                        <div className='flex mb-3 mt-5'>
                            <img src={user?.photoURL} className="w-9 h-9 rounded-full mr-3" alt="" />
                            <div>
                                <h4 className='text-[16px] text-black font-bold'>{user?.displayName}</h4>
                                <h4 className='text-[10px] text-gray-500'>{posts?.postedTime}</h4>
                            </div>
                        </div>
                        <div className=''>
                            <h2 className='text-gray-600 text-md'>{posts?.post}</h2>
                            <img className='w-56 mx-auto mt-3 mb-5' src={posts?.image} alt="" />
                        </div>
                        <div className="flex justify-around border-2 py-2 border-gray-300">
                            <button className='mr-10 '><FcLike className='text-xl hover:text-3xl '></FcLike> </button>
                            <input className='px-5 py-2 border-0 rounded-md' type="text" name="" placeholder='Add a comment' id="" />
                        </div>
                    </div>
                </>)
            }
        </div>
    );
};

export default Media;