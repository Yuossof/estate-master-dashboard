import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { AuthProvider } from "./context/AuthProvider";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "../src/assets/scss/app.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/custom-css.css"

const savedTheme = JSON.parse(localStorage.getItem("darkMode"));
if (savedTheme) {
  document.body.classList.add("dark");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter >
      <Provider store={store} >
        <ScrollToTop />
        <AuthProvider >
          <App />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </>
);
