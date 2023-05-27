import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  TextField,
  ListItemButton,
} from "@mui/material";
import "./index.css";
import no_img from "src/assets/images/no_img.jpg";
import SearchIcon from "@mui/icons-material/Search";

export const NormalImageGallery = ({ defectLengthChange }) => {
  const [names, setNames] = useState([]);
  const [selectedImage, setSelectedImage] = useState("no_img"); // 선택한 이미지의 URL
  const [searchTerm, setSearchTerm] = useState("");
  const [namesLength, setNamesLength] = useState(0); // names 배열의 길이를 저장하는 변수

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setNamesLength(names.length);
  }, [names]);

  useEffect(() => {
    console.log("len : ", namesLength);
  }, [namesLength]);

  useEffect(() => {
    setNamesLength(names.length);
    defectLengthChange(names.length); // 부모 컴포넌트로 namesLength 값 전달
  }, [names, defectLengthChange]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/dashboard/items");
      const data = response.data;
      console.log(response);

      // null인 데이터를 필터링하여 nameList 생성
      const nameList = data
        .filter((item) => item.name !== null && item.defective === true)
        .map((item) => item.name);

      setNames(nameList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = async (name) => {
    try {
      const response = await axios.get("http://localhost:8080/dashboard/item", {
        params: {
          name: name,
        },
      });
      const data = response.data;
      const imageUrl = data.imageUrl;
      setSelectedImage(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNames = names.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="container">
        <h1>결함품목</h1>
        <div className="content">
          <div className="normal-list scrollableList">
            <div
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1, //리스트 item 보다는 위에, 메뉴항목보다는 아래에 위치
                backgroundColor: "#fff",
              }}
            >
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
            </div>
            <List>
              {filteredNames.length === 0 ? (
                <ListItem>
                  <ListItemText
                    primary="해당 결함품이 없습니다."
                    sx={{ color: "grey" }}
                  />
                </ListItem>
              ) : (
                filteredNames.map((name, index) => (
                  <ListItem key={index} component="div">
                    <ListItemButton onClick={() => handleImageClick(name)}>
                      <ListItemText primary={name} sx={{ zIndex: "-99" }} />
                    </ListItemButton>
                  </ListItem>
                ))
              )}
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
export default NormalImageGallery;
