import Header from "./components/Header/Header";
import HomePage, { allCountriesLoader } from "./pages/homepage/HomePage";
import CountryPage, {
  countryDetailsLoader,
} from "./pages/countrypage/CountryPage";
import Layout from "./components/Layout/Layout";
import "./styles/App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(isDarkMode == true ? false : true);
  };

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
    } else {
      body.classList.add("light-mode");
      body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout toggleTheme={toggleTheme} />}>
        <Route index element={<HomePage />} loader={allCountriesLoader} />
        <Route
          path="country/:cca3"
          element={<CountryPage />}
          loader={countryDetailsLoader}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
