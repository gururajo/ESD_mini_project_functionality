import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "reactstrap";

export default function LoggoutButton() {
	const [isPressed, setisPressesd] = useState(false);

	function clearSession() {
		// useEffect(() => {
		// 	sessionStorage.clear();
		// }, []);
		sessionStorage.clear();
		setisPressesd(true);
	}
	return (
		<>
			{isPressed ? (
				<Navigate to="/" />
			) : (
				<Button onClick={clearSession}>Logout</Button>
			)}
		</>
	);
}
