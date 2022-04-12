const express = require('express');
const router = express.Router();
const { PrismaClient } = require( '@prisma/client');
const prisma = new PrismaClient()


router.get('/',
    async (req, res) => {
        const users = await prisma.user.findMany(
            {
                orderBy: {
                    id: 'asc'
                }
            }
        );

        console.log(users);
        res.render('users.jade', { title: 'Lists', lists: users });        
    }
);


module.exports = router;