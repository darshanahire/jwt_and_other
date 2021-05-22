const { Router } = require("express");
const jwt = require('jsonwebtoken');


const router = Router();
const User = require("../src/schema/schema");
const { requireauth } = require('../src/middleware/authmiddleware')
require("../src/db/conn")



// handele error
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // incorrect email->login
    if (err.message === 'incorrect Email') {
        errors.email = 'this email is not registerd';
    }
    if (err.message === 'incorrect Password') {
        errors.password = 'this is incorrect password';
    }


    // dublicate email->signup

    if (err.code === 11000) {
        errors.email = 'that email is already registred';
        return errors;
    }



    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })

    }
    return errors;
}




// token creation

const createToken = (id) => {
    return jwt.sign({ id }, 'thisisaloginandsignuppage', {
        expiresIn: 10 * 60 * 60 * 24 * 1000  //10 days
    });
}



// we can create these controller fun separetly also in separeate file
router.get('/data', requireauth, (req, res) => {
    res.render('data')
})
router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 864000000 })
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
        res.cookie('jwt', token, { httpOnly: true, maxAge: 864000000 })
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
})

module.exports = router;