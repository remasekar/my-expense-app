import React from 'react'
import axios from 'axios'
import ListTable from '../shared-user-admin/ListTable'

class ReviewApprove extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            expenses: []
        }
    }
    componentDidMount() {
                 axios.get(`http://localhost:3006/admin/expenses`,{
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
    handleApprove = (id) =>
    {
        axios.put(`http://localhost:3006/admin/expenses/${id}`,{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response => {
        })
    }
    handleReject = (id) =>
    {
        axios.put(`http://localhost:3006/admin/expenses/reject/${id}`,{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response => {
             console.log(response.data)
        })
    }
    render()
    {
    return(
        <div>
            <h3> Listing pending expenses for approval </h3>
            {this.state.expenses.length === 0 ? (
                <div>
                    No expenses found for approval.
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
                          {/* <th> Claimed by </th> */}
                          <th> Status </th>
                          <th> Action </th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          this.state.expenses.map ((expense,index) => {
                              return (
                                  <ListTable seq={index + 1 } id= { expense._id} Name= {expense.claimedBy.username} Date={expense.expenseDate} Event = {expense.expenseEvent.claimEvent} Amount = { expense.totalAmount}  status = { expense.reimburseStatus} isadmin={true} handleApprove={this.handleApprove} handleReject={this.handleReject}/>
                              )
                          })
                      }
                  </tbody>
                </table>
            )}

        </div>
    )
    }

}

export  default ReviewApprove