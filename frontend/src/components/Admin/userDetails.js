import React, {useEffect, useState} from 'react';
import UpdateEventForm from '../updateEvent/updateEvent';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './eventDetails.css';

const UsersTable=()=>{
    console.log("hello we are in eventable function");
    const [users, setUsers]=useState([]);
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

    // const formatDate = (dateString) => {
    //   const date = new Date(dateString);
    //   const year = date.getFullYear();
    //   const month = String(date.getMonth() + 1).padStart(2, '0');
    //   const day = String(date.getDate()).padStart(2, '0');
    //   return `${day}-${month}-${year}`;
    // };

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

      // const updateEvent = (eventId, updatedData) => {
      //   axios.put(`http://localhost:3009/event/${eventId}`, updatedData)
      //     .then(response => {
      //       // Update the event in the state
      //       setEvents(events.map(event => event.event_id === eventId ? { ...event, ...updatedData } : event));
      //       console.log(response.data.message);
      //     })
      //     .catch(error => console.error('Error updating event:', error));
      // };


      

    //   const handleUpdate=(eventId, updatedData, newImage) => {
    //     console.log("hello we are in handleUpdate");
    //     axios.put(`http://localhost:3009/event/updateEvent/${eventId}`, {...updatedData, newImage})
    //     .then(response=>{
    //       if(response.data.success) {
    //         fetchEvents();
    //       }
    //     })
    //     .catch(error => console.error('Error updating event', error));
    //   };

    //   const goToUpdateEvent=(eventId)=>{
    //     navigate(`/updateEvent/${eventId}`)
    //   }

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
                <td>{user.role}</td>
                <td>
                  <button className="delete" onClick={() => deleteUser(user.user_id)}>Delete</button>
                  {/* <button className="update" onClick={() => goToUpdateEvent(event.id)}>Update</button> */}
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