import { useState, useEffect } from 'react'

const Button = ({handleclick, text}) => <button onClick={handleclick}>{text}</button>     // button object
const Header = ({text}) => <h1>{text}</h1>                                                // header object

function getRandomIntInclusive(min, max) {                                                //f returns random number between range
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)                                             // Selected anecdocte
  const [votes, setVote] = useState([0, 0, 0, 0, 0, 0, 0, 0])                             // votes array
  const [mostVoted, setMostVoted] = useState(0)                                           // the index of the most voted anecdote
  
  useEffect(() => {                                                                       // triggers mostVotedUpdated() at any state change
    mostVotedUpdated();
  });

  const mostVotedUpdated = () => { 
    // console.log("votes from mostVotedUpdated func: ", votes)
    const mostVotedVar = votes.indexOf(Math.max(...votes))
    setMostVoted(mostVotedVar)
  }

  const anecdocteSelector = () => {                                                      // returns the index to select the anecdocte
    setSelected(getRandomIntInclusive(0 , 7))                                                                  
  }

  const voteAnecdocte = () => {
    const updatedVoteArray = [...votes]
    // console.log('vote array before: ', updatedVoteArray)
    updatedVoteArray[selected] += 1
    // console.log('vote array after +1: ', updatedVoteArray)
    setVote(updatedVoteArray)
  }
  
  return (
    <div>
      <Header text={'Anecdote of the day'} />
      <Button handleclick={anecdocteSelector} text={'Click for an anedocte'} />
      <Button handleclick={voteAnecdocte} text={"Vote"} />
      <div>
        {anecdotes[selected]}
      </div>
        <Header text={'Most voted anecdote'} />
        {anecdotes[mostVoted]}
        <p>Was voted {votes[mostVoted]} times.</p>
      </div>
  )
}

export default App
