/*  MODULES */
const config = require('config');
const express = require('express');
const helmet = require('helmet');

const home = require('./routes/home');

    
/* DEFINE APP */
const app = express();
var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8888'}));

/* VIEW */
app.set('view engine', 'pug');
app.set('views', './views');

/* MIDDLEWARES */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());


/*  ROUTES MIDDLEWARES*/
app.use('/', home);

/*  LISTEN  */
app.listen(8888);