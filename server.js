const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
require('dotenv/config');
const port = process.env.PORT || 5000;
const routeExercise = require('./routes/exercise');
const routeUser = require('./routes/user');

app.use(cors());
app.use(express.json());
app.use('/exercise', routeExercise);
app.use('/user', routeUser);

app.get('/',(req,res) => {
    res.send('This is home!!!');
});


//connect to db
mongoose.connect(process.env.MONGODB_URI || process.env.DB_CONNECTION , { useNewUrlParser: true, useUnifiedTopology: true } , () => 
                    console.log('Connected to DataBase'));


//for heroku setup
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,'client','build', 'index.html'));
    });
}

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
})