const express = require('express');
const app = express();
const {Model} = require('objection')
const Knex = require('knex')
const path = require('path')
const knexConfig = require('./knexfile');
const knex = Knex(knexConfig.development)
const authRoutes = require('./Routes/authRoutes');
const pollRoutes = require('./Routes/pollRoutes');
const  voteRoutes = require('./Routes/voteRoutes')
const asyncMiddleWare = require('./Middleware/asyncMiddleWare')
const cors = require('cors')

Model.knex(knex);

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/api/auth', authRoutes)
app.use('/api/poll', pollRoutes)
app.use('/api/votes', voteRoutes )

app.use(function(error, req,res,next){
    const parsedError = JSON.parse(error.message)
    if (!error.statusCode) error.statusCode = 500;
    if (!error.message) error.message = JSON.stringify({type: "Error", message: 'Something went wrong on our end sorry about that'})
    res.status(parsedError.statusCode).json(parsedError)
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public', 'angular', 'dist', 'pollingangular')));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'angular', 'dist','pollingangular', 'index.html'));
  });


app.listen(process.env.PORT || 3000, () =>{
    console.log('listening of port 3000')
})