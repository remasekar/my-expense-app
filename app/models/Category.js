const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema ({
    categoryname: {
        type: String,
        required: true
    }
})

const Category = mongoose.model('Category', categorySchema)
module.exports = {Category}