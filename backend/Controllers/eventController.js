const cloudinary= require('../cloudinary');
const multer=require('multer');
const eventModel= require('../models/eventmodel');
const ErrorHandler= require('../utils/errorhandler');
const path = require('path');
const fs = require('fs');

// const storage=multer.memoryStorage();


// Set up storage engine
const storage = multer.diskStorage({
    destination: './uploads/', // Path to store uploaded files temporarily
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${path.basename(file.originalname)}`);
    }
  });
  
  const upload=multer({storage}).single('image');
  
  // Set up the multer middleware
//   const upload = multer({
//     storage,
//     limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
//   });

const createEvent=async(req,res,next)=>{
    upload(req,res,async function(err){
        if(err){
            return next(new ErrorHandler('Error uploading image',500));
        }

        const {title, description, date,location}=req.body;
        let imageUrl='';

        try{

        if (req.file) {
            // Upload the file buffer to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
              folder: 'event-images',
            });
      
            imageUrl = uploadResult.secure_url;
            console.log("the file path is",req.file.path);
            fs.unlinkSync(req.file.path);
          }
          const eventId = await eventModel.createEvent(title, description, date, location, imageUrl, next);
          res.status(200).json({ success: true, message: `Event is created successfully with eventId=${eventId}` });
        }
        catch (error) {
            console.log('Error creating event:', error);
            return next(new ErrorHandler('Error in creating event', 500));
          }

    });
};


const uploadsDir = path.join(__dirname, '../uploads');

// Function to delete all files in the directory
const cleanUpUploads = async() => {
    fs.readdir(uploadsDir, (err, files) => {
      if (err) {
        console.error('Error reading uploads directory:', err);
        return;
      }
  
      files.forEach((file) => {
        const filePath = path.join(uploadsDir, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log(`Deleted file: ${filePath}`);
          }
        });
      });
    });
  };

// const createEvent=async(req,res,next)=>{
//     const {title, description, date, location}=req.body;
//     try{
//        const eventId= await eventModel.createEvent(title,description,date,location,next);
//        res.status(200).json({success:true, message:`event is created successfully with eventId=${eventId}`});
//     }
//     catch(error)
//     {
//        console.log('Error creating event:', error);
//        return next(new ErrorHandler('Error in creating event',500));
//     }
// };

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
     const {eventId} = req.params;
    try {
        // Call the model function to fetch all events from the database
        const event = await eventModel.getEventById(eventId,next);
         if (!event) {
            return next(new ErrorHandler('Event not found', 404));
          }
        // Send the list of events as a response
        res.status(200).json({ success: true, event});
    } catch (error) {
        console.error('Error getting event by Id:', error);
        return next(new ErrorHandler('Error getting event by Id',500));
        
    }
};

const updateEvent = async (req, res,next) => {

    upload(req,res,async function(err){
        if(err){
            return next(new ErrorHandler('Error uploading image',500));
        }
        
        const eventId = req.params.id;
        const {title, description, date,location}=req.body;
        let imageUrl='';

        try{

        if (req.file) {
            // Upload the file buffer to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
              folder: 'event-images',
            });
      
            imageUrl = uploadResult.secure_url;
            console.log("the file path is",req.file.path);
            fs.unlinkSync(req.file.path);
          }
          const updatedEvent=await eventModel.updateEvent(eventId, title, description, date, location, imageUrl, next);
        
          res.status(200).json({
            success: true,
            data: updatedEvent
        });
        }
        catch (error) {
            console.error('Error updating event:', error);
            return next(new ErrorHandler('Error updating event:',500));
          }

    });


    // const eventId = req.params.id;
    // const { title, description, date, location } = req.body;

    // try {
    //     // Call the model function to update the event in the database
    //     const updatedEvent = await eventModel.updateEvent(eventId,title, description, date, location,next);

    //     // Send the updated event as a response
    //     res.status(200).json({
    //         success: true,
    //         data: updatedEvent
    //     });
    // } catch (error) {
    //     console.error('Error updating event:', error);
    //     return next(new ErrorHandler('Error updating event:',500));
    // }
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

const getBookingsDetails= async(req,res,next)=>{
    const userId= req.params.userId;
    try{
        const bookings= await eventModel.getBookingsDetailsByUserId(userId);
        res.status(200).json({success:true,bookings});
    }
    catch(error)
    {
        console.error('Error fetching bookings details:',error);
        res.status(500).json({success:false,message:'Error fetching bookings details'});
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
    searchEvents,
    getBookingsDetails,
    cleanUpUploads,
    
};