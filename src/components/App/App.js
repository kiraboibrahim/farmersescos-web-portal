import React from "react";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import router from "../../routes/routes";
import { RouterProvider } from "react-router";

function App() {
  return (
    <CssBaseline>
      <CssVarsProvider>
        <RouterProvider router={router} />
      </CssVarsProvider>
    </CssBaseline>
  );
}

export default App;
