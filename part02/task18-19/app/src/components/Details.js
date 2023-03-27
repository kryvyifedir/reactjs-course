const Details = ({ country }) => {
    const selectedCountry = country;

    const getLanguages = (languages) => {
        if (languages) {
            return Object.entries(languages).map(([key, value]) => <li key={key}>{value}</li>)
        }
    }

    if (country) {
        return (
            <div>
                <h2>{selectedCountry.name.common}</h2>
                <div>Capital: {selectedCountry.capital[0]}</div>
                <div>Area: {selectedCountry.area} </div>
                <div>Languages:</div>
                <ul>{getLanguages(selectedCountry.languages)}</ul>
                <img src={selectedCountry.flags.png} alt="flag of the country"></img>
            </div>
        )
    }

    return(<div></div>)
}

export default Details