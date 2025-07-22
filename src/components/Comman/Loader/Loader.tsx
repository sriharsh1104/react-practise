import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/loader.json";
import { useSelector } from "react-redux";

const Loader = () => {
    const { loader } = useSelector((state: any) => state.loader);
    console.log('loader', loader)
  return (
    <div style={{ width: 200, height: 200 }}>
      {loader && <Lottie animationData={loadingAnimation} loop={true} />}
    </div>
  );
};

export default Loader;
