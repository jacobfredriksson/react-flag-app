import "./App.css";
import "./styles/dark.css";
import "./styles/light.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar toggleTheme={toggleTheme} />
    </>
  );
}

export default App;
