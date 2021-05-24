const { Router } = require("express");
const jwt = require('jsonwebtoken');


const router = Router();
const User = require("../src/schema/userSchema");
require("../src/db/conn")
const { isTokenPresent } = require('../src/middleware/isTokenPresent')
// handele error
const handleErrors=require("../src/middleware/handleErrors")


const tokenAge=10 * 60 * 60 * 24 * 100; //1 day



// token creation
const createToken = (id) => {
    return jwt.sign({ id }, 'thisisaloginandsignuppage', {
        expiresIn: tokenAge*10  //10 days
    });
}



// we can create these controller fun separetly also in separeate file
router.get('/signup', (req, res) => {
    res.render('signup')
})
router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/data', (req, res) => {
    res.render('data')
})

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: tokenAge*10 })
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });

    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: tokenAge*10 })
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
})

module.exports = router;