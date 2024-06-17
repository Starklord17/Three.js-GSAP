import { Suspense } from "react";
import {
  OrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";

import * as THREE from "three";
import Lights from "./Lights";
import Loader from "./Loader";
import IPhone from "./IPhone";

/**
 * Renders an interactive 3D model view within a carousel.
 *
 * This component encapsulates the logic for displaying a 3D model (specifically an iPhone) 
 * with adjustable lighting, camera controls, and positioning within a carousel-like structure.
 *
 * @param {number} index - The index of the current view within the carousel. Used for positioning and scaling.
 * @param {object} groupRef - A React ref for accessing the Three.js group containing the 3D model.
 * @param {string} gsapType - A string used as an ID for potential GSAP animations.
 * @param {object} controlRef - A React ref for accessing the OrbitControls instance for camera interaction.
 * @param {function} setRotationState - A function to update the rotation state based on user interaction.
 * @param {string} size - The size variant of the 3D model ('small' or 'large').
 * @param {object} item - An object containing data related to the specific item being displayed (e.g., model properties).
 *
 * @returns {JSX.Element} The rendered 3D model view with its accompanying elements.
 */
const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`} // right-[-100%] shifts the element completely to the right, out of its container.
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.4} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      <group
        ref={groupRef}
        name={`${index === 1} ? 'small' : 'large`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
