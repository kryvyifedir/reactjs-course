import { useState } from 'react'

const Headings = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const ShowContent = ({ content }) => {
  return (
    <div>{content}</div>
  )
}

const Actions = ({ selected, setSelected, votes, setVotes, top, setTop }) => {

  const handleNext = () => {
    const anecdoteNumber = Math.floor(Math.random() * 6);
    setSelected(anecdoteNumber);
  }

  const handleVote = () => {
    let localVotes = [...votes];
    localVotes[selected] += 1;
    setVotes(localVotes);
    console.log(JSON.stringify(localVotes));

    if (localVotes[selected] > top.value) {
      const newTop = {index: selected, value: localVotes[selected]};
      setTop(newTop);
      console.log(JSON.stringify(newTop));
    }
  }

  return (
    <div>
      <button onClick={handleVote}>
        vote
      </button>
      <button onClick={handleNext}>
        next anecdote
      </button>
    </div>
  )
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

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))
  const [top, setTop] = useState({ index: 0, value: 0 })

  return (
    <div>
      <Headings text="Anecdote of the day" />
      <ShowContent content={anecdotes[selected]} />
      <ShowContent content={"has " + votes[selected] + " votes"} />
      <Actions selected={selected} setSelected={setSelected} votes={votes} setVotes={setVotes} top={top} setTop={setTop} />
      <Headings text="Anecdote with the most quotes" />
      <ShowContent content={anecdotes[top.index]} />
    </div>
  )
}

export default App