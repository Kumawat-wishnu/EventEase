const eventModel= require('../models/eventmodel');
const ErrorHandler= require('../utils/errorhandler');


const createEvent=async(req,res,next)=>{
    const {title, description, date, location}=req.body;
    try{
       const eventId= await eventModel.createEvent(title,description,date,location,next);
       res.status(200).json({success:true, message:`event is created successfully with eventId=${eventId}`});
    }
    catch(error)
    {
       console.log('Error creating event:', error);
       return next(new ErrorHandler('Error in creating event',500));
    }
};

const getAllEvents = async (req, res,next) => {
    try {
        // Call the model function to fetch all events from the database
        console.log("getAllEvents is triggered");
        const events = await eventModel.getAllEvents(next);

        // Send the list of events as a response
        console.log(events);
        res.status(200).json({ success: true, events});
    } catch (error) {
        console.error('Error getting all events:', error);
        return next(new ErrorHandler('Error getting all events',500));
        
    }
};

const getEventById = async (req, res,next) => {
     const {eventId} = req.body;
    try {
        // Call the model function to fetch all events from the database
        const event = await eventModel.getEventById(eventId,next);

        // Send the list of events as a response
        res.status(200).json({ success: true, event});
    } catch (error) {
        console.error('Error getting event by Id:', error);
        return next(new ErrorHandler('Error getting event by Id',500));
        
    }
};

const updateEvent = async (req, res,next) => {
    const eventId = req.params.id;
    const { title, description, date, location } = req.body;

    try {
        // Call the model function to update the event in the database
        const updatedEvent = await eventModel.updateEvent(eventId,title, description, date, location,next);

        // Send the updated event as a response
        res.status(200).json({
            success: true,
            data: updatedEvent
        });
    } catch (error) {
        console.error('Error updating event:', error);
        return next(new ErrorHandler('Error updating event:',500));
    }
};

const deleteEvent = async (req, res, next) => {
    const eventId = req.params.id;

    try {
        // Call the model function to delete the event from the database
        await eventModel.deleteEvent(eventId,next);

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting event:', error);
        return next(new ErrorHandler('Error deleting event', 500));
    }
};

const registerForEvent=async(req,res,next)=>{
    const {userId,eventId}=req.body;
    try{
       
        const ticketCode=await eventModel.registerForEvent(userId,eventId,next);
        res.status(200).json({success:true, ticketCode});
    }
    catch(error)
    {
        console.error('Error in registering for event', error);
        return next(new ErrorHandler('Error in registering for event', 500));
    }

}

const validateTicket = async (req,res,next) => {
   
       const {ticketCode}= req.body;
    try {
        // Query the database to check if the ticket code exists and is valid
        const eventId=await eventModel.validateTicket(ticketCode,next);
        res.status(200).json({success:true,message:`ticket is valid for eventId=${eventId}`});

       
    } catch (error) {
        console.error('Error validating ticket:', error);
        return next(new ErrorHandler('Error validating ticket', 500));
    }
};

const getRegisteredUsers= async (req, res,next) => {
    try {
        // Call the model function to fetch all events from the database
        const users = await eventModel.getRegisteredUsers(next);

        // Send the list of events as a response
        res.status(200).json({ success: true, users});
    } catch (error) {
        console.error('Error getting all events:', error);
        return next(new ErrorHandler('Error getting all events',500));
        
    }
};


const searchEvents= async(req,res, next)=>{
    const query=req.query.q;
    try{
        const events=await eventModel.searchEvents(query,next);
        res.status(200).json({success:true, events});
    }
    catch(error)
    {
        console.error('Error searching events',error);
        return next(new ErrorHandler('Error searching events',500));
    }
};





module.exports={
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    getEventById,
    registerForEvent,
    validateTicket,
    getRegisteredUsers,
    searchEvents
};