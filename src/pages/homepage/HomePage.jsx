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
import { Link, useLoaderData } from "react-router-dom";

// 1. använd data från useLoaderData och sätt den till allCountries som en state variabel
// 2. Vid search andvänd useloaderdata som grundläggande data som filtreras över (all data ligger i data)

const HomePage = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  const data = useLoaderData();
  console.log(data);

  useEffect(() => {
    if (data) {
      setAllCountries(data);
      setFilteredCountries(data);
    }
  }, [data]);

  const handleSearch = async (search) => {
    if (search.trim() === "") {
      setFilteredCountries(data);
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
        countries = data;
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
      <div className="country-cards">
        <div className="search-container">
          <Search onSearch={handleSearch} />
          <Dropdown
            regions={["all", "africa", "america", "asia", "europe", "oceania"]}
            onSelect={handleRegionChange}
          />
        </div>
        {filteredCountries.map((country) => (
          <Link to={`/country/${country.cca3}`} key={country.cca3}>
            <CountryCard
              key={country.name}
              flag={country.flag}
              name={country.name}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

export const allCountriesLoader = async () => {
  try {
    const data = await getAllCountries();
    return data;
  } catch (error) {
    console.error(error);
  }
};
