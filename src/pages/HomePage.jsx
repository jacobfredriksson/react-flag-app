import { getAllCountries, searchCountries } from "../services/api";
import CountryCard from "../components/CountryCard";
import Search from "../components/Search";
import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        setAllCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error("Error when trying to get all countries", error);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = async (search) => {
    if (search.trim() === "") {
      setFilteredCountries(allCountries);
    } else {
      try {
        const results = await searchCountries(search.trim());
        setFilteredCountries(results);
      } catch (error) {
        console.error("Error when searching for country", error);
      }
    }
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <div className="country-cards">
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.name}
            flag={country.flag}
            name={country.name}
            population={country.population}
            region={country.region}
            capital={country.capital}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
