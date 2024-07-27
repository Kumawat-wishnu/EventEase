const express= require('express');
const router= express.Router();
const eventController= require('../Controllers/eventController');

router.post('/createEvent',eventController.createEvent);
router.get('/getAllEvents',eventController.getAllEvents);
router.get('/getEventById/:eventId',eventController.getEventById);
router.get('/getRegisteredUsers',eventController.getRegisteredUsers);
router.get('/search',eventController.searchEvents);
router.put('/updateEvent/:id',eventController.updateEvent);
router.delete('/deleteEvent/:id',eventController.deleteEvent);
router.post('/registerForEvent',eventController.registerForEvent);
router.post('/validateTicket',eventController.validateTicket);
router.get('/getBookingsDetails/:userId',eventController.getBookingsDetails);




module.exports=router;