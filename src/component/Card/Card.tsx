import "./Card.css";
import jigglypuff from "../../assets/Jigglypuff.png";

interface Props {
  url: string;
}

const Card = ({ url }: Props) => {
  return (
    <div className="card">
      <img src={jigglypuff} />
      <p className="cardHeader">Jigglypuff</p>
      <p className="cardCategory">
        <span>Fairy, Normal</span>
      </p>
    </div>
  );
};

export default Card;
