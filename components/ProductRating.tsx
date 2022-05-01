import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

type Props = {
  rating: number;
};

const ProductRating: React.FC<Props> = ({ rating }) => {
  function getStars() {
    const length = 5;
    let r = rating;
    let arr = new Array<JSX.Element>();
    for (let i = 0; i < length; i++) {
      if (r >= 1) {
        arr.push(<BsStarFill key={i} />);
      } else if (r > 0) {
        arr.push(<BsStarHalf key={i} />);
      } else {
        arr.push(<BsStar key={i} />);
      }
      r -= 1;
    }
    return arr;
  }

  return <div className="flex flex-row text-yellow-500">{getStars()}</div>;
};

export default ProductRating;
