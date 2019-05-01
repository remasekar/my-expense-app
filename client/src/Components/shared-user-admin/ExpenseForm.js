import React from 'react'
import axios from 'axios'

class ExpenseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            totalAmount: 0,
            Category: '',
            expenseDate: '',
            expenseEvent: '',
            claimedBy: '',
            claimedFor: [],
            reimburseStatus: '',
            splitVal: '',
            inputNum: 0,
            schemasCat: [],
            schemasEvent: [],
            errors: {}
        }
    }
    componentWillMount()
    {
      axios.get('http://localhost:3006/admin/cats' ,{
        headers: {
            'x-auth' : localStorage.getItem('token')
        }
    })
    .then(response => {
        this.setState(() => ({
            schemasCat : response.data
        }))
    })
    axios.get('http://localhost:3006/admin/budgets' ,{
        headers: {
            'x-auth' : localStorage.getItem('token')
        }
    })
    .then(response => {
        this.setState(() => ({
            schemasEvent : response.data
        }))
    })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            totalAmount: this.state.totalAmount,
            Category: this.state.Category,
            expenseDate: this.state.expenseDate,
            expenseEvent: this.state.expenseEvent,
            claimedBy: localStorage.getItem('id'),
            claimedFor: this.state.claimedFor,
            reimburseStatus: this.state.reimburseStatus,
            splitVal: this.state.splitVal
        }
        this.props.handleSubmit(formData)
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
                <form onSubmit={this.handleSubmit}>
                 <div className="form-group">
                   <label>
                       Total Amount
                       <input type="text"
                              name="totalAmount"
                              value={this.state.name}
                              onChange={this.handleChange}
                              className="form-control"
                              placeholder="Enter claim amt" />
                   </label>
                   {this.state.errors.totalAmount && <p className="text text-danger"> {this.state.errors.totalAmount.message} </p>}
                 </div>
                 <div className="form-group" >
                 <label>
                     Category
                     <select name="Category"
                         onChange={this.handleChange}
                         className="form-control" 
                         >
                         {
                          (this.state.schemasCat.length > 0) && this.state.schemasCat.map((schema) => {
                      return (
                              <option value={schema._id}> {schema.categoryname}</option>
                           )
                            })
                         }
                     </select>
                 </label>
                 </div>
                 <div className="form-group">
                     <label>
                         Expense Date
                         <input type="date"
                                name="expenseDate"
                                value={this.state.name}
                                onChange={this.handleChange}
                                className="form-control" />
                     </label>
                 </div>
                 <div className="form-group">
                 <label>
                     ExpenseEvent
                     <select name="expenseEvent"
                             onChange={this.handleChange}
                             className="form-control" >
                             {
                               (this.state.schemasEvent.length > 0) && this.state.schemasEvent.map((schema) => {
                             return (
                                  <option value={schema._id}> {schema.claimEvent}</option>
                                   )
                                })
                             }
                    </select>
                 </label>
                 </div>
                 <div className="form-group">
                    <div className="custom-control custom-radio custom-control-inline">
                      <input type="radio" id="customRadioInline1" name="splitVal" className="custom-control-input" value= "a" onChange={this.handleChange}/>
                      <label className="custom-control-label" for="customRadioInline1" >Equal Split</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadioInline2" name="splitVal" className="custom-control-input" value="b" onChange={this.handleChange} />
                        <label className="custom-control-label" for="customRadioInline2" >Custom Split</label>
                    </div>
                    {this.state.splitVal == 'a'? (
                        <input type = "textarea"
                        name="claimedFor"
                        value={this.state.name}
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="enter in the format e.g. emp1,emp2"
                       />
                    ):(
                        <input type = "textarea"
                        name="claimedFor"
                        value={this.state.name}
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="enter in the format e.g. emp1-100,emp2-200" />
                    )}
                    </div>
                 <input type="submit" className="btn btn-primary" />
                </form>
            </div>
        )
    }
}

export default ExpenseForm