import React from 'react'

function Propuser(props) {
  return (
    <div>
        <h1>userinformation</h1>
        <h2>{props.name}</h2>
        <h2>{props.age}</h2>
        <h2>{props.email}</h2>
        
        


    </div>
  )
}

export default Propuser