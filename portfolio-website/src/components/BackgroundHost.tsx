"use client";

// import { useTheme } from "../hooks/changeTheme";
import dynamic from "next/dynamic";
const Bubbles = dynamic(() => import("./common/Bubbles"), { ssr: false });
// import SpotLightCursor from "./common/SpotLightCursor";

const BackgroundHost = () => {
  // const { theme } = useTheme();

  return (
    <>
      {/* {theme === "interactive" && <SpotLightCursor />} */}
      <div className="bg-layer">
        <Bubbles />
      </div>
    </>
  );
};

export default BackgroundHost;
