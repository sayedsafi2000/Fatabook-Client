import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FcLike } from 'react-icons/fc';
import { AuthContext } from '../../Context/AuthProvider';
import Login from '../Login/Login';

const Home = () => {
    const { user } = useContext(AuthContext);
    const handleAddToPost = event => {
        event.preventDefault();
        const imgHostKey = "bd3c80112eba61321025abb7d99f828f";
        const createAt = new Date().getTime();
        const getFullTime = new Date().toLocaleString();
        const form = event.target;
        const image = form.image.files[0];
        const formData = new FormData();
        formData.append("image", image);
        fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                const userName = user?.displayName;
                const userEmail = user?.email;
                const photoURL = user?.photoURL;
                const image = imgData.data.url;
                const text = form.text.value;
                const post = {
                    createAt,
                    postedTime: getFullTime,
                    userName: userName,
                    userEmail,
                    post: text,
                    image: image,
                    photoURL
                }
                fetch("http://localhost:5000/post", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(post)
                })
                    .then(res => res.json())
                    .then(data => {
                        form.reset();
                        toast.success("Service Added Successfully")
                        console.log(data)
                    })
                    .catch(err => console.log(err))
            }
            );

    }
    const [post, setpost] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/post`)
            .then(res => res.json())
            .then(data => setpost(data))
    }, [user?.email])
    return (
        <div>
            {
                user?.email ?
                    <>
                        < div className='lg:w-8/12 mx-auto pt-10 bg-white pb-5 shadow-lg px-5' >
                            <form className="w-full " onSubmit={handleAddToPost}>
                                <div className="flex items-center border-b border-teal-500 py-2">
                                    <textarea className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="What's on your mind.." name='text' aria-label="Full name" />
                                    <input name='image' type="file" className='
                        file:px-6 file:py-2 file:bg-teal-500 border-0 file:border-0 file:text-white file:font-bold file:rounded-3xl file:placeholder:Post a photo
                        ' />
                                    <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                                        Post
                                    </button>
                                </div>
                            </form>
                        </div >
                        <div className='lg:w-9/12 mx-auto mb-10 px-5 '>
                            {
                                post.map(posts => <>
                                    <div className='w-11/12 mx-auto bg-white shadow-lg px-5 py-10 mb-8 mt-5'>
                                        <div className='flex mb-3 mt-5'>
                                            <img src={posts?.photoURL} className="w-9 h-9 rounded-full mr-3" alt="" />
                                            <div>
                                                <h4 className='text-[16px] text-black font-bold'>{posts?.userName}</h4>
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
                    </>
                    :
                    <Login></Login>
            }
        </div>
    );
};

export default Home;