const express = require('express');
const router = express.Router();
router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});
router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});
router.post('/users/signup', (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if(name.length <= 0){
        errors.push({text:'place insert your name'});
    }
    if (password != confirm_password) {
        errors.push({ text: 'Password do not match' });
    }
    if (password.length > 4) {
        errors.push({ text: ' Password must be at least 4 characters' });
    }
    if (erros.length > 0)  {

        res.render ('/user/singnup' , { errors, name, email, password, confirm_password }).lean();
    } else {
        res.send('ok');
    }

});



module.exports = router;