import Intro from "./Intro";
import About from "./About";
import Calculator from "./Calculator";
import Prices from "./Prices";
import OurGoal from "./OurGoal";
import Reviews from "./Reviews";
import Result from "./Result";
import Newsletter from "./Newsletter";

const Landing = () => {
  return (
    <div>
      <Intro />
      {/* <About /> */}
      <Result />
      <Calculator />
      <Prices />
      <OurGoal />
      {/* <Reviews /> */}
      <Newsletter />
    </div>
  );
};

export default Landing;
