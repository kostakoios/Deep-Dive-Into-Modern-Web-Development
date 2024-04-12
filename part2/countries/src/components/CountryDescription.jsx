
const CountryDescription = ({country}) => {
    let languages = Object.values(country.languages)
    return (
      <div>
         <h1>{country.name.common}</h1>
          <p>capital {country.capital[0]}</p>
          <p>area {country.area}</p>
          <h2>Languages: </h2>
          <ul>
              {languages.map((language, index) => <li key={index}>{language}</li>)}
          </ul>
          <br />
          <img src={country.flags.png} alt="flag image" />
      </div>
    )
  }

  export default CountryDescription