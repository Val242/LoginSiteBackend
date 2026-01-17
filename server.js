const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const connectToDB = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

// Connect to Database
connectToDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'your-secret-key', // Change this to a secure secret in production
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
