const CountryCard = ({ name, population, region, capital }) => {
  return (
    <div className="country-card">
      <h3>{name}</h3>
      <p>Capital: {capital}</p>
      <p>Region: {region}</p>
      <p>Population: {population}</p>
    </div>
  );
};

export default CountryCard;
