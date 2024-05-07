const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Order extends Model { }

Order.init(
    {
        productName: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        qyt: {
            type: DataTypes.INTEGER
        },
        customer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'customer',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'order'
    }
);

module.exports = Order;
