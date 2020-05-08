const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');



// Bodyparser Middleware
const app = express();
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// Connect to mongo

mongoose
.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


//Use Routes
app.use('/api/items', require ('./routes/api/Items'));
app.use('/api/shoppers', require ('./routes/api/users'));
app.use('/api/auth', require ('./routes/api/auth'));


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