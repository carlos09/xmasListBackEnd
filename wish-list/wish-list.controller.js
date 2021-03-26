const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const wishListService = require('./wish-list.service');

router.get('/wishlist/items/:wishListId', authorize(), getWishListItems);
router.post('/wishlist/:wishListId', authorize(), createSchema, addWishListItem);
router.delete('/wishlist/items/:id', authorize(), _deleteWishListItem);

module.exports = router;

function createSchema(req, res, next) {
    console.log('createschema()');
    const schema = Joi.object({
        wishListId: Joi.string().required(),
        name: Joi.string().required(),
        price: Joi.number().required(),
        link: Joi.string().required(),
        message: Joi.string(),
        hasBeenPurchased: Joi.boolean(),
        purchasedBy: Joi.string(),
        created: Joi.date().required(),
        updated: Joi.date()
    });
    validateRequest(req, next, schema);
}

function addWishListItem(req, res, next) {
    console.log('made it in here');
    wishListService.addWishListItem(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Your item has been added' }))
        .catch(next);
}

function getWishListItems(req, res, next) {
    wishListService.getWishListItems(req.params.wishListId)
        .then(item => item ? res.json(item) : res.sendStatus(404))
        .catch(next);
}

function _deleteWishListItem(req, res, next) {
    // users can delete their own account and admins can delete any account
    // if (Number(req.params.id) !== req.user.id && req.user.role !== Role.Admin) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    wishListService.deleteWishListItem(req.params.id)
        .then(() => res.json({ message: 'Item has been deleted' }))
        .catch(next);
}