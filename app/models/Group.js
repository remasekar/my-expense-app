const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new Schema ({
    groupname: {
        type: String,
        required: true,
        unique: true
    }
})

const Group = mongoose.model('Group',groupSchema)

module.exports = {
    Group
}