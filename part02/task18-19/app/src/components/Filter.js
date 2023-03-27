const Filter = ({ onFilterChange }) => {

    return (
        <div>
            <div>
                Find country: <input onChange={onFilterChange}></input>
            </div>
        </div>
    )
}

export default Filter