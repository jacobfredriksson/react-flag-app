import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import "./countrypage.css";
import "../../styles/App.css";

const CountryPage = () => {
  const data = useLoaderData()[0];
  console.log(data);

  const {
    population,
    region,
    capital,
    name,
    nativeName,
    tld: topLevelDomain,
    currencies,
    languages,
    borders = [],
    flags,
  } = data;

  return (
    <div className="country-page-container">
      <div className="button-container">
        <Link to="/">BACK</Link>
      </div>
      <div className="country">
        <div className="img-container">
          <img
            src={flags.png}
            alt={`Flag of ${name.common}`}
            className="flag-img"
          ></img>
        </div>
        <div className="text-info">
          <div className="name-container">
            <h1 className="country-name">{name.common}</h1>
          </div>
          <div className="country-details">
            <div className="info-left">
              <p>Population: {population.toLocaleString()}</p>
              <p>Region: {region}</p>
              <p>Capital: {capital}</p>
              <p>Native Name: {nativeName}</p>
            </div>
            <div className="info-right">
              <p>Top Level Domain: {topLevelDomain.join(", ")}</p>
              <p>
                Currencies:{" "}
                {Object.values(currencies)
                  .map((currency) => currency.name)
                  .join(", ")}
              </p>
              <p>Languages: {Object.values(languages).join(", ")}</p>
            </div>
          </div>

          <h2 className="border-countries-heading">Border Countries:</h2>
          <div className="border-countries-container">
            {borders.length > 0 ? (
              <ul className="border-countries">
                {borders.map((border, index) => (
                  <li className="border-country" key={index}>
                    <Link to={`/country/${border}`}>{border}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No border countries</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryPage;

export const countryDetailsLoader = async ({ params }) => {
  const cca3 = params.cca3;
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${cca3}`
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
