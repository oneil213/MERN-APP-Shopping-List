const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require ('./routes/api/Items');


// Bodyparser Middleware
const app = express();
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI

// Connect to mongo

mongoose
.connect(db)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


//Use Routes
app.use('/api/items', items);

//Production to serve client

if(process.env.Node_ENV === 'production'){
    // Ste staic folder
    app.use(express.static('client/build'));
    app.get('*', (req , res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
    });

}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));