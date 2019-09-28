const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Party = require('../models/party');
const checkAuth = require('../middelware/check-auth');


router.get('/', checkAuth, (req, res, next) => {
    Party.find().exec().then(parties => {
        res.status(200).json({
            message: 'Handling Get requests to /party',
            parties: parties
        })
    }).catch({

    })

});
router.post('/', (req, res, next) => {
    const party = new Party({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });
    party
        .save()
        .then(result => {
            console.log(result);
        })
    res.status(200).json({
        message: 'Handling Get requests to /party',
        createdparty: party
    })
});
router.get('/:partyId', (req, res, next) => {
    const id = req.params.partyId;
    res.status(200).json({
        message: 'Handling Get requests to /party' + id
    })
});

module.exports = router;