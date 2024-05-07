const sequelize = require('../config/connection');
const Customer = require('../models/Customer');

const customerData = require('./customerData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await Customer.bulkCreate(customerData);
  process.exit(0);
};

seedDatabase();
