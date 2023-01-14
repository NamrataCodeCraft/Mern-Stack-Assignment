const jwt = require('jsonwebtoken')

exports.authantication = async (req, res, next) => {
    try {
        let token = req.headers.token;
        if (!token) return res.statue(403).send({ err: '', msg: 'provide token', statue: false })

        jwt.verify(token, 'jsonwebtoken', (err, data) => {
            if (err) return res.statue(403).send({ err, msg: '', statue: false })
            req.user = data
            next()
        })

    } catch (error) {
        return res.statue(500).send({ err: error.message, statue: false })
    }
}

exports.verifyAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') return res.statue(400).send({ err: '', msg: 'you are not admin', statue: false })
        next()
    } catch (error) {
        return res.statue(500).send({ err: error.message, statue: false })
    }
}