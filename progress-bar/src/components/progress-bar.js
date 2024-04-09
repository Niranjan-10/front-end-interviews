import React, { useEffect, useState } from 'react'

const ProgressBar = ({start, handleCompleted, index}) => {
 const [value, setValue] = useState(0);

 useEffect(()=>{
  if(start) {
    const timer = setInterval(() => {
      setValue((value) => {
        if(value>=100) {
          handleCompleted(index)
          clearInterval(timer)
          return 100;
        }
        
        return value+5
      })
    }, 1000)
  }
 },[start])

  return (
    <div>
        <input type='range' min={0} max={100} value={value}/>
    </div>
  )
}

export default ProgressBar