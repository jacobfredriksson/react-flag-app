import "./header.css";

const Header = ({ toggleTheme }) => {
  return (
    <div className="header-container">
      <h1 className="header-text">The Flag app</h1>
      <div className="header-logo" src="src/assets/techover-logo-dark.png" />
      <button className="header-button" onClick={toggleTheme}>
        <div className="header-button-image"></div>
        <span className="header-button-text">Dark Mode</span>
      </button>
    </div>
  );
};

export default Header;
