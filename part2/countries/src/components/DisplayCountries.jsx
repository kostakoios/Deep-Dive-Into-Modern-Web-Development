import CountryDescription from "./CountryDescription";

const DisplayCountries = ({ filteredCountries, clickedOnShowCountry, childIndex }) => {
  
  console.log("child component and it's index", childIndex)
 
  return (
    <ul>
      {filteredCountries.length > 10 ? (
        <h1>Too many matches, specify another filter</h1>
      ) : filteredCountries.length == 1 ? (
        filteredCountries.map((countryInfo, index) => {
            return <CountryDescription key={index} country={countryInfo} />
        }
        )
      ) : (
        filteredCountries.map((country, index) => (
          <li key={index}>
            {country.name.common}
            <button type="button" onClick={() => clickedOnShowCountry(index)}>Show</button>
            {childIndex == index &&  <CountryDescription key={index} country={country} />}
          </li>
        ))
      )}
    </ul>
  );
};

export default DisplayCountries;
