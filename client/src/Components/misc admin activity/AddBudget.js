import React from 'react'
import axios from 'axios'
import BudgetForm from './BudgetForm'

class AddBudget extends React.Component
{
    handleSubmit = (formData) => {
        axios.post('http://localhost:3006/admin/budgetnew',formData,{
            headers: {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log(response.data)
            this.props.history.push(`/home/${localStorage.getItem('id')}`)
        })
    }
    render()
    {
        return(
            <div className= "row">
              <div className="col-md-4 offset-2">
                <h2> Add Budget </h2>
                <BudgetForm handleSubmit={this.handleSubmit} />
              </div>
            </div>
        )
    }
}

export default AddBudget