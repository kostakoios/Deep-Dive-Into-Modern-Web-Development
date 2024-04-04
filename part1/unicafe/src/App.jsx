import { useState } from 'react'

const Button = ({buttonClicked, text}) => {
  return (
    <button onClick={buttonClicked}>{text}</button>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props
  if (good == 0 && neutral == 0 && bad == 0) {
    return (
      <p>No feedback given</p>
    ) 
  }
  let sum = good + neutral + bad
  let average =  (good + (bad * (-1))) / sum
  let positive = (good / sum) * 100
  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {sum}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const goodClicked = () => setGood(good + 1)
  const neutralClicked = () => setNeutral(neutral + 1)
  const badClicked = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button buttonClicked={goodClicked} text="good"/>
      <Button buttonClicked={neutralClicked} text="neutral"/>
      <Button buttonClicked={badClicked} text="bad"/>
  
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>    
    </div>
  )
}

export default App