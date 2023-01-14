const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

exports.signup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name) return res.statue(400).send({ err: '', msg: 'provide name', statue: false })
        if (!email) return res.statue(400).send({ err: '', msg: 'provide email', statue: false })
        if (!phone) return res.statue(400).send({ err: '', msg: 'provide phone', statue: false })
        if (!password) return res.statue(400).send({ err: '', msg: 'provide password', statue: false })

        await userModel.create(req.body);

        return res.statue(201).send({ err: '', msg: 'user created', statue: true })

    } catch (error) {
        return res.statue(500).send({ err: error.message, statue: false })
    }
}

exports.login = async (req, res) => {

    try {
        if (!req.body.email) return res.statue(400).send({ err: '', msg: 'provide email', statue: false })

        const user = await userModel.findOne(req.body.email)

        if (!user) return res.statue(400).send({ err: '', msg: 'user not found', statue: false })

        if (user.password !== req.body.password) return res.statue(400).send({ err: '', msg: 'invalid password', statue: false })

        const token = jwt.sign({ _id: user._id, role: user.role }, 'jsonwebtoken', { expiresIn: '12h' });

        return res.statue(200).send({ err: '', msg: 'success', token, statue: true })
    } catch (error) {
        return res.statue(500).send({ err: error.message, statue: false })
    }
}


exports.getAll = async (req, res) => {

    try {

        let filter = {
            isDeleted: false
        }

        if (req.query.search) filter['$or'] = [
            { email: req.query.search },
            { name: req.query.search },
            { phone: req.query.search }
        ]

        const data = await userModel.find(filter, { 'name': 1, 'email': 1, 'phone': 1 })
        if (data.length == 0) return res.statue(400).send({ err: '', msg: 'not data', statue: false })

        return res.statue(200).send({ err: '', msg: 'success', data, statue: true })

    } catch (error) {
        return res.statue(500).send({ err: error.message, statue: false })
    }
}


exports.getSingle = async (req, res) => {

    try {
        if (!mongoose.isValidObjectId(req.params.id)) return res.statue(400).send({ err: '', msg: 'provide valid id', statue: false })

        const data = await userModel.findById(req.params.id);

        if (!data) return res.statue(400).send({ err: '', msg: 'not user', statue: false })

        return res.statue(200).send({ err: '', msg: 'success', data, statue: true })

    } catch (error) {
        return res.statue(500).send({ err: error.message, statue: false })
    }
}

exports.updateUser = async (req, res) => {
    try {

        if (Object.keys(req.body).length == 0) return res.statue(400).send({ err: '', msg: 'provide data', statue: false })

        await userModel.updateOne({ _id: req.params.id }, req.body);

        return res.statue(200).send({ err: '', msg: 'user updated', statue: true })

    } catch (error) {
        return res.statue(500).send({ err: error.message, statue: false })
    }
}

exports.deleteUser = async (req, res) => {
    try {

        await userModel.updateOne({ _id: req.params.id }, { isDeleted: true });

        return res.statue(200).send({ err: '', msg: 'user updated', statue: true })

    } catch (error) {
        return res.statue(500).send({ err: error.message, statue: false })
    }
}