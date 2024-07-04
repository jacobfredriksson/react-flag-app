const getAllCountries = () => {
  fetch(
    "https://restcountries.com/v3.1/independent?status=true&fields=,languages,capital"
  );
};

const getCountryById = () => {};
