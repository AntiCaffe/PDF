import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [total, setTotal] = useState(0);
  const [normal, setNormal] = useState(0);
  const [bad, setBad] = useState(0);
  const [imageList, setImageList] = useState([]);

  // fetch data from backend and update the state
  /*useEffect(() => {
    fetch("backend-url") // replace with your backend URL
      .then((response) => response.json())
      .then((data) => {
        setTotal(data.total);
        setNormal(data.normal);
        setBad(data.bad);
        setImageList(data.images || []); // add null check for images
      })
      .catch((error) => console.error(error));
  }, []);*/

  // handle image click
  function handleImageClick(imageUrl) {
    // show the image in a modal or popup
    console.log(imageUrl);
  }

  return (
    <div>
      {/* Top banner */}
      {/* 1. White banner with text and sidebar */}
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 50,
        }}
      >
        <div style={{ marginLeft: 20 }}>PDF project proto</div>
        <div style={{ marginRight: 20 }}>
          <button>Profile</button>
          <button>Defect Page</button>
          <Link to="/authentication/sign-in">
            <button>Logout</button>
          </Link>
        </div>
      </div>

      {/* Mint-colored box */}
      <div
        style={{
          backgroundColor: "#F5F9F8",
          borderRadius: "10px",
          padding: "20px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Rounded square */}
        <div
          style={{
            backgroundColor: "grey",
            borderRadius: "20px",
            padding: "10px",
            color: "white",
            fontSize: "18px",
          }}
        >
          Total: {total}, Normal: {normal}, Bad: {bad}
        </div>
      </div>

      {/* Image list */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div style={{ width: "30%" }}>
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
            Item List
          </div>
          <div
            style={{
              overflowY: "scroll",
              height: "300px",
              border: "1px solid #eee",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            {imageList.map((image, index) => (
              <div
                key={index}
                style={{ marginBottom: "10px", cursor: "pointer" }}
                onClick={() => handleImageClick(image.url)}
              >
                {image.name}
              </div>
            ))}
          </div>
        </div>

        {/* Selected image */}
        <div style={{ width: "60%" }}>
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
            Selected Image
          </div>
          <div>{/* show the selected image here */}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
