const baseUrl = "https://restcountries.com/v3.1";

// Function to get all countries for home page
export const getAllCountries = async () => {
  try {
    const response = await fetch(
      `${baseUrl}/all?fields=name,population,region,capital`
    );
    if (!response.ok) {
      throw new Error("Failed to get all countries");
    }
    const data = await response.json();

    const extractedData = data.map((country) => ({
      name: country.name.common,
      population: country.population,
      region: country.region,
      capital:
        country.capital && country.capital.length > 0
          ? country.capital[0]
          : "No capital",
    }));

    return extractedData;
  } catch (error) {
    console.error("Error when trying to get all countries:", error.message);
    throw error;
  }
};

// Function to search countries by name
export const searchCountries = async (search) => {
  try {
    const response = await fetch(
      `{baseUrl}/name/{search}?fields=name,population,region,capital`
    );
    if (!response.ok) {
      throw new Error("Failed to get countries");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error when searching for country:", error);
  }
};
