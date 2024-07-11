const baseUrl = "https://restcountries.com/v3.1";

export const getAllCountries = async () => {
  try {
    const response = await fetch(
      `${baseUrl}/all?fields=flags,name,population,region,capital,cca3`
    );
    if (!response.ok) {
      throw new Error("Failed to get all countries");
    }
    const data = await response.json();

    const extractedData = data.map((country) => ({
      flag: country.flags ? country.flags.png : "No Flag",
      name: country.name.common,
      population: country.population,
      region: country.region,
      capital:
        country.capital && country.capital.length > 0
          ? country.capital[0]
          : "No capital",
      cca3: country.cca3,
    }));

    return extractedData;
  } catch (error) {
    console.error("Error when trying to get all countries:", error.message);
    throw error;
  }
};

export const searchCountries = async (search) => {
  try {
    let url;
    if (search.length === 1) {
      url = `${baseUrl}/name/${search}*?fields=flags,name,population,region,capital,cca3`;
    } else if (search.length > 1) {
      url = `${baseUrl}/name/${search}?fields=flags,name,population,region,capital,cca3`;
    } else {
      return [];
    }

    const response = await fetch(
      `${baseUrl}/name/${search}?fields=flags,name,population,region,capital,cca3`
    );
    if (!response.ok) {
      throw new Error("Failed to get countries");
    }
    const data = await response.json();

    const filteredData = data
      .filter((country) =>
        country.name.common.toLowerCase().startsWith(search.toLowerCase())
      )
      .sort((a, b) => a.name.common.localeCompare(b.name.common));

    return filteredData.map((country) => ({
      flag: country.flags ? country.flags.png : "No Flag",
      name: country.name.common,
      population: country.population,
      region: country.region,
      capital: country.capital ? country.capital[0] : "No Capital",
      cca3: country.cca3,
    }));
  } catch (error) {
    console.error("Error when searching for country:", error);
    return [];
  }
};

export const countriesByRegion = async (region) => {
  try {
    let url;
    if (region === "all") {
      url = `${baseUrl}/all?fields=flags,name,population,region,capital,cca3`;
    } else {
      url = `${baseUrl}/region/${region}?fields=flags,name,population,region,capital,cca3`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const extractedData = data.map((country) => ({
      flag: country.flags.png,
      name: country.name.common,
      population: country.population,
      region: country.region,
      capital:
        country.capital && country.capital.length > 0
          ? country.capital[0]
          : "No capital",
      cca3: country.cca3,
    }));

    return extractedData;
  } catch (error) {
    console.error("Error getting countries by region:", error);
    throw error;
  }
};
