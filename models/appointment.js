const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');
const Doctor = require('./doctor');

const Appointment = sequelize.define('appointment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  doctorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Doctor,
      key: 'id'
    }
  },
  appointmentTime: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Define relationships
Appointment.belongsTo(User, { foreignKey: 'userId' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });

module.exports = Appointment;
