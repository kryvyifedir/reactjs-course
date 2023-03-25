const Filter = ({ onFilterChange }) => {

    return (
        <div>
            <h2>Filter:</h2>
            <div>
                Filter by name: <input onChange={onFilterChange}></input>
            </div>
        </div>
    )
}

export default Filter