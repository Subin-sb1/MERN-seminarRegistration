import createError from 'http-errors';
import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import cloudinary from './config/cloudinary.js';
import adminRouter from './routes/admin.js'; 
import userRouter from './routes/user.js';

const app = express();
connectDB();
cloudinary

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//api endpoints

app.use('/', userRouter);
app.use('/admin', adminRouter);


// catch 404 and forward to error handler


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;