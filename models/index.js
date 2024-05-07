// this is where we descrble any relatioships these two have

const Customer = require("./Customer");
const Order = require("./Order");

//Telle Sequelize that every customer can have multiple orders 
Customer.hasMany(Order, {
    onDelete: 'NULL'})

//Tells sequelize that every order only has one customer

Order.hasOne(Customer, {
    foreignKey: 'customer_id'

})



module.exports = {
    Customer,
    Order
};