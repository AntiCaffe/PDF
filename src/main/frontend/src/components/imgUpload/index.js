import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import "./index.css";
function ImageUpload({ onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

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
    backgroundColor: "#4452a0", // 배경색 설정
    color: "#fff", // 텍스트 색상 설정
    padding: "5px 20px", // 패딩 설정
    borderRadius: "5px", // 테두리 반경 설정
    border: "none", // 테두리 제거
    cursor: "pointer", // 커서 모양 변경
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setUploadedImage(null);
    onClose(); // 모달 창 닫기
  };

  const handleUpload = () => {
    // 이미지와 JSON 정보를 서버로 보내는 로직 작성
    const formData = new FormData();
    formData.append("image", selectedFile);
    // JSON 정보를 formData에 추가하는 로직 작성

    axios
      .post("http://example.com/upload", formData)
      .then((response) => {
        // 전송 성공 시 처리할 로직 작성
        console.log("전송 성공!");
      })
      .catch((error) => {
        // 전송 실패 시 처리할 로직 작성
        console.error("전송 실패:", error);
      });
  };

  return (
    <div className="text-center">
      {!selectedFile && (
        <div className="upload-text-container">
          <p className="font-gray set-line">
            수동으로 파일을 첨부하여, 분석한 결과를 저장할 수 있습니다.
          </p>
          <p className="font-gray font-bold">
            아래의 '파일첨부'에서 파일을 선택해주세요.
          </p>
        </div>
      )}
      {uploadedImage && (
        <div>
          <div style={{ width: "100%" }}>
            <img src={uploadedImage} alt="Uploaded" className="modal-img" />
          </div>
        </div>
      )}
      <label htmlFor="upload-button">
        <input
          type="file"
          id="upload-button"
          style={inputStyle}
          onChange={handleFileChange}
        />
        <Button
          component="span"
          variant="contained"
          size="small"
          style={{ ...buttonStyleUpload, ...customButtonStyle }}
        >
          파일첨부
        </Button>
      </label>

      {uploadedImage && (
        <div>
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
