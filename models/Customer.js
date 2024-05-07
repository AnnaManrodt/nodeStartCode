const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('../config/connection');

class Customer extends Model { 
async verifyPassword(submittedPassword){
    let hashedPassword = this.password
    return await bcrypt.compare(submittedPassword, this.password)
  }
}

Customer.init(
  {
    firstname: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  },
  {

    //this is hashing at the data base level 
    hooks: {
      beforeCreate: async (customerData) => {
        customerData.password = await bcrypt.hash(customerData.password, 10);
        return customerData;
      },
      beforeUpdate: async (customerData) => {
        if (customerData.password) {

          customerData.password = await bcrypt.hash(customerData.password, 10);
          return customerData;
        }
      },
    },
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'customer'
  }
);

module.exports = Customer;
