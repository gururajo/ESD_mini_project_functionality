import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import Navbar from "./components/navbar";
import "./App.css"; // You can create this CSS file for styling
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
const App = () => {
	function Notfound() {
		return <div>404 Not Found</div>;
	}
	function Logout() {
		// useEffect(() => {
		// 	sessionStorage.clear();
		// }, []);
		sessionStorage.clear();
		return <Navigate to="/" />;
	}
	const routerpart = (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/logout" element={<Logout />} />
			<Route path="*" element={<Notfound />} />
		</Routes>
	);
	return routerpart;
};

export default App;
