const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const eventModel = require('./models/event');
const userRoutes = require('./routes/userRoutes');
const port = 3500;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://saketh1:saketh%402875@cluster0.mcxwgv9.mongodb.net/uems')
    .then(() => {
        console.log('connected');
    })
    .catch((err) => {
        console.log(err);
    });

app.use('/api/users', userRoutes);

app.get('/events', (req, res) => {
    eventModel.find().select("-userName")
        .then(events => { res.json(events); })
        .catch(e => { res.json(e); });
});

app.post('/events', async (req, res) => {
    const {
        userName,
        estimatedAttendees,
        item1,
        item2,
        item3
    } = req.body;
    const name = req.body.eventName;
    const type = req.body.eventType;
    const description = req.body.eventDescription;
    const date = req.body.eventDate;
    const time = req.body.eventTime;
    const venue = req.body.eventVenue;
    const obj = {
        userName,
        name,
        type,
        description,
        date,
        time,
        venue,
        estimatedAttendees,
        item1,
        item2,
        item3
    };
    try {
        const item = await eventModel.create(obj);
        console.log(item);
        res.status(200).json({ "message": `Event ${name} is created` });
    } catch (error) {
        res.status(400).json({ "message": "invalid event data provided" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on the port: ${port}`);
});
