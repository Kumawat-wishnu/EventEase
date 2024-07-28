import React, {useEffect, useState} from 'react';
import UpdateEventForm from '../updateEvent/updateEvent';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './userDetails.css';

const UsersTable=()=>{
    console.log("hello we are in eventable function");
    const [users, setUsers]=useState([]);
    const [userToUpdate, setUserToUpdate]= useState(null);
    const [newRole, setNewRole]= useState('');
    const navigate=useNavigate();
    // const [eventToUpdate, setEventToUpdate]= useState(null);

    const fetchUsers=()=>{
      
      axios.get('http://localhost:3009/user/getAllUsers')
        .then(response => {
          if (response.data.success && Array.isArray(response.data.users)) {
            setUsers(response.data.users);
            console.log('users:', response.data.users);
          } else {
            console.error('API did not return a valid users array:', response.data);
          }
        })
        .catch(error => console.error('Error fetching users:', error));
    }


    useEffect(() => {
        // Fetch events from the backend
        fetchUsers();
       
    }, []);

 
    //---------------------------------------->
      const deleteUser = (userId) => {
        console.log('i am in deleteUser');
        axios.delete(`http://localhost:3009/user/deleteUser/${userId}`)
          .then(response => {
            // Remove the deleted event from the state
            setUsers(users.filter(user => user.user_id !== userId));
            console.log(response.data.message);
          })
          .catch(error => console.error('Error deleting user:', error));
      };

      const handleRoleUpdate=(userId)=>{
        axios.put(`http://localhost:3009/user/updateUserRole/${userId}`, { role:newRole })
        .then(response=>{
          if(response.data.success){
            fetchUsers();
            setUserToUpdate(null);
          }
        })
        .catch(error => console.error('Error updating user role:', error));
      }


      return (
        <div className="events-table-container">
        <h2>Users</h2>
        <table className="events-table">
          <thead>
            <tr>
              <th>UserID</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                {userToUpdate === user.user_id ? (
                  <div className="dropdown-container">
                  <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  </div>
                ) : (
                  user.role
                )}
                </td>
                <td>
                  <button className="delete" onClick={() => deleteUser(user.user_id)}>Delete</button>
                  {/* <button className="update" onClick={() => goToUpdateEvent(event.id)}>Update</button> */}
                  {userToUpdate === user.user_id ? (
                  <button className="update" onClick={() => handleRoleUpdate(user.user_id)}>Save</button>
                ) : (
                  <button className="update" onClick={() => setUserToUpdate(user.user_id)}>Update</button>
                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {eventToUpdate && <UpdateEventForm event={eventToUpdate} onUpdate={handleUpdate}/>} */}
      </div>
      );
}

export default UsersTable;