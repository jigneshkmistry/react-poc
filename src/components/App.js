import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import AboutPage from "./about/AboutPage";
import RegisterPage from "./auth/RegisterPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import ManageCoursePage from "./courses/ManageCoursePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Amplify from 'aws-amplify';
import PrivateRoute from "./auth/PrivateRoute";

Amplify.configure({
  Auth: {

    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_NI4ePiCuK',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '158qa5gdaedlidt4gl01kcea33',

    // scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],

    oauth: {
      domain: 'https://jkmtest.auth.us-east-1.amazoncognito.com',
      // scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: 'http://localhost:4200',
      redirectSignOut: 'http://localhost:4200',
      responseType: 'token' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }

  }
});

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={
          <PrivateRoute>
            <CoursesPage />
          </PrivateRoute>}>
        </Route>
        <Route path="/course/:slug" element={
          <PrivateRoute>
            <ManageCoursePage />
          </PrivateRoute>}>
        </Route>

        <Route path="/course" element={
          <PrivateRoute>
            <ManageCoursePage />
          </PrivateRoute>}>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
