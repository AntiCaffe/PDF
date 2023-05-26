import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  TextField,
} from "@mui/material";
import "./index.css";
import no_img from "src/assets/images/no_img.jpg";
import SearchIcon from "@mui/icons-material/Search";
import { Margin } from "@mui/icons-material";

const Dashboard = () => {
  const [names, setNames] = useState([]);
  const [selectedImage, setSelectedImage] = useState("no_img"); // 선택한 이미지의 URL

  useEffect(() => {
    fetchData();
  }, []);

  /*
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
  */
  const fetchData = async () => {
    try {
      const tempData = [
        { name: "photo 1", imageUrl: "http://example.com/image1.jpg" },
        { name: "photo 2", imageUrl: "http://example.com/image2.jpg" },
        { name: "photo 3", imageUrl: "http://example.com/image3.jpg" },
        { name: "photo 4", imageUrl: "http://example.com/image1.jpg" },
        { name: "Image 5", imageUrl: "http://example.com/image2.jpg" },
        { name: "Image 6", imageUrl: "http://example.com/image3.jpg" },
        { name: "Image 7", imageUrl: "http://example.com/image1.jpg" },
        { name: "Image 8", imageUrl: "http://example.com/image2.jpg" },
        { name: "Image 9", imageUrl: "http://example.com/image3.jpg" },
      ];
      const nameList = tempData.map((item) => item.name);
      setNames(nameList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = async (name) => {
    try {
      const tempData = [
        { name: "Image 1", imageUrl: "http://example.com/image1.jpg" },
        { name: "Image 2", imageUrl: "http://example.com/image2.jpg" },
        { name: "Image 3", imageUrl: "http://example.com/image3.jpg" },
      ];
      const imageUrl = tempData.find((item) => item.name === name)?.imageUrl;
      setSelectedImage(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNames = names.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="container">
        <h1>정상품목</h1>
        <div className="content">
          <div className="normal-list scrollableList">
            <TextField
              type="text"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="검색어를 입력하세요"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ margin: "5px" }}
            />
            <List>
              <div
                style={{
                  justifyContent: "center",
                }}
              >
                {filteredNames.map((name, index) => (
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
