import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class ViewGroups extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            groups: []
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:3006/admin/groups`,{
             headers : {
                 'x-auth' : localStorage.getItem('token')
             }
         })
         .then(response => {
             this.setState(() => ({
                 groups: response.data
             }))
         })
    }

    render()
    {
        return(
            <div>
              <h3>Listing - all groups </h3>
              {this.state.groups.length === 0 ? (
                  <div>
                      No Group found
                   </div>   
              ):(
                  <table className="table">
                    <thead>
                        <tr>
                            <th> id </th>
                            <th>Department Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.groups.map((group,index)=>{
                          return(
                              <tr key={group._id}>
                              <td>{index + 1 }</td>
                              <td>{group.groupname}</td>
                              </tr>
                          )
                        })}
                    </tbody>
                  </table>
              )}
            <Link to="/AddGroup" className="btn btn-primary">Add Group</Link>

            </div>
        )
    }
}

export default ViewGroups