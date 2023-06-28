import React from "react";
import "./App.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AddStreamer from "./components/AddStreamer";
import StreamersList from "./components/StreamersList";

function App() {
  return (
    <>
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ mt: 3, fontWeight: 700 }}
        >
          Streamer Spotlight
        </Typography>

        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
          sx={{ my: 4 }}
        >
          Welcome to Streamer Spotlight, the ultimate hub to discover and
          appreciate your favorite content creators! Here you can find
          information about your favorite streamers.👾
        </Typography>
        <AddStreamer />
        <StreamersList />
      </Container>
    </>
  );
}

export default App;
