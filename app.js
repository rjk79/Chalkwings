const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const boulders = require("./routes/api/boulders");
const ropes = require("./routes/api/ropes");
const sports = require("./routes/api/sports");

const teams = require("./routes/api/teams");
const messages = require("./routes/api/messages");
const follows = require("./routes/api/follows");
const challenges = require("./routes/api/challenges");
const images = require("./routes/api/images");

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
app.use('/uploads', express.static('uploads')) //image uploading

app.use("/api/users", users);
app.use("/api/boulders", boulders);
app.use("/api/ropes", ropes);
app.use("/api/sports", sports);
app.use("/api/teams", teams);
app.use("/api/messages", messages);
app.use("/api/follows", follows);
app.use("/api/challenges", challenges);
app.use("/api/images", images);

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

let chatters = {}

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('send chatter', username => {
        chatters[socket.id] = username
        io.emit('receive chatter', Object.values(chatters))
    }) 

    socket.on('disconnect', () => {
        delete chatters[socket.id]
        io.emit('receive chatter', Object.values(chatters))
        console.log('Client disconnected')});
    socket.on('send', message => { //client has sent a message. use socket instead of io. 
        io.emit('receive', message) //send message to clients. use io instead of socket to emit to all other sockets
    })
});

