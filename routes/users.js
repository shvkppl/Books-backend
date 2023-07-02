const User = require("../models/user")
const bcrypt = require("bcrypt")
const express = require("express")
const Joi = require("joi")
const jwt = require("jsonwebtoken")

const JWTSECRET = process.env.JWTSECRET

const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        const { error } = validate(req.body)

        if (error) return res.status(400).send(error.details[0].message)

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        req.body.password = await bcrypt.hash(req.body.password, salt)
        await User.create(req.body)

        res.send("registration successful")
    } catch (error) {
        console.log(error)
        res.send("An error occured")
    }
})


router.post("/login", async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const user = await User.findByPk( req.body.email)
        if (!user) {
            return res.status(400).send("email and password combination is incorrect")
        }
        
        const isPwdValid = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!isPwdValid){
            return res.status(400).send("email and password combination is incorrect")

        }

        const payload = {
              email: user.email
            }
          

        jwt.sign(payload, JWTSECRET, {
            expiresIn: 36000
        }, (err, token) => {
            if (err) throw err
            res.status(200).json({
            token
            })
        })

    } catch (error) {
        console.log(error)
        res.send("Some error occured")
    }
})

const validate = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    return schema.validate(user)
}


module.exports = router
