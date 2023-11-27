import React from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
export default function Dashboard() {
	return (
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
		</div>
	);
}
