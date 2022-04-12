const express = require('express');
const path = require('path');

// const homeRouter = require('./routes/home');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
// const logoutRouter = require('./routes/logout');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/home', homeRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
// app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
// app.use((req, res, next) =>{
//     next(createError(404));
// });

app.listen(port,
    () => {
        console.log(`listening on PORT: ${ port }`);
    }    
);

module.exports = app;  