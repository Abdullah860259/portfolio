import React, { useEffect } from "react";
import { runMatter } from "./matter"; // export runMatter from matter.js

const MatterCanvas = () => {
  useEffect(() => {
    const m = runMatter();
    const handleResize = () => {
      m.render.canvas.width = window.innerWidth;
      m.render.canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id="myCanvasContainer"
      className="absolute top-0 left-0 w-full h-full z-0"
    ></div>
  );
};

export default MatterCanvas;
