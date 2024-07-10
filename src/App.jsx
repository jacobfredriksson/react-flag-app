import Header from "./components/Header/Header";
import HomePage from "./pages/homepage/HomePage";
import "./styles/App.css";
import { useEffect, useState } from "react";

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

  return (
    <>
      <Header toggleTheme={toggleTheme} />
      <HomePage />
    </>
  );
}

export default App;
