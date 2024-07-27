import React, {useEffect, useState} from 'react';
import UpdateEventForm from '../updateEvent/updateEvent';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './eventDetails.css';

const EventsTable=()=>{
    console.log("hello we are in eventable function");
    const [events, setEvents]=useState([]);
    const navigate=useNavigate();
    // const [eventToUpdate, setEventToUpdate]= useState(null);

    const fetchEvents=()=>{
      
      axios.get('http://localhost:3009/event/getAllEvents')
        .then(response => {
          if (response.data.success && Array.isArray(response.data.events)) {
            setEvents(response.data.events);
            console.log('events:', response.data.events);
          } else {
            console.error('API did not return a valid events array:', response.data);
          }
        })
        .catch(error => console.error('Error fetching events:', error));
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        // Fetch events from the backend
        fetchEvents();
       
    }, []);

    //     axios.get('http://localhost:3009/event/getAllEvents')
    //       .then(response => {setEvents(response.data)
    //           console.log('eventss',response.data);
    //      })
    //       .catch(error => console.error('Error fetching events:', error));
    //   }, []);

      const deleteEvent = (eventId) => {
        console.log('i am in deleteEvent');
        axios.delete(`http://localhost:3009/event/deleteEvent/${eventId}`)
          .then(response => {
            // Remove the deleted event from the state
            setEvents(events.filter(event => event.id !== eventId));
            console.log(response.data.message);
          })
          .catch(error => console.error('Error deleting event:', error));
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


      // const handleUpdate = (eventId, updatedData, newImage) => {
      //   const formData = new FormData();
      //   Object.keys(updatedData).forEach(key => formData.append(key, updatedData[key]));
      //   if (newImage) {
      //     formData.append('image', newImage);
      //   }
    
      //   axios.put(`http://localhost:3009/event/updateEvent/${eventId}`, formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   })
      //     .then(response => {
      //       if (response.data.success) {
      //         fetchEvents();
      //       }
      //     })
      //     .catch(error => console.error('Error updating event:', error));
      // };

      const handleUpdate=(eventId, updatedData, newImage) => {
        console.log("hello we are in handleUpdate");
        axios.put(`http://localhost:3009/event/updateEvent/${eventId}`, {...updatedData, newImage})
        .then(response=>{
          if(response.data.success) {
            fetchEvents();
          }
        })
        .catch(error => console.error('Error updating event', error));
      };

      const goToUpdateEvent=(eventId)=>{
        navigate(`/updateEvent/${eventId}`)
      }

      return (
        <div className="events-table-container">
        <h2>Events</h2>
        <table className="events-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.title}</td>
                <td>{formatDate(event.date)}</td>
                <td>{event.location}</td>
                <td>
                  <button className="delete" onClick={() => deleteEvent(event.id)}>Delete</button>
                  <button className="update" onClick={() => goToUpdateEvent(event.id)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {eventToUpdate && <UpdateEventForm event={eventToUpdate} onUpdate={handleUpdate}/>} */}
      </div>
      );
}

export default EventsTable;