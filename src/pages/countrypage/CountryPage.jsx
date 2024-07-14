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

  console.log(borders.length == 0, "#########");

  return (
    <div className="country-page-container">
      <div className="button-container">
        <Link to="/">
          <span className="back-button-arrow"></span>
          <span>Back</span>
        </Link>
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
              <p>
                <strong>Population:</strong> {population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {region}
              </p>
              <p>
                <strong>Capital:</strong> {capital}
              </p>
              <p>
                <strong>Native Name:</strong>
                {nativeName}
              </p>
            </div>
            <div className="info-right">
              <p>
                <strong>Top Level Domain:</strong> {topLevelDomain.join(", ")}
              </p>
              <p>
                <strong>Currencies:</strong>{" "}
                {Object.values(currencies)
                  .map((currency) => currency.name)
                  .join(", ")}
              </p>
              <p>
                <strong>Languages:</strong>{" "}
                {Object.values(languages).join(", ")}
              </p>
            </div>
          </div>

          <div className="border-countries-container">
            <p className="border-countries-heading">
              <strong>Border Countries:</strong>
              {borders.length == 0 && <p>No border countries</p>}
            </p>
            {borders.length > 0 && (
              <ul className="border-countries">
                {borders.map((border, index) => (
                  <li className="border-country" key={index}>
                    <Link to={`/country/${border}`}>{border}</Link>
                  </li>
                ))}
              </ul>
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
