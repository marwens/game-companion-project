const mongoose = require('mongoose');
const express = require('express');
const bcrype = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                bcrype.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(409).json({
                            message: 'Auth Failed'
                        });
                    } else if (result) {
                        const token = jwt.sign({
                                email: user[0].email,
                                userId: user[0].id
                            },
                            process.env.JWT_KEY, { expiresIn: "30d" });
                        return res.status(200).json({
                            message: 'login success',
                            token: token
                        })

                    } else {
                        return res.status(409).json({
                            message: 'Auth Failed'
                        });
                    }

                })

            } else {
                bcrype.hash(req.body.password, 12, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save().then(result => {
                            res.status(201).json({
                                message: 'User created'
                            });
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err,
                                message: 'bad email '
                            })
                        })
                    }
                });
            }
        })


});

module.exports = router;