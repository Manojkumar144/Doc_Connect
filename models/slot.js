const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Slot = sequelize.define('slot', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'doctors',
            key: 'id'
        }
    },
    timeSlot: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAvailable:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = Slot;