import React, { useState } from "react";
import "./index.css";
const MemoDiv = () => {
  const [memo, setMemo] = useState("");

  const handleChange = (event) => {
    setMemo(event.target.value);
  };

  return (
    <div>
      <textarea
        value={memo}
        onChange={handleChange}
        placeholder="메모를 입력하세요."
      />
      <div className="postIt">
        <h3>메모 내용:</h3>
        <p>{memo}</p>
      </div>
    </div>
  );
};

export default MemoDiv;
