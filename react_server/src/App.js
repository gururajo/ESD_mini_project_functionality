import React from "react";
import { Route, Routes } from "react-router-dom";
// import Navbar from "./components/navbar";
import "./App.css"; // You can create this CSS file for styling
import Login from "./components/login/login";
const App = () => {
	function Notfound() {
		return <div>404 Not Found</div>;
	}
	const routerpart = (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="*" element={<Notfound />} />
		</Routes>
	);
	return routerpart;
};

export default App;
