const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.coursename}</h1>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part name={props.part1.name} numberOfTasks={props.part1.numberOfTasks} />
      <Part name={props.part2.name} numberOfTasks={props.part2.numberOfTasks} />
      <Part name={props.part3.name} numberOfTasks={props.part3.numberOfTasks} />
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>
      {props.name} {props.numberOfTasks}
    </p>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>Number of exercises {props.total}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = { name: 'Fundamentals of React', numberOfTasks: 10 }
  const part2 = { name: 'Using props to pass data', numberOfTasks: 7 }
  const part3 = { name: 'State of a component', numberOfTasks: 14 }

  return (
    <div>
      <Header coursename={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total total={part1.numberOfTasks + part2.numberOfTasks + part3.numberOfTasks} />
    </div>
  )
}

export default App

