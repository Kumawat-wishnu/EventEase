import React from 'react';
import Events from '../components/Events/Events'

function EventsPage({ searchQuery }){
    return(
        <div className="events-page">
         <Events searchQuery={searchQuery}/>
        </div>
    );
}

export default EventsPage;