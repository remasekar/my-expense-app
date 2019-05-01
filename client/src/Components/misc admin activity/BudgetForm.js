import React from 'react'
import axios from 'axios';

class BudgetForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Group: '',
            limit: 0,
            claimEvent: '',
            schemas: []
        }
    }

    componentWillMount()
    {
      axios.get('http://localhost:3006/admin/groups' ,{
        headers: {
            'x-auth' : localStorage.getItem('token')
        }
    })
    .then(response => {
        console.log("group",response.data)
        this.setState(() => ({
            schemas : response.data
        }))
        // this.props.history.push('/list')
    })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            limit: this.state.limit,
            Group: this.state.Group,
            claimEvent: this.state.claimEvent
        }
        this.props.handleSubmit(formData)
    }
    handleChange = (e) => {
        e.persist()
        // console.log("name",e.target)
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    render()
    {
        return(
            <div className="row">
             <form onSubmit={this.handleSubmit}>
              <div className="form-group">
              <label>
                  Group
                  <select name="Group"
                //   value={this.state.name} 
                  onChange={this.handleChange}
                  className="form-control"> 
                  {
                    (this.state.schemas.length > 0) && this.state.schemas.map((schema) => {
                      return (
                    //   <option>select</option>
                      <option value={schema._id}> {schema.groupname}</option>
                      )
                    })
                  }
                </select>
              </label>
              <div className="form-group">
              <label>
                 Limit
                 <input type="text"
                        name="limit"
                        value={this.state.name}
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter Limit amt" />
             </label>
             <div className="form-group">
                 <label>
                     ExpenseEvent
                     <select name="claimEvent"
                             value={this.state.name}
                             onChange={this.handleChange}
                             className="form-control" >
                         <option>Select</option>   
                         <option value="outing">Outing</option> 
                         <option value="shift-extenstion">Shift Extenstion</option>
                         <option value="go-live" >Project Go-Live</option> 
                    </select>
                 </label>
                 </div>

              </div>
              </div>
              <input type="submit" className="btn btn-primary" />
             </form>
            </div>
        )
    }
}


export default BudgetForm