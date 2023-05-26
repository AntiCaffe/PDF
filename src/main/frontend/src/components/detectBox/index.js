import React, { useEffect, useState } from "react";

const RenderDetectedBoxes = ({ uploadedImage, detectedBoxes, colors }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (uploadedImage) {
    const img = new Image();
    img.src = uploadedImage;
    const { width: imgWidth, height: imgHeight } = img;

    console.log(imgWidth, imgHeight);

    return detectedBoxes.map((box, index) => {
      const { xmin, ymin, xmax, ymax, name } = box;

      const color = colors[name] || "white";

      const style = {
        position: "absolute",
        left: `${(xmin * 100) / imgWidth}%`,
        top: `${(ymin * 100) / imgHeight}%`,
        width: `${((xmax - xmin) * 100) / imgWidth}%`,
        height: `${((ymax - ymin) * 100) / imgHeight}%`,
        border: `1px solid ${color}`,
      };

      return (
        <div key={index} style={style}>
          <div className="part-name" style={{ color: color }}>
            {name}
          </div>
        </div>
      );
    });
  } else {
    return null;
  }
};

export default RenderDetectedBoxes;
