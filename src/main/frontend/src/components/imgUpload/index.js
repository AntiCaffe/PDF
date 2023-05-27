import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import "./index.css";

function ImageUpload({ onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedBoxes, setDetectedBoxes] = useState([]);

  const colors = {
    "Normal MultiScrew1": "#80ff00",
    "Normal MultiScrew2": "#40ff00",
    "Normal Screw": "#00ff80",
    "Normal Connector1": "#00ffff",
    "Normal Connector2": "#00bfff",
    "Normal Connector3": "#2e9afe",
    "Normal Connector4": "#58acfa",
    "Normal Support1": "#d0fa58",
    "Normal Support2": "#bef781",
    "Normal Support3": "#81f7be",
    "Normal Support4": "#81f7d8",
    "Defect MultiScrew1": "#FA5858",
    "Defect MultiScrew2": "#FF0000",
    "Defect Screw": "#FF4000",
    "Defect Connector1": "#FF8000",
    "Defect Connector2": "#FFBF00",
    "Defect Connector3": "#DBA901",
    "Defect Connector4": "#FE2E9A",
    "Defect Support1": "#FF00FF",
    "Defect Support2": "#F7819F",
    "Defect Support3": "#CC2EFA",
    "Defect Support4": "#8000FF",
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadedImage(URL.createObjectURL(file));
  };

  const buttonStyleUpload = {
    margin: "0 10px",
  };

  const inputStyle = {
    display: "none",
  };

  const customButtonStyle = {
    backgroundColor: "#4452a0",
    color: "#fff",
    padding: "5px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  };

  const handleAnalyzing = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:2000/v1/object-detection/yolov5",
        formData
      );
      // 분석 결과를 받아와서 처리하는 로직 작성
      console.log("분석 결과:", response.data);
      setIsAnalyzing(true);
      setDetectedBoxes(response.data);
    } catch (error) {
      console.error("전송 실패:", error);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setUploadedImage(null);
    onClose(); // 모달 창 닫기
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("data", JSON.stringify(detectedBoxes));

    try {
      const response = await axios.post(
        "http://localhost:8080/dashboard/upload",
        formData
      );
      console.log("전송 성공:", response.data);
      // 전송에 성공한 후에 처리할 로직 작성
      alert("파일이 업로드 되었습니다!");
      onClose(); // 모달 창 닫기
    } catch (error) {
      console.error("전송 실패:", error);
    }
  };

  const renderDetectedBoxes = () => {
    if (uploadedImage) {
      const img = new Image();
      img.src = uploadedImage;
      const { naturalWidth, naturalHeight } = img;

      return detectedBoxes.map((box, index) => {
        const { xmin, ymin, xmax, ymax, name } = box;

        const color = colors[name] || "white";

        const style = {
          position: "absolute",
          left: `${(xmin * 100) / naturalWidth}%`,
          top: `${(ymin * 100) / naturalHeight}%`,
          width: `${((xmax - xmin) * 100) / naturalWidth}%`,
          height: `${((ymax - ymin) * 100) / naturalHeight}%`,
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

  return (
    <div className="text-center">
      {!selectedFile && !isAnalyzing && (
        <div className="upload-text-container">
          <p className="font-gray set-line">
            수동으로 파일을 첨부하여, 분석한 결과를 저장할 수 있습니다.
          </p>
          <p className="font-gray font-bold">
            아래의 '파일첨부'에서 파일을 선택해주세요.
          </p>
        </div>
      )}
      {uploadedImage && !isAnalyzing && (
        <div>
          <div style={{ width: "100%" }}>
            <img src={uploadedImage} alt="Uploaded" className="modal-img" />
          </div>
        </div>
      )}
      {!selectedFile && !isAnalyzing && (
        <label htmlFor="upload-button">
          <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            component="span"
            variant="contained"
            size="small"
            style={customButtonStyle}
          >
            파일첨부
          </Button>
        </label>
      )}

      {selectedFile && !isAnalyzing && (
        <div>
          <div className="divider"></div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={customButtonStyle}
            onClick={handleAnalyzing}
          >
            분석하기
          </Button>
        </div>
      )}

      {isAnalyzing && selectedFile && (
        <div>
          <div style={{ width: "100%" }}>
            <img src={uploadedImage} alt="Uploaded" className="modal-img" />
            {renderDetectedBoxes()}
          </div>
          <div className="divider"></div>
          <div className="button-container">
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={handleCancel}
            >
              취소
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleUpload}
            >
              전송
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
