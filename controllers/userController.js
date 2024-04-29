const User = require('../models/user');
const Doctor = require('../models/doctor');
const Slot = require('../models/slot');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const path =require('path');
const Appointment = require('../models/appointment');
const sequelize = require('../util/database');
const { Console } = require('console');

function generateToken(id)
{
   return jwt.sign({userId :id}, process.env.ACCESS_TOKEN_SECRET);
}

//Add user details to user table
exports.postAddUser = async (req, res, next) => {
    console.log('Received form data:', req.body);
    const { name, email, password,phoneNumber} = req.body;
  
    try {
      const user = await User.findOne({
        where: { email: email }
      });
  
      if (user) {
        return res.status(404).send(`
        <script>
          alert("User already exists, Please login!");
          window.location.href = '/';
        </script>
      `);
      }
    
      //Randomization of strings
      // more saltround value leads to less similarity of password but slows down the application
      const saltRounds=10;
  
      //encrypt the password before storing it
      const hashedPassword= await bcrypt.hash(password, saltRounds);
  
      // Create user
      const createdUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber
      });
      
      console.log('Created user:', createdUser.name);
      return res.status(404).send(`
          <script>
            alert("User Created Successfully, Please login!");
            window.location.href = '/';
          </script>
        `);
  
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  };


  //Add user details to user table
exports.postAddUser = async (req, res, next) => {
    console.log('Received form data:', req.body);
    const { name, email, password,phoneNumber} = req.body;
  
    try {
      const user = await User.findOne({
        where: { email: email }
      });
  
      if (user) {
        return res.status(404).send(`
        <script>
          alert("User already exists, Please login!");
          window.location.href = '/';
        </script>
      `);
      }
    
      //Randomization of strings
      // more saltround value leads to less similarity of password but slows down the application
      const saltRounds=10;
  
      //encrypt the password before storing it
      const hashedPassword= await bcrypt.hash(password, saltRounds);
  
      // Create user
      const createdUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber
      });
      
      console.log('Created user:', createdUser.name);
      return res.status(404).send(`
          <script>
            alert("User Created Successfully, Please login!");
            window.location.href = '/';
          </script>
        `);
  
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  };

//Check the exisitng users
exports.postLoginUser = async (req, res, next) => {
    console.log('Received login form data:', req.body);
    const { email, password } = req.body;
  
    try {
      // Check if the user with the given email exists
      const user = await User.findOne({
        where: { email: email }
      });
  
      if (!user) {
        // User not found
        return res.status(404).send(`
          <script>
            alert("User not found, Please sign up!");
            window.location.href = '/';
          </script>
        `);
      }
      
      const isPassword = await bcrypt.compare(password, user.password);
  
      // Check if the provided password matches the stored password
      if (!isPassword) {
        // Password doesn't match
        return res.status(401).send(`
          <script>
            alert("Incorrect password, please try again!");
            window.location.href = '/';
          </script>
        `);
        
      }
  
      // Password is valid, user is authenticated
      console.log('Successfully logged in');
      res.status(200).json({success: true, message:`User Logged in succesfully`,accessToken: generateToken(user.id),name:user.name});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  exports.getDoctorsDetails = async (req, res) => {
    try{
      const doctorDetails = await Doctor.findAll();
      res.status(200).json({doctorDetails:doctorDetails})     
  } catch (err){
  console.log(err)
  res.status(500).json(err)
  }
    };

    exports.getSlotsDetails = async (req, res) => {
      try{
         const doctorId= req.params.id;

        const slotDetails = await Slot.findAll({
          where: { doctorId: doctorId , isAvailable : true}
        });
        const doctorDetail =await Doctor.findOne({where :{id:doctorId}});
        res.status(200).json({slotDetails:slotDetails, doctorDetail:doctorDetail})     
    } catch (err){
    console.log(err)
    res.status(500).json(err)
    }
      };

     // to  get the chat page
 exports.getDoctorsDetailsPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', '/home.html'));
};

exports.getHomePage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', '/home.html'));
};

exports.getSlotsDetailsPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', '/slots.html'));
};

exports.postBookSlot = async (req, res) => {
  const t = await sequelize.transaction();
  const { doctorId, timeSlot } = req.body;
  try {
    // Find the slot based on doctorId and timeSlot
    const slot = await Slot.findOne({ where: { doctorId: doctorId, timeSlot: timeSlot } });
    if (slot) {
    
      await Appointment.create({
        userId: req.user.id,
        doctorId,
        appointmentTime:timeSlot,
       
      },{transaction:t});
      // Update the slot's isAvailable to false
      await slot.update({ isAvailable: false }, { transaction: t });
    } else {
      // Handle case where slot is not found
      throw new Error('Slot not found');
    }

    // Commit the transaction
    await t.commit();

    // Send success response
    return res.status(200).json({ success: true, message: 'Slot booked successfully' });
  } catch (err) {
    // Rollback the transaction if there's an error
    await t.rollback();
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAppointmentDetails = async (req, res) => {
  try{
    console.log("Inside the appointment details of userController..");
     console.log("req.user...",req.user.id);
    const appointmentDetails = await Appointment.findOne({
      where: {userId : req.user.id}
    });
    const doctorDetail = await Doctor.findOne({
      where: {id : appointmentDetails.doctorId}
    });
    res.status(200).json({appointmentDetails:appointmentDetails,doctorDetail:doctorDetail})     
} catch (err){
console.log(err)
res.status(500).json(err)
}
  };

  exports.getAppointmentDetailsPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views', '/myappointment.html'));
  };
  
  exports.postCancelAppointment = async (req, res) => {
    const t = await sequelize.transaction();
    console.log("Inside the postCancel appointment.....");
    const { doctorId, appointmentTime } = req.body;
    console.log("doctor id :", doctorId);
    console.log("timeSlot :", appointmentTime);
    try {
        // Find the appointment based on doctorId, appointmentTime, and userId
        const appointment = await Appointment.findOne({ 
            where: { 
                userId: req.user.id, 
                doctorId: doctorId, 
                appointmentTime: appointmentTime 
            } 
        });

        if (appointment) {
            // Update the appointment's status to canceled
            await appointment.destroy();

            // Find the associated slot
            const slot = await Slot.findOne({ 
                where: { 
                    doctorId: doctorId, 
                    timeSlot: appointmentTime 
                } 
            });

            if (slot) {
                // Update the slot's availability to true
                await slot.update({ isAvailable: true }, { transaction: t });
            } else {
                // Handle case where slot is not found
                throw new Error('Slot not found');
            }
        } else {
            // Handle case where appointment is not found
            throw new Error('Appointment not found');
        }

        // Commit the transaction
        await t.commit();

        // Send success response
        return res.status(200).json({ success: true, message: 'Appointment canceled successfully' });
    } catch (err) {
        // Rollback the transaction if there's an error
        await t.rollback();
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

