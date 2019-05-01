import React from 'react'
import axios from 'axios'

class AddGroup extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            groupname: ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            groupname: this.state.groupname
        }
        console.log(formData)
        axios.post('http://localhost:3006/admin/groupnew',formData,{
            headers: {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log(response.data)
            this.props.history.push("/ViewGroups")
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
                <lable>
                    Department Group
                    <input type="text"
                           name="groupname"
                           value={this.state.name}
                           onChange={this.handleChange}
                           className="form-control"
                           placeholder="Enter Dept name" />
                </lable>
                </div>
                <input type="submit" className="btn btn-primary" />
             </form>
            </div>
            </div>
        )
    }
}

export default AddGroup

