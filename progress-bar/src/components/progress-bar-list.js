import React, { useEffect, useState } from 'react'
import ProgressBar from './progress-bar';

const ProgressBarList = () => {
  const [progressBars, addProgressBar] = useState([]);

  const currentlyRunningProgressBars = () => {
    const runningBars = progressBars.filter((bar) => bar.start && !bar.completed)
    return runningBars.length < 2;
  }

  useEffect(() => {
    const startNextProgressBar = () => {
      const runningProgressBars = currentlyRunningProgressBars();
      const pendingProgressBars = progressBars.filter((item) => !item.start)
    
      if(runningProgressBars && pendingProgressBars.length) {
        const updatedProgressBars = progressBars;
        const index = updatedProgressBars.findIndex((item) => item?.id === pendingProgressBars[0].id)
        updatedProgressBars[index] = {
          ...updatedProgressBars[index],
          start: true
        }
        addProgressBar([...updatedProgressBars])
      }
    }

    if(progressBars.length) {
      startNextProgressBar();
    }

  }, [progressBars])
  
  const handleClick = () => {
    const startValue = currentlyRunningProgressBars();

    const progressBarObject = {
      start: startValue,
      id: new Date().toISOString(),
      completed: false
    }

    addProgressBar([...progressBars, progressBarObject])
  }  

  const handleCompleted = (index) => {
    addProgressBar((prev) => {
      const existingProgressBar = prev;
      existingProgressBar[index] = {
        ...existingProgressBar[index],
        completed: true
      }
      
      return [...existingProgressBar]
    })
  }

  return (
    <div>
        <h4>Progress Bar List</h4>
        <button onClick={handleClick}>Add</button>
        <div>
            {progressBars.map((item, index) => {
                return <ProgressBar start={item.start} handleCompleted={handleCompleted} index={index}/>
            })}
        </div>
    </div>
  )
}

export default ProgressBarList