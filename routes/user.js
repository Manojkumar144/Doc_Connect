const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const forgotPasswordController = require('../controllers/forgotPasswordController');

const authenticateMiddleware = require('../middleware/auth');

router.post('/signUp', userController.postAddUser);

router.post('/dashboard',userController.postLoginUser);

router.get('/doctordetails',userController.getDoctorsDetails);

router.get('/slotdetails/:id',userController.getSlotsDetails);

router.get('/slots',userController.getSlotsDetailsPage);

router.get('/homepage',userController.getHomePage);

router.post('/bookslot',authenticateMiddleware.authenticateToken,userController.postBookSlot);

router.get('/appointment',authenticateMiddleware.authenticateToken,userController.getAppointmentDetails);

router.post('/cancelappointment',authenticateMiddleware.authenticateToken,userController.postCancelAppointment);

router.get('/myappointment',userController.getAppointmentDetailsPage);

router.get('/forgotpassword',forgotPasswordController.forgetPassPage);

router.post('/forgotpassword', forgotPasswordController.forgotPassword);

router.get('/resetpassword/:id', forgotPasswordController.resetPassword)

router.get('/updatepassword/:id',forgotPasswordController.updatePassword)

module.exports = router;
