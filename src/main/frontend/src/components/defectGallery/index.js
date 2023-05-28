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
import zIndex from "@mui/material/styles/zIndex";

export const NormalImageGallery = ({ defectLengthChange }) => {
  const [names, setNames] = useState([]);
  const [selectedImage, setSelectedImage] = useState("no_img"); // 선택한 이미지의 URL
  const [searchTerm, setSearchTerm] = useState("");
  const [namesLength, setNamesLength] = useState(0); // names 배열의 길이를 저장하는 변수
  const [boxes, setBoxes] = useState([]);

  const [imageNaturalWidth, setImageNaturalWidth] = useState(0);
  const [imageNaturalHeight, setImageNaturalHeight] = useState(0);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleImageLoad = (event) => {
    const img = event.target;
    setImageNaturalWidth(img.naturalWidth);
    setImageNaturalHeight(img.naturalHeight);
  };

  const colors = {
    "Normal MultiScrew1": "#00FF00",
    "Normal MultiScrew2": "#00FF11",
    "Normal Screw": "#00FF22",
    "Normal Connector1": "#00FF33",
    "Normal Connector2": "#00FF44",
    "Normal Connector3": "#00FF55",
    "Normal Connector4": "#00FF66",
    "Normal Support1": "#00FF77",
    "Normal Support2": "#00FF88",
    "Normal Support3": "#00FF99",
    "Normal Support4": "#00FFAA",
    "Defect MultiScrew1": "#FF0000",
    "Defect MultiScrew2": "#FF1100",
    "Defect Screw": "#FF2200",
    "Defect Connector1": "#FF3300",
    "Defect Connector2": "#FF4400",
    "Defect Connector3": "#FF5500",
    "Defect Connector4": "#FF6600",
    "Defect Support1": "#FF7700",
    "Defect Support2": "#FF8800",
    "Defect Support3": "#FF9900",
    "Defect Support4": "#FFAA00",
  };

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
      const boxes = data.boxes;
      setBoxes(boxes);
      setSelectedImage(imageUrl);
      setSelectedItem(name);
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

  // bounding box를 렌더링하는 함수
  const renderDetectedBoxes = () => {
    if (selectedImage) {
      const img = new Image();
      img.src = selectedImage;
      const { naturalWidth, naturalHeight } = img;

      return boxes.map((box, index) => {
        const { xmin, ymin, xmax, ymax, typeName } = box;

        const color = colors[typeName] || "white";

        const style = {
          position: "absolute",
          left: `${(xmin * 100) / imageNaturalWidth}%`,
          top: `${(ymin * 100) / imageNaturalHeight}%`,
          width: `${((xmax - xmin) * 100) / imageNaturalWidth}%`,
          height: `${((ymax - ymin) * 100) / imageNaturalHeight}%`,
          border: `1px solid ${color}`,
        };

        return (
          <div key={index} style={style}>
            <div style={{ color: color }}>{typeName}</div>
          </div>
        );
      });
    } else {
      return null;
    }
  };

  return (
    <div>
      <div className="divider top-padding"></div>
      <div className="container">
        <h1>결함품목</h1>
        <div className="content">
          <div className="normal-list scrollableList">
            <div
              style={{
                position: "sticky",
                top: 0,
                zIndex: 10, //리스트 item 보다는 위에, 메뉴항목보다는 아래에 위치
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
                    <ListItemButton
                      onClick={() => handleImageClick(name)}
                      sx={{
                        backgroundColor:
                          selectedItem === name ? "#ffcdcd" : "inherit",
                        zIndex: "1",
                      }}
                    >
                      <ListItemText primary={name} sx={{ zIndex: "-99" }} />
                    </ListItemButton>
                  </ListItem>
                ))
              )}
            </List>
          </div>
          <div className="imageContainer">
            {selectedImage !== "no_img" ? (
              <div style={{ position: "relative" }}>
                <img
                  src={selectedImage}
                  alt="Selected Image"
                  className="normal-img"
                  onLoad={handleImageLoad}
                />
                {renderDetectedBoxes()}
              </div>
            ) : (
              <img src={no_img} alt="No Image" className="normal-img" />
            )}
          </div>
        </div>
      </div>

      <div className="divider top-padding bottom-padding"></div>
    </div>
  );
};
export default NormalImageGallery;
