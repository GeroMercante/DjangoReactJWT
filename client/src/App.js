import React from "react";

import { Provider } from "react-redux";
import store from "./store";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Signup,
  Activate,
  ResetPassword,
  ResetPasswordConfirm,
} from "./containers/";

import Layout from "./hocs/Layout";
import GlobalStyles from "./styles/GlobalStyles";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <GlobalStyles />
          <Layout>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/password/reset/confirm/:uid/:token"
                element={<ResetPasswordConfirm />}
              />
              <Route path="/activate/:uid/:token" element={<Activate />} />
            </Routes>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </Layout>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
