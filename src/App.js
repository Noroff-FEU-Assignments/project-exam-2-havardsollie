import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./components/feed/Feed";
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import PostDetails from "./components/detail/Detail";
import { AuthProvider } from "./context/AuthContext";
import AuthenticatedNav from "./layout/AuthNav";
import Navigate from "./layout/Nav";
// import "./App.css";

function App() {
	return (
    <AuthProvider>
		<Router>
			<Navigate />
			<div className="container">
				<Routes>
          
            <Route path="/feed" element={<Feed />} />
            <Route path="/detail/:id" element={<PostDetails />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            {/* <Route path="/profile:name" element={<ProfileDetails />} /> */}
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
				</Routes>
			</div>
		</Router>
    </AuthProvider>
	);
}

export default App;
