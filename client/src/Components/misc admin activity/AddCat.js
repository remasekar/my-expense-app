import React from 'react'
import axios from 'axios'


class AddCat extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            categoryname: ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            categoryname: this.state.categoryname
        }
        console.log(formData)
        axios.post('http://localhost:3006/admin/categorynew',formData,{
            headers: {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log(response.data)
            this.props.history.push("/ViewCats")
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
                    Category
                    <input type="text"
                           name="categoryname"
                           value={this.state.name}
                           onChange={this.handleChange}
                           className="form-control"
                           placeholder="Enter Category name" />
                </lable>
                </div>
                <input type="submit" className="btn btn-primary" />
             </form>
            </div>
            </div>
        )
    }
}

export default AddCat