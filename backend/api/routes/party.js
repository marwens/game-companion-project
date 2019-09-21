const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling Get requests to /party'
    })
});
router.get('/:partyId', (req, res, next) => {
    const id = req.params.partyId;
    res.status(200).json({
        message: 'Handling Get requests to /party' + id
    })
});

module.exports = router;