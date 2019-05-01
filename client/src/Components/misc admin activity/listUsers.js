import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


class ViewUsers extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            users:[]
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:3006/admin/users`,{
             headers : {
                 'x-auth' : localStorage.getItem('token')
             }
         })
         .then(response => {
             console.log("user table",response.data)
             this.setState(() => ({
                 users: response.data
             }))
         })
    }

    render()
    {
        return(
           <div>
               <h3>Listing - all users </h3>
               {this.state.users.length === 0 ? (
                   <div>
                       No Users found
                   </div>    
               ):(
                   <table className= "table">
                     <thead>
                         <tr>
                             <th>id </th>
                             <th> Emp name </th>
                             <th> Email </th>
                             <th> Group </th>
                         </tr>
                     </thead>
                     <tbody>
                         {
                             this.state.users.map((user,index) => {
                                 console.log(user)
                                 return(
                                     <tr key={user._id}>
                                     <td>{index + 1}</td>
                                     <td>{ user.username}</td>
                                     <td>{user.email}</td>
                                     <td>{ user.Group.groupname}</td>
                                     </tr>
                                 )
                             })
                         }
                     </tbody>
                   </table>
               )}

               <Link to="/AddUser" className="btn btn-primary">Add User </Link>
               
           </div>
        )
    }
}

export default ViewUsers