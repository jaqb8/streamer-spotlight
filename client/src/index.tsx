import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createHashRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./context/AuthContext";
import { StreamersProvider } from "./context/StreamersContext";
import Streamer from "./components/Streamer";
import Root from "./components/Root";
import About from "./components/About";

const router = createHashRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/streamer/:id",
        element: <Streamer />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <StreamersProvider>
        <RouterProvider router={router} />
      </StreamersProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
