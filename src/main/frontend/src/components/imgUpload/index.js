import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      axios
        .post("/dashboard/upload", formData)
        .then((response) => {
          console.log("업로드 성공:", response);
        })
        .catch((error) => {
          console.error("업로드 실패:", error);
        });
    }
  };

  return (
    <div className="text-center">
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" size="small" onClick={handleUpload}>
        업로드
      </Button>
    </div>
  );
}

export default ImageUpload;
