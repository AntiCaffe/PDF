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
        className="postIt"
        value={memo}
        onChange={handleChange}
        placeholder="메모를 입력하세요."
      />
    </div>
  );
};

export default MemoDiv;
