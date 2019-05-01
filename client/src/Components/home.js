import React from 'react'
import ListMyExpenses from './shared-user-admin/Listexpenses'
import { Link } from 'react-router-dom'

class HomeExpenses extends React.Component{
 
    render()
    {
        return(
            <div className="row" >
               <div className="col-md-8 ">
                  <h3> Listing my expenses </h3>
                    <ListMyExpenses id={this.props.match.params.id}/>
                </div>    
                <div className="col-md-3 offset-1 ">
                <h3> Misc Admin Activity</h3>
                <div>
                    <Link to={`/AddUser`}>
                       Add /
                    </Link>
                    <Link to={`/ViewUsers`}>
                       View Users
                    </Link>
                </div>
                <div>
                       <Link to={`/Addbudget`}> 
                                 Add /
                       </Link>
                       <Link to={`/ViewBudget`}>
                                View Budget
                       </Link>
                </div>  
                <div>
                    <Link to={`/AddGroup`}>
                         Add /
                    </Link>
                    <Link to={`/ViewGroups`}>
                         View Group
                    </Link>
                </div>
                <div>
                    <Link to={`/AddCat`}>
                       Add /
                    </Link>
                    <Link to={`/ViewCats`}>
                       View Categories
                    </Link>
                </div>
                </div>
            </div>
        )
    }
}


export default HomeExpenses