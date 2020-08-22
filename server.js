const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const {
    rootRouter,
    linkRouter,
    userRouter
} = require('./routes');
const authenticate = require('./middleware/auth');


const app = express();

app.use(express.json());
app.use(helmet());
app.use(cookieParser());

// routers
app.use('/', rootRouter);
app.use('/link', linkRouter);
app.use('/user', authenticate, userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is launched on port', port);
});
