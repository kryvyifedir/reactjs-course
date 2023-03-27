import { useState, useEffect } from 'react'
import Details from './components/Details'
import Filter from './components/Filter'
import List from './components/List'
import dataservice from './services/dataservice'

const App = () => {

  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (filter) {
      dataservice.searchByName(filter)
        .then(response => {
          setCountries(response)
          if (response.length === 1) {
            setSelectedCountry(response[0]);
          } else {
            setSelectedCountry(null);
          }
        })
        .catch(error => {
          setCountries([]);
          setSelectedCountry(null);
        });
    }
  }, [filter])


  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleCountrySelected = (name) => {
    setFilter(name)
  }

  return (
    <div>
      <Filter onFilterChange={handleFilterChange} />
      <List countries={countries} onCountrySelected={handleCountrySelected} />
      <Details country={selectedCountry} />
    </div>
  )
}

export default App