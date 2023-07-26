import Cards from "./component/Cards/Cards";
import "./App.css";
import logo from "./assets/Pokemon-Logo.png";

function App() {
  return (
    <>
      {/* <div className="gradient-bg"></div> */}
      <div className="main-container">
        <div className="content-container">
          <img className="main-logo" src={logo} />

          <Cards />
        </div>
      </div>
    </>
  );
}

export default App;
