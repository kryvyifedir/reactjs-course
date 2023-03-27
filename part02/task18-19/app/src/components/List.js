const List = ({ countries, onCountrySelected }) => {

    if (countries.length > 10 ) {
        return (
            <div>To many matches, specify another filter</div>
        )
    }

    if (countries.length === 0 ) {
        return (
            <div>No country was found</div>
        )
    }


    return (
        <div>
            {countries.map(country => {
                const countryName = country.name.common;
                return <div key={countryName} onClick={() => onCountrySelected(countryName)}>{countryName}</div>
            })}
        </div>
    )
        
}

export default List