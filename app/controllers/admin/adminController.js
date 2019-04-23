const express = require('express')
const router = express.Router()
const { User } = require('../../models/User')
const { Category } = require('../../models/Category')
const { Budget } = require ('../../models/Budget')
const { Group } = require('../../models/Group')
const { Expense } = require('../../models/Expense')
const { authenticateUser } = require('../../middlewares/authentication')
const { authorizeAdminUser } = require ('../../middlewares/authoriseUser')
const _= require('lodash')

const csvFilePath = ''
const csv = require('csvtojson')


router.post('/register', function (req, res) {
    //const body = req.body
    let body = _.pick(req.body,['username','email','password','Group'])
    //console.log(body)
    const user = new User(body)
    user.save()
        .then(function (user) {
            //welcomeMail(req.body.email)
            res.send(user)
        })
        .catch(function (err) {
            res.send(err)
        })
})

router.post('/groupnew', authenticateUser,authorizeAdminUser,function(req,res)
{
    let body = _.pick(req.body,['groupname'])
    const group = new Group(body)
    group.save()
      .then(function(group)
      {
          res.send(group)
      })
      .catch(function(err)
      {
          res.send(err)
      })
})

router.post('/categorynew', authenticateUser,authorizeAdminUser,function(req,res)
{
    let body = _.pick(req.body,['categoryname'])
    const category = new Category(body)
    category.save()
      .then(function(category)
      {
          res.send(category)
      })
      .catch(function(err)
      {
          res.send(err)
      })
})

router.post('/budgetnew', authenticateUser,authorizeAdminUser,function(req,res)
{
    let body = _.pick(req.body,['Group','limit','claimEvent'])
    const budget = new Budget(body)
    budget.save()
      .then(function(budget)
      {
          res.send(budget)
      })
      .catch(function(err)
      {
          res.send(err)
      })
})

router.get('/expenses',authenticateUser,authorizeAdminUser, function(req,res)
{
    Expense.find()
    .populate('Category')
    .populate('expenseEvent')
    .populate('claimedBy')
    .populate('claimedFor')
    // .exec(function(error,expense)
    //                 {
    //                     console.log(JSON.stringify(expense,null,"\t"))
    //                 })  
    .then(function(expenses){
        res.send(expenses)
    })
    .catch(function(err)
    {
        res.send(err)
    })
})


router.post('/expenses', authenticateUser, function (req, res) {
    //const body = req.body // const { body } = req 
  //strong parameters

  let loadExpense = {totalAmount: req.body.formData.totalAmount,Category:'',expenseDate:req.body.formData.expenseDate,expenseEvent:'',claimedBy:req.user.id,claimedFor:''}
  let categoryname = req.body.formData.Category
  Category.findOne({categoryname})
  .then(function(category)
  {
     if (category)
     {
         loadExpense.Category = category.id
         let claimEvent = req.body.formData.expenseEvent
         Budget.findOne({claimEvent})
        .then(function(budget)
        {
         if(budget)
          {loadExpense.expenseEvent = budget.id }
          let username = req.body.formData.claimedFor
          User.findOne({username})
          .then(function(user)
          {
           if(user)
           { 
              loadExpense.claimedFor = user.id 
              console.log("load",loadExpense)
              const expense = new Expense(loadExpense)
              expense.save()
                  .then(function (expense) {
                      res.send({
                          expense,
                          notice: 'successfully recorded a expense'
                      })
                  })
                  .catch(function (err) {
                      res.send(err)
                  }) 
           }
          })
         })
     }       
  })   
})

router.post('/csv',authenticateUser,authorizeAdminUser,function(req,res)
{
  let loadExpense = {}
  csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
     console.log(jsonObj)
      loadExpense = jsonObj
  })
  const expense = new Expense(loadExpense)
  expense.save()
  .then(function (expense) {
    res.send({
        expense,
        notice: 'successfully recorded a expense'
    })
})
.catch(function (err) {
    res.send(err)
}) 


})

module.exports = {
    adminRouter: router
}