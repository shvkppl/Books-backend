const jwt = require("jsonwebtoken")
const SECRET = process.env.JWTSECRET

module.exports = (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1]
        if (!token) {
            return res.status(403).send("Forbidden")
        }

        jwt.verify(token, SECRET)
        next()
    } catch (error) {
        res.status(400).send("corrupt token")
    }
}
