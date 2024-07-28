const express= require('express');
const router= express.Router();
const userController= require('../Controllers/userController');

router.get('/getAllUsers',userController.getAllUsers);
router.delete('/deleteUser/:id',userController.deleteUser);
router.put('/updateUserRole/:userId',userController.updateUserRole);

module.exports=router;