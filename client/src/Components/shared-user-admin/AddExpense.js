import React from 'react'
import axios from 'axios'
import ExpenseForm from './ExpenseForm'
import BulkExpenseForm from './BulkExpenseForm'

class ExpenseAdd extends React.Component {

    handleSubmit = (formData) => {
        console.log("expenseform",formData)
        axios.post('http://localhost:3006/admin/expenses',formData ,{
            headers: {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response => {
            this.props.history.push(`/userexpenses/${localStorage.getItem('id')}`)
        })
    }
    
    handleBulkSubmit = (formData) => {
        axios.post('http://localhost:3006/users/csv',formData ,{
            headers: {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response => {
            this.props.history.push('/list')
        })
    }

    render() {
        return(
            
                <div className = "row">
                  <div className="col-md-4 offset-2">
                       <h2>Add Expense</h2>
                       <ExpenseForm handleSubmit={this.handleSubmit}/>
                  </div>
                  <div className = "col-md-4 offset-2">
                       <h2>Bulk Expense</h2>
                       <BulkExpenseForm handleBulkSubmit={this.handleBulkSubmit}/>
                  </div>
                </div>
            
        )
    }
}

export default ExpenseAdd