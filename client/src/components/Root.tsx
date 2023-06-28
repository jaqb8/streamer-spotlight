import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Container from "@mui/material/Container";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <div className="App">
      <Toaster
        toastOptions={{
          style: {
            borderRadius: "20px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Navbar />
      <Container sx={{ minHeight: "100vh" }}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default Root;
