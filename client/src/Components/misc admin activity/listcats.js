import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class ViewCats extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            cats: []
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:3006/admin/cats`,{
             headers : {
                 'x-auth' : localStorage.getItem('token')
             }
         })
         .then(response => {
             this.setState(() => ({
                 cats: response.data
             }))
         })
    }

    render()
    {
        return(
            <div>
              <h3>Listing - all Categories </h3>
              {this.state.cats.length === 0 ? (
                  <div>
                      No Categories found
                   </div>   
              ):(
                  <table className="table">
                    <thead>
                        <tr>
                            <th> id </th>
                            <th>Category </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cats.map((cat,index)=>{
                          return(
                              <tr key={cat._id}>
                              <td>{index + 1 }</td>
                              <td>{cat.categoryname}</td>
                              </tr>
                          )
                        })}
                    </tbody>
                  </table>
              )}
            <Link to="/AddCat" className="btn btn-primary">Add Category</Link>

            </div>
        )
    }
}

export default ViewCats