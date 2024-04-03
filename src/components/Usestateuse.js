import React from 'react'
import {useState} from'react';

function Usestateuse() {

    const[state,setState]= useState(0);
    const[text,setText]=useState('old sentence')
    const[asdes,setAsdes]=useState(0);

 const handleChange=(e)=>{
    setText(e.target.value)

 }
 const handleClick=(e)=>{
    console.log('click function worked');
    setText('new Sentence')
 }

 const increment=()=>{
    setAsdes(asdes+1)
 }

 const decrement=()=>{
    setAsdes(asdes-1)
 }

  return (
    <div>
        <p>{state}</p>
        <button  onClick={()=>setState(state+1)}>click</button>
<input type='text' value={text} onChange={handleChange}></input>
<button onClick={handleClick}> textchange button</button>

<p>{asdes}</p>
<button onClick={increment}>add</button>
<button onClick={decrement}>sub</button>

    </div>
  )
}

export default Usestateuse