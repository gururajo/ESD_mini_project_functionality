import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Link, Navigate } from "react-router-dom";
import { Button } from "reactstrap";
export default function Dashboard() {
	const [isPressed, setisPressesd] = useState(false);

	function clearSession() {
		// useEffect(() => {
		// 	sessionStorage.clear();
		// }, []);
		sessionStorage.clear();
		setisPressesd(true);
	}
	useEffect(() => {
		if (sessionStorage.username === undefined) {
			setisPressesd(true);
		}
	}, []);
	return (
		<>
			{!isPressed ? (
				<div className="dashboard-main">
					<div className="option">
						<Link to="/register" className="link-to-register">
							<h1>Update Details</h1>
						</Link>
					</div>
					<div className="option">
						<Link to="/register" className="link-to-register">
							<h1>Register Employee</h1>
						</Link>
					</div>

					<div className="option">
						<Button onClick={clearSession}>Logout</Button>
					</div>
				</div>
			) : (
				<Navigate to="/" />
			)}
		</>
	);
}
