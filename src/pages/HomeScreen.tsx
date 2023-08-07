import Cards from "../component/Cards/Cards";
import logo from "../assets/Pokemon-Logo.png";

const HomeScreen = () => {
  return (
    <div className="full-container">
      <div className="content-container">
        <img className="main-logo" src={logo} />
        <Cards />
      </div>
    </div>
  );
};

export default HomeScreen;
