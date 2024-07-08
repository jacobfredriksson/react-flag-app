const CountryCard = ({ flag, name, population, region, capital }) => {
  return (
    <div className="country-card">
      <img src={flag} alt={`Flag of ${name}`} className="country-flag" />
      <h3>{name}</h3>
      <p>Capital: {capital}</p>
      <p>Region: {region}</p>
      <p>Population: {population}</p>
    </div>
  );
};

export default CountryCard;
