import React, { useEffect, useState } from 'react';

const AboutModal = ({ user }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/users/${user?.email}`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [user?.email]);
    const handleUpdateUser = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const address = form.address.value;
        const education = form.education.value;
        const newUser = {email,address,name,education}
        fetch(`http://localhost:5000/users/${users?.id}`,{
            method:"PUT",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newUser)
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
    }
    return (
        <div>
            {/* The button to open modal */}
            <label htmlFor="my-modal-3" className=' btn bg-transparent border-2 border-teal-500 text-black hover:bg-teal-300 hover:border-teal-500'>Edit Profile</label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                {
                    users?.map(user =>
                        <>
                            <div className="modal-box relative">
                                <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                <div className="w-full ">
                                    <form onSubmit={handleUpdateUser} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                Name
                                            </label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Full Name"
                                                defaultValue={user?.name} name='name'
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                Email
                                            </label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='email' type="text" placeholder="Email" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                Education
                                            </label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='education' type="text" placeholder="College/University" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                Address
                                            </label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='address' type="text" placeholder="Address" />
                                        </div>
                                        <div className="mb-4">
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="submit" placeholder="Address" />
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default AboutModal;