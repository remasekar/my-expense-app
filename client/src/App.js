import React, { Component } from 'react';
import { BrowserRouter, Route,Link, Switch } from 'react-router-dom'
import axios from 'axios'

import HomeExpenses from './Components/home'
import Login from './Components/shared-user-admin/login'

import ReviewApprove from './Components/admin-only-approve/reviewapprove'

import ExpenseAdd from './Components/shared-user-admin/AddExpense'

import AddUser from './Components/misc admin activity/Adduser'
import ViewUsers from './Components/misc admin activity/listUsers'

import AddBudget from './Components/misc admin activity/AddBudget'
import ViewBudget from './Components/misc admin activity/listBudget'

import AddGroup from './Components/misc admin activity/AddGroup'
import ViewGroups from './Components/misc admin activity/listgroups'

import AddCat from './Components/misc admin activity/AddCat'
import ViewCats from './Components/misc admin activity/listcats'

import ListMyExpenses from './Components/shared-user-admin/Listexpenses'

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      isAuthenticated: false,
      isAdmin: false,
      id: ''
    }
  }
  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.setState(() => ({ 
        isAuthenticated: true 
      }))
    }
    if(localStorage.getItem('isadmin')){
      this.setState(() => ({ 
        isAdmin: true
      }))
    }
    if(localStorage.getItem('id')){
      this.setState(() => ({ 
        id : localStorage.getItem('id')
      }))
    }
  }
  handleAuthentication = (boolean) => {
    this.setState(() => ({
      isAuthenticated: boolean
    }))
  }

  handleisAdmin = (boolean) => {
    this.setState(()=>({
      isAdmin: boolean
    }))
  }
  handleId = (val) => {
    this.setState(()=> ({
       id : val
    }))
  }
 
  render() {
    return (
      <BrowserRouter>
          <div className="container" >
           <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <Link className="navbar-brand" >My Expense App</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                { this.state.isAuthenticated ? (
                  <React.Fragment>
                    {this.state.isAdmin ? (
                      <React.Fragment>
                       <Link to = {`/home/${this.state.id}`} className="nav-item nav-link">HomeAdmin</Link>
                       <Link to="/ReviewApprove" className="nav-item nav-link">Review and Approve</Link>
                      </React.Fragment>
                      ) : 
                      ( 
                        <Link to={`/userexpenses/${this.state.id}`} className="nav-item nav-link"> Home </Link> 
                      )
                      }
                      <Link to="/users/logout" className="nav-item nav-link">Logout</Link>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link to="/users/login" className="nav-item nav-link">Login</Link>
                  </React.Fragment>
                )}
              </div>
            </div>
        </nav>
        <Switch>
          <Route path="/users/login" render={(props) => {
            return <Login {...props} handleAuthentication={this.handleAuthentication} handleisAdmin={this.handleisAdmin} handleId={this.handleId}/>
          }} /> 
          <Route path="/users/logout" render={(props) => {
            axios.delete('http://localhost:3006/users/logout', {
              headers: {
                'x-auth': localStorage.getItem('token')
              }
            })
            .then(response => {
              props.history.push('/users/login')
              this.setState(() => ({
                isAuthenticated: false,
                isAdmin: false
              }))
              localStorage.removeItem('token')
              localStorage.removeItem('id')
              localStorage.removeItem('isadmin')
            })
          }} />
          <Route path="/userexpenses/:id" render={(props) => {
            return <ListMyExpenses {...props} id={this.state.id}/>}}  />
          <Route path="/home/:id" component={HomeExpenses}  />
          <Route path="/ReviewApprove" component={ReviewApprove} />
          <Route path="/expenses/new" component={ExpenseAdd} />

          <Route path="/AddUser" component={AddUser} />
          <Route path="/ViewUsers" component={ViewUsers} />

          <Route path="/Addbudget" component={AddBudget} />
          <Route path="/ViewBudget" component={ViewBudget} />

          <Route path="/AddGroup" component={AddGroup} />
          <Route path="/ViewGroups" component={ViewGroups} />

          <Route path="/AddCat" component={AddCat}/>
          <Route path="/viewCats" component={ViewCats}/>
          
          </Switch>



       </div>
      </BrowserRouter>
     
    );
  }
}

export default App;
