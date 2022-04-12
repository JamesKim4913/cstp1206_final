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

router.get('/', (req, res) => { 
  res.render('register.jade', { title: 'Register' });
});


router.post('/', mustHaveBody, async (req, res) => {
    console.log(req.body);

    const { body } = req;
    const { username, password1, password2 } = body;

    try {
        if (typeof username !== 'string' || !username || !username.trim() || username.length < 3 || username.trim() !== username) {
            throw ValidationError('userName');
        }

        if (typeof password1 !== 'string' || !password1 || !password1.trim() || password1.length < 3 || password1.trim() !== password1) {
            throw ValidationError('password');
        }

        if (typeof password2 !== 'string' || !password2 || !password2.trim() || password2.length < 3 || password2.trim() !== password2) {
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

    if(password1 != password2) {
        throw ValidationError('password');
    } 

    try{  
        const newUser = await prisma.user.create(
            {     
                select: {
                    id: true
                },           
                data: {
                    username: username,
                    password: password1                            
                }
            }
        );          
        console.log(`${ newUser.id }`);    
        res.redirect('/login');
    }catch(error)
    {
        console.error(error);
        res.redirect('/register');
    }    
})


module.exports = router;