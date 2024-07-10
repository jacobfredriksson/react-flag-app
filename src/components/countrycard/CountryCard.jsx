import "./countrycard.css";

const CountryCard = ({ flag, name, population, region, capital }) => {
  return (
    <button className="country-card-container">
      <img src={flag} alt={`Flag of ${name}`} className="country-img" />
      <div className="country-text-container">
        <h3>{name}</h3>
        <p>Capital: {capital}</p>
        <p>Region: {region}</p>
        <p>Population: {population}</p>
      </div>
    </button>
  );
};

export default CountryCard;
