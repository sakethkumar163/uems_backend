const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    userName : String,
    name : String,
    type : String,
    description : String,
    date : String,
    time : String,
    venue : String,
    estimatedAttendees : Number,
    item1 : Number,
    item2 : Number,
    item3 : Number
})

const eventModel = mongoose.model('event',eventSchema)

module.exports = eventModel