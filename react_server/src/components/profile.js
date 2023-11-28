import React from "react";
import { Card, CardBody, CardHeader, CardImg } from "reactstrap";
import "./profile.css";

export default function Profile({ data }) {
	// {} =
	console.log("Props", data);
	return (
		data && (
			<Card className="profile-card col-md-4">
				<CardImg
					src={"/data/" + String(data.id) + ".jpg"}
					className="profile-img"
				/>
				<CardHeader> {data.fname + " " + data.lname}</CardHeader>
				<CardBody>
					<p>{data.id}</p>
				</CardBody>
			</Card>
		)
	);
}
