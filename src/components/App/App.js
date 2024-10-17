import React from "react";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import router from "../../routes/routes";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <CssBaseline>
      <CssVarsProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </CssVarsProvider>
    </CssBaseline>
  );
}

export default App;
