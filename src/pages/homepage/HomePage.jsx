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
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonCountryCard from "../../components/skeletion/SkeletionCountryCard";

const HomePage = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [loading, setLoading] = useState(false);

  const data = useLoaderData();

  useEffect(() => {
    if (data) {
      setAllCountries(data);
      setFilteredCountries(data);
      setLoading(false);
    }
  }, [data]);

  const handleSearch = async (search) => {
    setLoading(false);

    if (search.trim() === "") {
      setFilteredCountries(data);
      setLoading(false);
    } else {
      try {
        const results = await searchCountries(search.trim());
        setFilteredCountries(results);
      } catch (error) {
        console.error("Error when searching for country", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRegionChange = async (region) => {
    setSelectedRegion(region);
    setLoading(false);
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
    } finally {
      setLoading(false);
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

        {loading
          ? Array(12)
              .fill()
              .map((_, index) => <SkeletonCountryCard key={index} />)
          : filteredCountries
              .sort((a, b) => a.name.localeCompare(b.name, "sv"))
              .map((country) => (
                <Link
                  to={`/country/${country.cca3}`}
                  key={country.cca3}
                  className="country-card-link"
                >
                  <CountryCard
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
