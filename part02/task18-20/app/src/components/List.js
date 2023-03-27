const List = ({ countries, filter, onCountrySelected }) => {

    return (
        <div>
            {countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase())).map(country => {
                return <div key = {country.name} onClick={() => onCountrySelected(country.name)}>{country.name}</div>
            })}
        </div>
    )
}

export default List