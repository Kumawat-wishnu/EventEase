import React from 'react';
import EventDetails from '../components/Admin/eventDetails';

function EventDetailsPage(){
    console.log("we r in eventDetails page");
  return (
    
    <div className="eventDetailsPage">
    <EventDetails/>
    </div>
  );
}

export default EventDetailsPage;