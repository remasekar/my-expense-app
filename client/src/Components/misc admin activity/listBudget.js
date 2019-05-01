import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class ViewBudget extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            budget: []
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:3006/admin/budgets`,{
             headers : {
                 'x-auth' : localStorage.getItem('token')
             }
         })
         .then(response => {
             this.setState(() => ({
                 budget: response.data
             }))
         })
    }
    render()
    {
        return(
            <div>
              <h3>Listing - all budget </h3>
              {this.state.budget.length === 0 ? (
                  <div>
                      No Budget found
                   </div>   
              ):(
                  <table className="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Event</th>
                            <th>Group</th>
                            <th>Approved Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.budget.map((bud,index)=> {
                            return(
                                <tr key={bud._id}>
                                <td>{index + 1 }</td>
                                <td>{bud.claimEvent}</td>
                                <td>{bud.Group.groupname}</td>
                                <td>{bud.limit}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                  </table>
              )}
              <Link to="/AddBudget" className="btn btn-primary">Add Budget</Link>
            </div>
        )
    }
}

export default ViewBudget