import React from 'react'
import { CgProfile } from "react-icons/cg";
import User from './User';
import { useGetAllUsers } from '/src/context/UsergetAllUsers.jsx';
const Users = () => {
    const {allUsers, loading, error } = useGetAllUsers();
    console.log(allUsers);
    return (
        <div>
            {allUsers.map((user,index)=>{
                return <User key={index} user = {user} />
            })}
        </div>
    )
}

export default Users
