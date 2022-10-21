import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import PostDetails from "./components/detail/Detail";
import Nav from "./layout/Nav";
// import "./App.css";

function App() {
	return (
		<Router>
			<Nav />

			<div className="container">
				<Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/detail/:id" element={<PostDetails />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
					{/* <Route path="/dashboard" exact>
						<DashboardPage />
					</Route> */}
				</Routes>
			</div>
		</Router>
	);
}

export default App;
