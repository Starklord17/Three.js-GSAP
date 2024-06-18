import React from "react";
import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  const roundedProgress = Math.round(progress);

  return (
    <Html>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="w-[10vw] h-[10vw] rounded-full">Loading: {roundedProgress}%</div>
      </div>
    </Html>
  );
};

export default Loader;
