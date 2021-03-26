const config = require('config.json');
const { Op } = require('sequelize');
const db = require('_helpers/db');

module.exports = {
    getWishListItems,
    addWishListItem
}

// async function getWishListById(id) {
//     const list = await getWishList(id);
//     return list;
// }

// async function getWishList(id) {
//     const list = await db.Account.findByWishListId(id);
//     if (!list) throw 'List not found';
//     return list;
// }

async function getWishListItems(wishListId) {
    const items = await db.WishListItem.findAll({
        wishListId: wishListId
    });

    console.log('wish list items: ', items);
}

async function addWishListItem(wishListId, params) {
    const item = new db.WishListItem(params);
    item.wishListId = wishListId;
    item.created = Date.now();
    item.updated = Date.now();

    await item.save();

    const { id, name, price, link, message, hasBeenPurchased, purchasedBy, created, updated } = item;
    return { id, name, price, link, message, hasBeenPurchased, purchasedBy, created, updated };
}

// async function getWishListById(id) {
//     const account = await db.Account.findByPk(id);
//     const wishList
//     if (!account) throw 'Account not found';
//     return account;
// }