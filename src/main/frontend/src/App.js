import React, { useState, useEffect } from "react";

// @mui material 컴포넌트 (아직 적용 하지 않았음)
//import { ThemeProvider } from "@mui/material/styles"; 추후 다크모드 추가시 사용할 예정입니다
//import CssBaseLine from "@mui/material/CssBaseline";

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import SignIn from "layouts/authentication/sign-in";
import MainPage from "layouts/dashboard/main-page";
import ProfilePage from "layouts/profile";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
          <Route path={"/authentication/sign-in"} element={<SignIn />}></Route>
          <Route path={"/dashboard/main-page"} element={<MainPage />}></Route>
          <Route path={"/profile"} element={<ProfilePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
