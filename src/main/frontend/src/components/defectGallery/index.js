import React, { useEffect, useState } from "react";
import fault from "assets/images/no_img.jpg";
import MemoDiv from "components/memo";
import "./index.css";

function App() {
  const imageList = ["image1.jpg", "image2.jpg", "image3.jpg"]; // 이미지 파일 목록
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지

  const handleImageClick = (imageName) => {
    setSelectedImage(imageName);
  };

  return (
    <div>
      <h2>결함품목</h2>
      <div className="centered-div bottom-padding">
        <div className="centered-content">
          {selectedImage ? (
            <img
              src={require(`assets/images/${selectedImage}`).default}
              alt={selectedImage}
            />
          ) : (
            <img src={fault} alt="No Image" />
          )}
          <MemoDiv />
        </div>
      </div>
    </div>
  );
}

export default App;
