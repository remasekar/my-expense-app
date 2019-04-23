const mongoose = require('mongoose')
const Schema = mongoose.Schema

const budgetSchema = new Schema ({
    Group: 
        {
                type: Schema.Types.ObjectId,
                ref: 'Group'
        },
    limit: {
        type: Number,
        default: 0
    },
    claimEvent:{
         type: String,
    }
})

const Budget = mongoose.model('Budget',budgetSchema)
module.exports = {Budget}