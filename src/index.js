const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const method0verride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

//inicializaciones 
const app = express();
require('./database');

//Confi
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//Midderware
app.use(express.urlencoded({ extended: false }));
app.use(method0verride('_method'));
app.use(session({
    secret: 'mysecredapp',
    resave: true,
    saveUninitialized: true

}));
app.use(flash());
//Variables Globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
    next();
});
//rautes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
//static files
app.use(express.static(path.join(__dirname, 'public')));
//server is listenning
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});