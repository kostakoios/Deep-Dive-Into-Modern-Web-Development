import { useState } from 'react'

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
      <button onClick={goodClicked}>good</button>
      <button onClick={neutralClicked}>neutral</button>
      <button onClick={badClicked}>bad</button>
      <h2>Statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
    </div>
  )
}

export default App