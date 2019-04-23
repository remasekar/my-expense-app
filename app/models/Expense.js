const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    totalAmount : {
        type: Number,
        required: true
    },
    Category: 
        {
                type: Schema.Types.ObjectId,
                ref: 'Category'
        },
    expenseDate: {
        type: Date
    },
    expenseEvent: 
        {
                type: Schema.Types.ObjectId,
                ref: 'Budget'
        },
    claimedBy: 
        {
                type: Schema.Types.ObjectId,
                ref: 'User'
        },
    claimedFor: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    reimburseStatus: {
        type: String,
        default: 'pending'
    }
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = { Expense}