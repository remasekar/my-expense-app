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

router.get('/budgets',authenticateUser, function(req,res)
{
    Budget.find()
    .populate('Group')
    .then(function(budgets){
        res.send(budgets)
    })
    .catch(function(err)
    {
        res.send(err)
    })
})

router.get('/expenses/:id',authenticateUser, function(req,res)
{
    const id=req.params.id
    Expense.find({claimedBy: id})
    .populate('Category')
    .populate('expenseEvent')
    .populate('claimedBy')
    .populate('claimedFor')
    .then(function(expenses){
        res.send(expenses)
    })
    .catch(function(err)
    {
        res.send(err)
    })
})

router.get('/expenses',authenticateUser, authorizeAdminUser,function(req,res)
{
    Expense.find({reimburseStatus: "pending" })
    .populate('Category')
    .populate('expenseEvent')
    .populate('claimedBy')
    .populate('claimedFor')
    .then(function(expenses){
        res.send(expenses)
    })
    .catch(function(err)
    {
        res.send(err)
    })
})

router.post('/expenses',authenticateUser,function(req,res)
{
    let splitVal = req.body.splitVal
    let body= _.pick(req.body,['totalAmount','Category','expenseDate','expenseEvent','claimedBy','claimedFor'])
    let totalAmount = body.totalAmount
    if ( splitVal == 'a'){
        let usernameArr = req.body.claimedFor.split(",")
        if ( usernameArr.length > 1 )
        {
             totalAmount = (totalAmount / (usernameArr.length) )
        }
        else{
             totalAmount = totalAmount
        }
        usernameArr.map((username)=> {
            User.findOne({username})
            .then(function(user)
            {
                if(user)
                {
                body.claimedFor = user.id
                body.totalAmount = totalAmount
                const expense = new Expense(body)
                 expense.save()
                  .then(function(expense)
                  {
                      res.send(expense)
                  })
                  .catch(function(err)
                  {
                      res.send(err)
                  })
                }
            })
        })
    }
    else{
        let customSplit = req.body.claimedFor.split(",")
        customSplit.map((arr)=>{
            let username = arr.substring(0,arr.indexOf("-"))
            User.findOne({username})
            .then(function(user)
            {
                if(user)
                {
                 body.claimedFor = user.id
                 body.totalAmount = (arr.substring((arr.indexOf("-"))+1))
                 const expense = new Expense(body)
                 expense.save()
                 .then(function(expense)
                 {
                   res.send(expense)
                 })
                 .catch(function(err)
                 {
                  res.send(err)
                 })
                }
            })
        })
    }
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

router.get('/groups',authenticateUser,authorizeAdminUser, function(req,res)
{
    Group.find()
    .then(function(group){
        res.send(group)
    })
    .catch(function(err)
    {
        res.send(err)
    })
})


router.put('/expenses/:id',function(req,res)
{
    const id = req.params.id
    Expense.findByIdAndUpdate(id, {reimburseStatus: "approved"} , { new:true} )
        .then(function (expense) {
            res.send({ 
                expense,
                notice: 'updated status' })
        })
        .catch(function (err) {
            res.send(err)
        })
})

router.put('/expenses/reject/:id',function(req,res)
{
    const id = req.params.id
    Expense.findByIdAndUpdate(id, {reimburseStatus: "rejected"} , { new:true} )
        .then(function (expense) {
            res.send({ 
                expense,
                notice: 'updated status' })
        })
        .catch(function (err) {
            res.send(err)
        })
})

router.post('/usernew',authenticateUser,function(req,res)
{
    let body = _.pick(req.body,['username','email','password','Group'])
    const user = new User(body)
    user.save()
    .then(function(user)
    {
        res.send(user)
    })
    .catch(function(err)
    {
        res.send(err)
    })
})

router.get('/users',authenticateUser, function(req,res)
{
    User.find()
    .populate('Group')
    .then(function(users){
        res.send(users)
    })
    .catch(function(err)
    {
        res.send(err)
    })
})

router.get('/cats',authenticateUser, function(req,res)
{
    Category.find()
    .then(function(cats){
        res.send(cats)
    })
    .catch(function(err)
    {
        res.send(err)
    })
})


module.exports = {
    adminRouter: router
}