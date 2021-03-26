const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.Account = require('../accounts/account.model')(sequelize);
    db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);
    db.WishListItem = require('../wish-list/wish-list.model')(sequelize)

    // define relationships
    db.Account.hasMany(db.RefreshToken, db.wishListItem, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);
    db.WishListItem.belongsTo(db.Account);
    
    // sync all models with database
    await sequelize.sync();
}