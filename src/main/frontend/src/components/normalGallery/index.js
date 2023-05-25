import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import "./index.css";
import no_img from "src/assets/images/no_img.jpg";

const Dashboard = () => {
  const [names, setNames] = useState([]);
  const [selectedImage, setSelectedImage] = useState("no_img"); // 선택한 이미지의 URL

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/dashboard/items");
      const data = response.data;
      const nameList = data.map((item) => item.name);
      setNames(nameList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = async (name) => {
    try {
      const response = await axios.get("http://localhost:8080/dashboard/items");
      const data = response.data;
      const imageUrl = data.find((item) => item.name === name)?.imageUrl;
      setSelectedImage(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="container">
        <h1>정상품목</h1>
        <div className="content">
          <div className="normal-list scrollableList">
            <List
              sx={{
                backgroundColor: "#4452a0",
                borderRadius: "5px 5px 0 0",
              }}
            >
              <div
                style={{
                  justifyContent: "center",
                }}
              >
                {names.map((name, index) => (
                  <ListItem key={index} onClick={() => handleImageClick(name)}>
                    <ListItemText primary={name} />
                  </ListItem>
                ))}
              </div>
            </List>
          </div>
          <div className="imageContainer">
            {selectedImage !== "no_img" ? (
              <img
                src={selectedImage}
                alt="Selected Image"
                className="normal-img"
              />
            ) : (
              <img src={no_img} alt="No Image" className="normal-img" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
