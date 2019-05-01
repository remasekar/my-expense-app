import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ListTable from './ListTable'

class ListMyExpenses extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            expenses: []
        }
    }
    componentDidMount() {
         axios.get(`http://localhost:3006/admin/expenses/${this.props.id}`,{
             headers : {
                 'x-auth' : localStorage.getItem('token')
             }
         })
         .then(response => {
             this.setState(() => ({
                 expenses: response.data
             }))
         })
    }
    render()
    {
    return(
        <div>
            {/* <h2> Listing expenses </h2> */}
            {this.state.expenses.length === 0 ? (
                <div>
                    No expenses found. Add your first expense
                </div>
            ) :(
                <table className = "table" >
                  <thead>
                      <tr>
                          <th> id </th>
                          <th> Name </th>
                          <th> Date </th>
                          <th> Event </th>
                          <th> Claimed Amt </th>
                          {/* <th> Claimed For </th> */}
                          <th> Status </th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          this.state.expenses.map ((expense,index) => {
                              return (
                                  <ListTable seq={index + 1 } id= { expense._id} Name= {expense.claimedBy.username} Date={expense.expenseDate} Event = {expense.expenseEvent.claimEvent} Amount = { expense.totalAmount} status = { expense.reimburseStatus} />
                              )
                          })
                      }
                  </tbody>
                </table>
            )}
            <Link to="/expenses/new" className="btn btn-primary">Add Expense</Link>

        </div>
    )
    }
}

export default ListMyExpenses