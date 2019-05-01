import React from 'react'

class BulkExpenseForm extends React.Component
{
    handlechange = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        this.props.handleBulkSubmit(formData)
    }
    
    render()
    {
        return(
            <div className = "row">
              <form onSubmit={this.handleSubmit} >
              <div className="form-group">
                  <label>
                     File to upload
                     <input type="file" 
                            name="uploadfile"
                            onChange={this.handlechange}
                            className="form-control"
                     />
                  </label>
              </div>
              <input type="submit" className="btn btn-primary" />
              </form>

            </div>
        )
    }
}

export default BulkExpenseForm