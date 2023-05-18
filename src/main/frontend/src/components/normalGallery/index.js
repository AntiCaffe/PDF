import React, { useEffect, useState } from "react";
import fault from "src/assets/images/no_img.jpg";
import "./index.css";

function App() {
  const imageList = ["image1.jpg", "image2.jpg", "image3.jpg"]; // 이미지 파일 목록
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지

  const handleImageClick = (imageName) => {
    setSelectedImage(imageName);
  };

  return (
    <div>
      <h2>정상품목</h2>
      <div className="centered-div">
        {selectedImage ? (
          <img
            src={require(`src/assets/images/${selectedImage}`).default}
            alt={selectedImage}
          />
        ) : (
          <img src={fault} alt="No Image" />
        )}
      </div>
    </div>
  );
}

export default App;
