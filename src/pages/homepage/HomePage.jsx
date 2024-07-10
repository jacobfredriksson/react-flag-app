import {
  getAllCountries,
  searchCountries,
  countriesByRegion,
} from "../../services/api";
import CountryCard from "../../components/countrycard/CountryCard";
import Search from "../../components/search/Search";
import Dropdown from "../../components/dropdown/Dropdown";
import React, { useState, useEffect } from "react";
import "./homepage.css";

const HomePage = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

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

  const handleRegionChange = async (region) => {
    setSelectedRegion(region);
    try {
      let countries;
      if (region === "all") {
        countries = allCountries;
      } else {
        countries = await countriesByRegion(region);
      }
      setFilteredCountries(countries);
    } catch (error) {
      console.error("Error when trying to get countries by region");
    }
  };

  return (
    <div className="homepage-container">
      <div className="search-container">
        <Search onSearch={handleSearch} />
        <Dropdown
          regions={["all", "africa", "america", "asia", "europe", "oceania"]}
          onSelect={handleRegionChange}
        />
      </div>
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
