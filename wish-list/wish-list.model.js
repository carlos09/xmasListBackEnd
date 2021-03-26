const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        wishListId: { type: DataTypes.STRING, allowNull: false },
        // wishListItems: { type: DataTypes.ARRAY, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        link: { type: DataTypes.STRING, allowNull: false },
        message: { type: DataTypes.STRING },
        hasBeenPurchased: { type: DataTypes.BOOLEAN, allowNull: false },
        purchasedBy: { type: DataTypes.STRING },
        created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated: { type: DataTypes.DATE }
    };

    const options = {
        timestamps: true
    };

    return sequelize.define('wishListItem', attributes, options);
}