// this are errors that are shows below the email and password input box in frontend for knowing the user what error is occurs

const { models } = require("mongoose");

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
models.exports=handleErrors;