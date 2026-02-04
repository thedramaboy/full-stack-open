import { useEffect, useState } from "react";
import countryService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [newCountry, setNewCountry] = useState("");

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  if (!countries) {
    return <div>Loading...</div>;
  }

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value);
  };

  const countriesToShow =
    newCountry === ""
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(newCountry.toLowerCase()),
        );

  return (
    <div>
      <p>
        find countries
        <input value={newCountry} onChange={handleCountryChange} />
      </p>
      {countriesToShow.length > 10 && newCountry !== "" ? (
        <div>Too many matches, specify another filter</div>
      ) : countriesToShow.length === 1 && newCountry !== "" ? (
        countriesToShow.map((country) => (
          <div key={country.name.common}>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital[0]}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
              {Object.values(country.languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img src={country.flags.png} alt="flag"/>
          </div>
        ))
      ) : (
        countriesToShow.map((country) => (
          <p key={country.name.common}>{country.name.common}</p>
        ))
      )}
    </div>
  );
};

export default App;
