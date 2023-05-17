import React from "react";

const ProfilePage = () => {
  // 프로필 정보
  const profile = {
    name: "이름",
    username: "아이디",
    phoneNumber: "전화번호",
    email: "이메일",
  };

  return (
    <div className="profile-container">
      <h1>프로필 페이지</h1>
      <div className="profile-info">
        <p>
          <strong>이름:</strong> {profile.name}
        </p>
        <p>
          <strong>아이디:</strong> {profile.username}
        </p>
        <p>
          <strong>전화번호:</strong> {profile.phoneNumber}
        </p>
        <p>
          <strong>이메일:</strong> {profile.email}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
