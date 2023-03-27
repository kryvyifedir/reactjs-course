import { useState, useEffect } from 'react'
import Details from './components/Details'
import Filter from './components/Filter'
import List from './components/List'
import dataservice from './services/dataservice'

const App = () => {

  const [filter, setFilter] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    dataservice.getAll()
      .then(response => setCountries(response))
      .catch(error => {
        console.log(JSON.stringify(error))
      });
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleCountrySelected = (name) => {
    setSelectedCountry(name)
  }
  
  return (
    <div>
      <Filter onFilterChange={handleFilterChange}/>
      <List countries={countries} filter={filter} onCountrySelected={handleCountrySelected}/>
      <Details/>
    </div>
  )
}

export default App