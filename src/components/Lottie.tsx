// components/LottieAnimation.tsx
import { Lottie } from "lottie-react";
import animationData from "../public/myAnimation.json"; // Adjust path if necessary

const LottieAnimation = () => {
  return (
    <div className="flex justify-center items-center">
      <Lottie animationData={animationData} loop={true} autoplay={true} />
    </div>
  );
};

export default LottieAnimation;
