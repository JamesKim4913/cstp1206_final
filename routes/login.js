const express = require('express');
const router = express.Router();
const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient()


function mustHaveBody(req, res, next) {
    const { body } = req;
    if (!body) {
        res.status(400).send('you must include JSON!!');
        return;
    }

    next();
}

const VALIDATION = 'VALIDATION';

function ValidationError(propertyName) {
    const error = new Error(`${ propertyName } is not defined properly`);

    error.type = VALIDATION;

    return error;
};

router.get('/', (req,res) => {
  res.render("login.jade", { title: 'Login' });
});

router.post('/', mustHaveBody, async (req,res) => {

    console.log(req.body);

    const { body } = req;
    const { username, password} = body;

    try {
        if (typeof username !== 'string' || !username || !username.trim() || username.length < 3 || username.trim() !== username) {
            throw ValidationError('userName');
        }

        if (typeof password !== 'string' || !password || !password.trim() || password.length < 3 || password.trim() !== password) {
            throw ValidationError('password');
        }
    } catch(error) {
        const { message } = error;
        if (error.type === VALIDATION) {
            res.status(400).send(message);
            return;
        }

        throw error;
    }

    console.log(username);
    console.log(password);

    const user = await prisma.user.findFirst({where: {username: username, password: password}} );
    console.log(user);

});

module.exports = router;
