import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [names, setNames] = useState([]);

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

  return (
    <div>
      <h1>Names</h1>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
