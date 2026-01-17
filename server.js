const express = require('express');
const session = require('express-session');
const cors = require('cors');
const connectToDB = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

// Connect to Database
connectToDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:5500', // your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

// Handle preflight requests
app.use(cors({
    origin: 'http://localhost:5500', // your frontend URL
    credentials: true,
    methods: ['GET','POST','PUT','DELETE','OPTIONS']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'your-secret-key', // change this in production
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set true if using HTTPS
}));

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
