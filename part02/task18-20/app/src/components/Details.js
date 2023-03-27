const Details = ({ country }) => {
    const selectedCountry = country;

    if (country) {
        return (
            <div>
                {JSON.stringify(selectedCountry)}
            </div>
        )
    }

    return(<div></div>)
}

export default Details