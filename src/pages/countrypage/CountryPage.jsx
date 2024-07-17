import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import "./countrypage.css";
import "../../styles/App.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React, { useState, useEffect } from "react";

const CountryPage = () => {
  const [loading, setLoading] = useState(false);
  const data = useLoaderData()[0];

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const {
    population,
    region,
    capital,
    name,
    tld: topLevelDomain,
    currencies,
    languages,
    borders = [],
    flags,
  } = data;

  const nativeCommonName = data.name
    ? Object.values(data.name.nativeName).find((n) => n.common)?.common || "N/A"
    : "N/A";

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
          {loading ? (
            <Skeleton className="skeleton-flag" />
          ) : (
            <img
              src={flags.png}
              alt={`Flag of ${name.common}`}
              className="flag-img"
            />
          )}
        </div>
        <div className="text-info">
          <div className="name-container">
            <h1 className="country-name">
              {loading ? <Skeleton /> : name.common}
            </h1>
          </div>
          <div className="country-details">
            <div className="info-left">
              <>
                <p>
                  <strong>Population: </strong>
                  {loading ? (
                    <Skeleton width={150} />
                  ) : (
                    population.toLocaleString()
                  )}
                </p>
                <p>
                  <strong>Region: </strong>
                  {loading ? <Skeleton width={150} /> : region}
                </p>
                <p>
                  <strong>Capital: </strong>
                  {loading ? <Skeleton width={150} /> : capital}
                </p>
                <p>
                  <strong>Native Name: </strong>
                  {loading ? <Skeleton width={150} /> : nativeCommonName}
                </p>
              </>
            </div>
            <div className="info-right">
              <p>
                <strong>Top Level Domain: </strong>
                {loading ? <Skeleton width={150} /> : topLevelDomain.join(", ")}
              </p>
              <p>
                <strong>Currencies: </strong>
                {loading ? (
                  <Skeleton width={150} />
                ) : (
                  Object.values(currencies)
                    .map((currency) => currency.name)
                    .join(", ")
                )}
              </p>
              <p>
                <strong>Languages: </strong>
                {loading ? (
                  <Skeleton width={150} />
                ) : (
                  Object.values(languages).join(", ")
                )}
              </p>
            </div>
          </div>

          <div className="border-countries-container">
            <p className="border-countries-heading">
              <strong>Border Countries:</strong>
            </p>
            {
              <ul className="border-countries">
                {loading ? (
                  <div style={{ display: "flex", gap: "5px" }}>
                    <Skeleton width={35} className="skeleton-border-country" />
                    <Skeleton width={35} className="skeleton-border-country" />
                    <Skeleton width={35} className="skeleton-border-country" />
                  </div>
                ) : borders.length > 0 ? (
                  borders.map((border, index) => (
                    <li className="border-country" key={index}>
                      <Link to={`/country/${border}`}>{border}</Link>
                    </li>
                  ))
                ) : (
                  <p>No border countries</p>
                )}
              </ul>
            }
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
