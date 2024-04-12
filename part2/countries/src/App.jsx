import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import DisplayCountries from "./components/DisplayCountries";

function App() {
  const [countries, setCountries] = useState(null);
  const [inputValues, setInputValues] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => response.data)
      .then((countries) => setCountries(countries))
      .catch((err) => console.log(err));
  }, []);

  const lettersHandleChanged = (event) => {
    let getValue = event.target.value
    setInputValues(getValue)
    let countriesArray = []
    if (getValue == "") {
      setFilteredCountries(countriesArray)
      return
    }
    countries.map((country) => {
      if (getValue !=="" && country.name.common.toLowerCase().includes(getValue)) {
        countriesArray.push(country)
        setFilteredCountries(countriesArray)
        console.log("countriesArray: ", countriesArray)
      }
    });
  };
  console.log("inputValues: ", inputValues);

  return (
    <>
      {countries? <form>
        <label>Find countries</label>
        <input value={inputValues} onChange={lettersHandleChanged} />
        <DisplayCountries filteredCountries={filteredCountries} />
      </form>:null}
    </>
  );
}

export default App;
