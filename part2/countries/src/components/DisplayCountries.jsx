import CountryDescription from "./CountryDescription";

const DisplayCountries = ({ filteredCountries }) => {
  return (
    <ul>
      {filteredCountries.length > 10 ? (
        <h1>Too many matches, specify another filter</h1>
      ) : filteredCountries.length == 1 ? (
        filteredCountries.map((countryInfo, index) => (
          <CountryDescription key={index} country={countryInfo} />
        ))
      ) : (
        filteredCountries.map((country, index) => (
          <li key={index}>{country.name.common}</li>
        ))
      )}
    </ul>
  );
};

export default DisplayCountries;
