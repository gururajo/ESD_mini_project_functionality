import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Link, Navigate } from "react-router-dom";
import { Button } from "reactstrap";
import Profile from "../../components/profile";
import axios from "axios";
import { toast } from "react-toastify";

export default function Dashboard() {
	const [isPressed, setisPressesd] = useState(false);
	const [isadmin, setisAdmin] = useState(false);
	const [employees, setemployees] = useState(undefined);

	function clearSession() {
		// useEffect(() => {
		// 	sessionStorage.clear();
		// }, []);
		sessionStorage.clear();
		setisPressesd(true);
	}
	useEffect(() => {
		if (sessionStorage.length === 0) {
			setisPressesd(true);
		}
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

		// listen for changes to localStorage
		if (window.addEventListener) {
			window.addEventListener("storage", sessionStorage_transfer, false);
		} else {
			window.attachEvent("onstorage", sessionStorage_transfer);
		}
		if (sessionStorage.username && sessionStorage.username === "admin") {
			setisAdmin(true);
		}
	}, []);

	useEffect(() => {
		if (!isadmin) {
			axios
				.get("http://localhost:8080/employees")
				.then((response) => {
					setemployees(response.data);
					console.log("response", response.data);
				})
				.catch((error) => {
					toast.error("Error loading employees ", error);
				});
		}
	}, [isadmin]);
	return (
		<>
			{!isPressed ? (
				<>
					<div className="dashboard-main">
						{!isadmin && sessionStorage.data && (
							<Profile data={JSON.parse(sessionStorage.data)} />
						)}
						{!isadmin ? (
							<div className="option">
								<Link
									to="/register"
									className="link-to-register"
								>
									<h1>Update Details</h1>
								</Link>
							</div>
						) : (
							<div className="option">
								<Link
									to="/register"
									className="link-to-register"
								>
									<h1>Register Employee</h1>
								</Link>
							</div>
						)}

						<div className="option">
							<Button onClick={clearSession}>Logout</Button>
						</div>
						<div className="row">
							{isadmin &&
								employees &&
								employees.map((employee) => {
									console.log(
										"employee",
										employee,
										employees
									);
									return <Profile data={employee} />;
								})}
						</div>
					</div>
				</>
			) : (
				<Navigate to="/" />
			)}
		</>
	);
}
