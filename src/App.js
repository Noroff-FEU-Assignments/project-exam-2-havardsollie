import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./components/feed/Feed";
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import PostDetails from "./components/detail/PostDetail";
import { AuthProvider } from "./context/AuthContext";
import Navigate from "./layout/Nav";
import "./scss/style.scss"
import ProfileDetails from "./components/detail/ProfileDetail";
import EditPost from "./components/posts/EditPost";
import ListOfProfiles from "./components/profiles/AllProfiles";
import Footer from "./layout/Footer";
import HomePage from "./components/home/Home";

function App() {
	return (
    <AuthProvider>
		<Router>
			<Navigate />
			<div className="container">
				<Routes>
          
            <Route path="/" element={<HomePage />} />
						<Route path="/feed" element={<Feed />} />
						<Route path="/allprofiles" element={<ListOfProfiles />} />
            <Route path="/detail/:id" element={<PostDetails />} />
						<Route path="/detail/edit/:id" element={<EditPost />} />
            <Route path="/profile/:name" element={<ProfileDetails />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
				</Routes>
			</div>
			<Footer />
		</Router>
    </AuthProvider>
	);
}

export default App;
