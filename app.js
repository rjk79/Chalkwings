const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const climbs = require("./routes/api/climbs");
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);


mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

// routes
app.use("/api/users", users);
app.use("/api/climbs", climbs);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

let server = app.listen(port, () => console.log(`Server is running on port ${port}`));


//socket.io
const socketIO = require('socket.io');
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));

    socket.on('send', message => { //use socket instead of io 
        io.emit('receive', message) //use io instead of socket to emit to all other sockets
    })
});

// setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
