import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>
const StatisticLine = ({value, label}) => <tr><td>{label}</td><td>{value}</td></tr>
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
// const StatisticTable = () => 

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total === 0) {
    return(
      <div>
        <Header text={'Statistics'} />
        <p>No feedback given</p>
      </div>
    )
  }
  const average =  (good - bad) / total
  const positiveFb = (good / total) * 100 + '%'
  
  return(
    <div>
      <Header text={'Statistics'} />    
    
      <table>
        <tbody>
          <StatisticLine value={good} label={'Good: '} />
          <StatisticLine value={neutral} label={'Neutral: '} />
          <StatisticLine value={bad} label={'Bad: '} />
          <StatisticLine value={total} label={'Total: '} />
          <StatisticLine value={average} label={'Average Score: '} />
          <StatisticLine value={positiveFb} label={'Positive Feedbacks: '} />
         </tbody>
      </table>
    </div>
  )
}

const App = (evaluations) => {
  const[good, setGood] = useState(0)
  const[neutral, setNeutral] = useState(0)
  const[bad, setBad] = useState(0)

  const addRatingGood = () => setGood(good + 1)
  const addRatingNeutral = () => setNeutral(neutral + 1)
  const addRatingBad = () => setBad(bad + 1)
    
  return(
    <div>
      <Header text={'Give Feedback'} />
      <Button handleClick={addRatingGood} text={'Good'} />
      <Button handleClick={addRatingNeutral} text={'Neutral'} />
      <Button handleClick={addRatingBad} text={'Bad'} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;
