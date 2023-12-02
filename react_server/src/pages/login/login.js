import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./login.css";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);

	// const handleLogin = async () => {
	// const handleLogin = async () => {
	// 	try {
	// 		const response = await fetch("your-api-endpoint/login", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({ username, password }),
	// 		});

	// 		if (response.ok) {
	// 			setLoggedIn(true);
	// 			// You may perform additional actions upon successful login
	// 		} else {
	// 			// Handle authentication error
	// 			toast.error("Error Username or Password");
	// 		}
	// 	} catch (error) {
	// 		toast.error("Error during login:" + String(error));
	// 	}
	// };

	const handleLogin = async () => {
		if (username === "admin" && password === "admin") {
			sessionStorage.username = "admin";
			sessionStorage.password = "admin";
			setLoggedIn(true);
			return;
		}
		// sessionStorage.username = "sometig";
		// sessionStorage.password = "sometig";
		// setLoggedIn(true);
		// return;
		try {
			const data = {
				id: 9999999,
				fname: "",
				lname: "",
				email: username,
				title: "",
				photograph_path: "",
				password: password,
				department_id: {
					id: 9999999,
					name: "",
					capacity: 9999999,
				},
			};
			console.log(data);
			const response = await axios.post(
				"http://localhost:8080/login",
				data
			);
			console.log(response);
			if (response.data) {
				sessionStorage.username = username;
				sessionStorage.password = password;
				sessionStorage.id = response.data.id;
				sessionStorage.data = JSON.stringify(response.data);
				setLoggedIn(true);
			} else {
				// Handle authentication error
				toast.error("Login failed");
			}
		} catch (error) {
			toast.error("Error during login:" + String(error));
		}
	};
	useEffect(() => {
		var sessionStorage_transfer = function (event) {
			if (!event) {
				event = window.event;
			} // ie suq
			if (!event.newValue) return; // do nothing if no value to work with
			if (event.key == "getSessionStorage") {
				// another tab asked for the sessionStorage -> send it
				localStorage.setItem(
					"sessionStorage",
					JSON.stringify(sessionStorage)
				);
				// the other tab should now have it, so we're done with it.
				localStorage.removeItem("sessionStorage"); // <- could do short timeout as well.
			} else if (
				event.key == "sessionStorage" &&
				!sessionStorage.length
			) {
				// another tab sent data <- get it
				var data = JSON.parse(event.newValue);
				for (var key in data) {
					sessionStorage.setItem(key, data[key]);
				}
			}
		};

		localStorage.setItem("getSessionStorage", "foobar");
		localStorage.removeItem("getSessionStorage", "foobar");
		if (window.addEventListener) {
			window.addEventListener("storage", sessionStorage_transfer, false);
		} else {
			window.attachEvent("onstorage", sessionStorage_transfer);
		}
		if (sessionStorage.username) {
			setLoggedIn(true);
			console.log("setting logged in");
		}
	}, []);

	return (
		<>
			{loggedIn ? (
				// <div>
				// 	<h2>Welcome, IIITB ERP System!</h2>
				// 	{/* Display employee dashboard or other content */}
				// </div>
				<Navigate to={"/dashboard"} />
			) : (
				<div className="login">
					<div className="login_box">
						<h1 className="login-box-header">IIITB ERP System</h1>
						<h2 className="login-text">Login</h2>
						<Form>
							<FormGroup>
								<Label
									style={{ display: "flex", margin: "20px" }}
								>
									Username:
								</Label>
								<Input
									type="text"
									value={username}
									onChange={(e) => {
										return setUsername(e.target.value);
									}}
								/>
							</FormGroup>
							<br />
							<FormGroup>
								<Label
									style={{ display: "flex", margin: "20px" }}
								>
									Password:
								</Label>
								<Input
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</FormGroup>
							<br />
							<Button
								type="button"
								className="btn btn-primary login-button"
								onClick={handleLogin}
							>
								Login
							</Button>
						</Form>
					</div>
				</div>
			)}
		</>
	);
}
