import { ThemeProvider } from "@mui/material";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { RegisterNewUser } from "./Pages/Auth/Register";
import { RegisterCreditCard } from "./Pages/Auth/RegisterCreditCard";
import { User } from "./Pages/Auth/User";
import { LandingPage } from "./Pages/Common/LandingPage";
import { Register } from "./Pages/Common/Register";
import { theme } from "./Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ReactNotifications />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-new" element={<RegisterNewUser />} />
          <Route path="/user" element={<User />} />
          <Route
            path="/register-credit-card"
            element={<RegisterCreditCard />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
