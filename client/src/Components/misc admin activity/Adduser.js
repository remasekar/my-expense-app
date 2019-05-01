import React from 'react'
import axios from 'axios'

class AddUser extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            Group: '',
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
    })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            Group: this.state.Group,
        }
        console.log(formData)
        axios.post('http://localhost:3006/admin/usernew',formData,{
            headers: {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log(response.data)
            this.props.history.push("/ViewUsers")
        })
    }
    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    render()
    {
        return(
            <div className="row">
            <div className = "col-md-7 offset-2">
             <form onSubmit={this.handleSubmit}>
              <div className="form-group">
              <label>
                  Username
                  <input type="text"
                        name="username"
                         value={this.state.name}
                         onChange={this.handleChange}
                         className="form-control"
                         placeholder="Enter user name" />
              </label>
              </div>
              <div className="form-group">
              <label>
                 Email
                 <input type="email"
                        name="email"
                        value={this.state.name}
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter Email id" />
             </label>
             </div>
             <div className="form-group">
              <label>
                 Password
                 <input type="password"
                        name="password"
                        value={this.state.name}
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter Password" />
             </label>
             </div>
             <div className="form-group">
              <label>
                  Group
                  <select name="Group"
                  onChange={this.handleChange}
                  className="form-control"> 
                  {
                    (this.state.schemas.length > 0) && this.state.schemas.map((schema) => {
                      return (
                      <option value={schema._id}> {schema.groupname}</option>
                      )
                    })
                  }
                </select>
              </label>
              </div>
              <input type="submit" className="btn btn-primary" />
             </form>
             </div>
            </div>
        )
    }
}

export default AddUser