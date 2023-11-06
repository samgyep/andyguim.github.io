import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import SessionMain from "./pages/SessionMain";
import CreateSession from "./pages/CreateSession";
import EditSession from "./pages/EditSession";
import DeleteSession from "./pages/DeleteSession";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/session" element={<SessionMain />} />
      <Route path="/session/create" element={<CreateSession />} />
      <Route path="/session/edit/:id" element={<EditSession />} />
      <Route path="/session/delete/:id" element={<DeleteSession />} />
      <Route path="/user/create" element={<CreateUser />} />
      <Route path="/user/signin" element={<SignIn />} />
      <Route path="/user/:email" element={<Profile />} />
    </Routes>
  );
};

export default App;
