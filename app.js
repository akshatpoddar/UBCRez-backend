const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const connectDB = require('./utils/db')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const authRoutes = require('./routes/auth.routes')

const {RESIDENCE_OPTIONS, ROOM_TYPES} = require('./utils/constants')

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

// Middleware function to log details of every request
const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.originalUrl}`);
  next(); // Call next() to move on to the next middleware or route handler
};

// Use the middleware in the application
app.use(requestLogger);

app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/auth', authRoutes)

connectDB()

app.get('/', (req, res) => {
  res.send("HELLO UBCREZ")
})

app.get('/residences', (req, res) => {
  res.send({residenceOptions: RESIDENCE_OPTIONS})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
