import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/loader.json";

const Loader = () => {
  return (
    <div style={{ width: 200, height: 200 }}>
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default Loader;
