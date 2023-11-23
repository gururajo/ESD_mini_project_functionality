import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./login.css";
export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);

	// const handleLogin = async () => {
	const handleLogin = () => {
		setLoggedIn(true);

		// uncomment the following line if you do not want

		// Simulating an API call for authentication
		// try {
		// 	const response = await fetch("your-api-endpoint/login", {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify({ username, password }),
		// 	});

		// 	if (response.ok) {
		// 		return <BrowserRouter to="/home" />;
		// 		// You may perform additional actions upon successful login
		// 	} else {
		// 		// Handle authentication error
		// 		console.error("Login failed");
		// 	}
		// } catch (error) {
		// 	console.error("Error during login:", error);
		// }
	};

	return (
		<>
			{loggedIn ? (
				// <div>
				// 	<h2>Welcome, IIITB ERP System!</h2>
				// 	{/* Display employee dashboard or other content */}
				// </div>
				<Navigate to={"/home"} />
			) : (
				<div className="login">
					<div className="login_box">
						<h1 className="login-box-header">IIITB ERP System</h1>
						<h2 className="login-text">Login</h2>
						<label>
							Username:
							<input
								type="text"
								value={username}
								onChange={(e) => {
									return setUsername(e.target.value);
								}}
							/>
						</label>
						<br />
						<label>
							Password:
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>
						<br />
						<button
							type="button"
							className="btn btn-primary login-button"
							onClick={handleLogin}
						>
							Login
						</button>
					</div>
				</div>
			)}
		</>
	);
}
