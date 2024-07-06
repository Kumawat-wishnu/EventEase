import React from 'react';
import {useEffect, useState} from 'react';
import Spinnerr from './spinner';
import './Events.css';
import {Button} from 'react-bootstrap';
import Image1 from '../../images/event1.jpeg';
function Events(){
    const [events, setEvents]= useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch('http://localhost:3009/event/getAllEvents')
        .then(response=> {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        // .then(json=>console.log(json))
        .then(data => {
            setEvents(data.events)
            setLoading(false)})
        .catch(error =>console.error('Error fetching events',error));
        
    },[]);
   

    return(

        <div className="eventsPage">
    {loading ? (
        <Spinnerr/>
    ) : (
        <div>
            <h2 className="S-heading">Upcoming Events</h2>
            <div className="events-list">
                {events.map(event => (
                    <div key={event.id} className="event-card">
                        <div className="event-details">
                            <div className="event-image">
                                <img src={Image1} alt={event.title} />
                            </div>
                            <div className="event-text" >
                                <h3 className="events-heading">{event.title}</h3>
                                <p className="event-date">Date: {event.date}</p>
                                <p className="event-location">Location: {event.location}</p>
                                <p className="event-description">{event.description}</p>
                                <Button style={{ backgroundColor: '#6b42ff', marginLeft:'260px' }} className="custom-button">Register</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )}
</div>
        
        // <div className="eventsPage">
        //     {loading ? (
        //         <Spinnerr/>
        //     ):(
        //        <div>
        //         <h2>Upcoming Events</h2>
        //         <div className="events-list">
        //             {events.map(event=>(
        //                <div key={event.id} className="event-card">
        //                 {/* <img src={event.image} alt={event.title} className="event-image"/> */}
        //                 <div className="event-details">
        //                    <h3 className="events-heading">{event.title}</h3>
        //                    <p className="event-date">Date: {event.date}</p>
        //                    <p className="event-location">Location: {event.location}</p>
        //                    <p className="event-description">{event.description}</p>
        //                    <Button style={{backgroundColor:'#6b42ff'}} className="custom-button">Register</Button>
        //                 </div>
    
        //                </div>
        //             ))}
        //         </div>
        //         </div>
        //     )};
            
        // </div>
    );
}

export default Events;