import { useState } from 'react'

const Header = () => {
  return (
    <h1>give feedback</h1>
  )
}

const Menu = ({ goodCounter, setGood, neutralCounter, setNeutral, badCounter, setBad, all, setAll }) => {
  return (
    <div style={{ display: 'flex' }}>
      <MenuButton text="good" counter={goodCounter} setter={setGood} all={all} setAll={setAll} />
      <MenuButton text="neutral" counter={neutralCounter} setter={setNeutral} all={all} setAll={setAll} />
      <MenuButton text="bad" counter={badCounter} setter={setBad} all={all} setAll={setAll} />
    </div>
  )
}

const MenuButton = ({ text, counter, setter, all, setAll }) => {
  const increaseCounter = () => {
    setter(counter + 1);
    setAll(all + 1);
  }

  return (
    <button onClick={increaseCounter}>
      {text}
    </button>
  )
}

const Statistics = ({ goodCounter, neutralCounter, badCounter, all }) => {

  const calcAverage = () => {
    let result = 0;
    if (all !== 0) {
      result = (goodCounter - badCounter) / all;
    }
    return result;
  }

  const calcPositivePercentage = () => {
    let result = 0;
    if (all !== 0) {
      result = goodCounter / all * 100;
    }
    return result;
  }

  if (all === 0) {
    return (
      <table>
        <tbody><StatisticsLine text="No feedback given" /></tbody>
      </table>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text="Good" stat={goodCounter} />
        <StatisticsLine text="Neutral" stat={neutralCounter} />
        <StatisticsLine text="Bad" stat={badCounter} />
        <StatisticsLine text="All" stat={all} />
        <StatisticsLine text="Average" stat={calcAverage()} />
        <StatisticsLine text="Positive" stat={calcPositivePercentage()} symbol="%" />
      </tbody>
    </table>
  )
}

const StatisticsLine = ({ text, stat, symbol }) => {
  if (!stat && stat !== 0) {
    return (
      <tr>
        <td>{text}</td>
      </tr>
    )
  }

  if (!symbol) {
    return (
      <tr>
        <td>{text}</td>
        <td>{stat}</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
  )
}



const App = () => {
  
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  return (
    <div>
      <Header />
      <Menu goodCounter={good} neutralCounter={neutral} badCounter={bad} setGood={setGood} setNeutral={setNeutral} setBad={setBad} all={all} setAll={setAll} />
      <Statistics goodCounter={good} neutralCounter={neutral} badCounter={bad} all={all} />
    </div>
  )
}

export default App