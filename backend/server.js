const {DB,Test} = require('./modules')
const express = require('express') // Express framework for building APIs
const cors =require('cors')
const connectDB = require('./config/db')

// Create an instance of the Express application
const app = express();

connectDB()

// Enable Cross-Origin Resource Sharing for handling requests from different origins
app.use(cors());

// Parse incoming request bodies as JSON
app.use(express.json());
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/booking', require('./routes/book'))
app.use('/api/hostels', require('./routes/hostels'))

// Create a database connection using MySQL

const Port = 8081
// Start the Express server and listen on port 8081

app.listen(Port, console.log(`listening on port :${Port}`));
    
