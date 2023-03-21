import Part from "./Part"

const Content = (props) => {
    const { parts } = props

    return (
        <div>
             <ul>
                {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
            </ul>
            <p>
                total of {parts.reduce((acc, cur) => acc + cur.exercises, 0)} excersises
            </p>
        </div>
       
    )
}

export default Content