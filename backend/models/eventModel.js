const db= require('../db/connection');
const ErrorHandler = require("../utils/errorhandler");


const createEvent=async(title,description,date,location,imageUrl,next)=>{
    try{
        const query= 'INSERT INTO events (title, description, date, location, image_url) VALUES (?, ?, ?, ?, ?)';
        const [results]= await db.promise().query(query,[title,description, date, location, imageUrl]);
        return results.insertId;
    }
    catch(error)
    {
        console.error('Error creating event:', error);
        return next(new ErrorHandler('Error creating event:',500));
    }
};

const getAllEvents = async (next) => {
    try {
        // const [rows] = await db.promise().query('SELECT * FROM events');
        const [rows]=await db.promise().query(
   `SELECT events.*, COUNT(user_events.user_id) AS registered_users
    FROM events
    LEFT JOIN user_events ON events.id = user_events.event_id
    GROUP BY events.id;`)
        return rows;
    } catch (error) {
        console.error('Error getting all events from database:', error);
        return next(new ErrorHandler('Error getting all events from database:',500));
    }
};



const getRegisteredUsers = async (next) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM user_events');
        return rows;
    } catch (error) {
        console.error('Error getting all events from database:', error);
        return next(new ErrorHandler('Error getting all events from database:',500));
    }
};

const getEventById= async(eventId,next)=>{
    try{
        const[rows]= await db.promise().query('SELECT * FROM events WHERE id=?',[eventId]);
        if (!rows.length) {
            return next(new ErrorHandler('event not found',500));
        }
        else
        return rows;
    }
    catch(error)
    {
        console.log('Error getting event from database',error );
        return next(new ErrorHandler('Error getting event from database',500));
    }
}

// Update an event in the database
const updateEvent = async (eventId, title, description, date, location, imageUrl, next) => {
    try {

        const [result] = await db.promise().execute(
            'UPDATE events SET title = ?, description = ?, date = ?, location = ?, image_url = ? WHERE id = ?',
            [title, description, date, location, imageUrl, eventId]
        );

        if (result.affectedRows === 0) {
            return next(new ErrorHandler('Event not found',500));
            
        }

        // Fetch and return the updated event from the database
        const [updatedEvent] = await db.promise().query('SELECT * FROM events WHERE id = ?', [eventId]);
        return updatedEvent[0];
    } catch (error) {
        console.error('Error updating event in database:', error);
        return next(new ErrorHandler('Error updating event in database',500));
    }
};

const deleteEvent= async(eventId,next)=>{
    try{
        await db.promise().execute('DELETE FROM events WHERE id=?', [eventId]);
    }
    catch(error)
    {
        console.log('Error deleting Event:',error);
        return next(new ErrorHandler('Error deleting Event:',500));
    }
}


const registerForEvent=async(userId,eventId,next)=>{
    try {
        const ticketCode = generateTicketCode();
        console.log("ticketCode in eventModal is",ticketCode);
        // Insert user event details into the user_events table
        await db.promise().execute('INSERT INTO user_events (user_id, event_id, ticket_code) VALUES (?, ?, ?)', [userId, eventId, ticketCode]);
        return ticketCode;

    } catch (error) {
        console.error('Error registering for event:', error);
        return next(new ErrorHandler('Error registering for event:',500));
    }

}

const generateTicketCode=()=>{
    return Math.random().toString(36).substring(2,10).toUpperCase();
};

const validateTicket=async(ticketCode,next)=>{
    try{
        const [rows] = await db.promise().query('SELECT * FROM user_events WHERE ticket_code = ?', [ticketCode]);

        if (rows.length === 0) {
            return next(new ErrorHandler('Invalid ticket', 500));
        }

        return rows[0].event_id;
    }
    catch(error)
    {
        console.error('Error validating for ticket:', error);
        return next(new ErrorHandler('Error validating for event:',500));
    }
}

const searchEvents=async(query,next)=>{
    try{
        const [rows]=await db.promise().query('SELECT * FROM events WHERE title LIKE ?', [`%${query}%`]);
        if (rows.length === 0) {
            return next(new ErrorHandler('Result not found', 500));
        }
        return rows;
    }
    catch(error)
    {
        console.error('Error searching events:',error);
        return next(new ErrorHandler('Error searching events:',500));

    }
}

const getBookingsDetailsByUserId= async(userId,next)=>{
    const query=`
    SELECT ue.event_id, ue.ticket_code, e.title, e.description, e.date, e.location
    FROM user_events ue
    JOIN events e ON ue.event_id=e.id
    WHERE ue.user_id = ?
    `;
    try{
        const [rows]= await db.promise().query(query, [userId]);
        return rows;
    }
    catch(error)
    {   
        console.error('Error fetching bookings details:',error);
        return next(new ErrorHandler('Error fetching bookings details:',500));
    }
}

module.exports={
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    getEventById,
    registerForEvent,
    validateTicket,
    getRegisteredUsers,
    searchEvents,
    getBookingsDetailsByUserId,
   
};
