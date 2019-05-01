import React from 'react'

const ListTable = ( props ) => {
    return (
                  <tr key={props.id}>
                  <td>{ props.seq}</td>
                  <td> { props.Name }</td>
                  <td> { props.Date.substring(0,10) }</td>
                  <td>{props.Event}</td>
                  <td>{props.Amount}</td>
                  {/* <td>{props.ClaimedFor}</td> */}
                  <td>{props.status}</td>
                   {props.isadmin ? (
                       <td> 
                       <button className="btn btn-primary" onClick= {()=> {
                           props.handleApprove(props.id)
                       }} > Approve </button>
                       <button className="btn btn-danger" onClick= {()=> {
                           props.handleReject(props.id)
                       }}> Reject</button>
                       </td>
                  ) :(
                     <td></td>
                  ) }
                 </tr>
             
    )
}

export default ListTable