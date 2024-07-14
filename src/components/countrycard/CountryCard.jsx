import "./countrycard.css";

const CountryCard = ({ flag, name, population, region, capital }) => {
  return (
    <button className="country-card-container">
      <img src={flag} alt={`Flag of ${name}`} className="country-img" />
      <div className="country-text-container">
        <h3>{name}</h3>
        <p>
          <strong> Capital: </strong> {capital}
        </p>
        <p>
          <strong>Region: </strong> {region}
        </p>
        <p>
          <strong>Population:</strong> {population}
        </p>
      </div>
    </button>
  );
};

export default CountryCard;
