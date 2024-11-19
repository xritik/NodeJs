import React, { useEffect, useState } from 'react'

const Users = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

useEffect(() => {    
    const showUser = async () => {
        try{
            const response = await fetch('http://localhost:8080/users')
            if(response.ok){
                const data = await response.json();
                setUsers(data);
            }else{
                setMessage('Failed to fetch users')
            }
        }
        catch(error){
            console.error('Error fetching Users: ', error);
            setMessage('An error occurred');
        }
    };
    showUser();
}, [users]);

const deleteUser = async (id) => {
    try{
        const response = await fetch(`http://localhost:8080/users/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setMessage('User Deleted successfully!'); // Success message
            setUsers(users.filter(user => user._id !== id))
        } else {
            setMessage('An error occurred when deleting user'); // Error message
        }
    } catch (error) {
        console.error("Error to delete user:", error);
        setMessage('An error occurred. Please try again.');
    }
};

  return (
    <div>
      <h1>All Users</h1>
      {message && <p>{message}</p>}
      <ul>
        {users.map(user => (
          <div key={user._id} style={{display: 'flex'}}>
            <li>{user.username}</li>
            <button className='userDelete' onClick={() => deleteUser(user._id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Users;