import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./components/feed/Feed";
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import PostDetails from "./components/detail/PostDetail";
import { AuthProvider } from "./context/AuthContext";
import AuthenticatedNav from "./layout/AuthNav";
import Navigate from "./layout/Nav";
import "./scss/style.scss"
import ProfileDetails from "./components/detail/ProfileDetail";
import MyProfile from "./components/profile/MyProfile";
import EditPost from "./components/newPost/EditPost";

function App() {
	return (
    <AuthProvider>
		<Router>
			<Navigate />
			<div className="container">
				<Routes>
          
            <Route path="/" element={<Feed />} />
            <Route path="/detail/:id" element={<PostDetails />} />
						<Route path="/detail/edit/:id" element={<EditPost />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/profile/:name" element={<ProfileDetails />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
				</Routes>
			</div>
		</Router>
    </AuthProvider>
	);
}

export default App;
