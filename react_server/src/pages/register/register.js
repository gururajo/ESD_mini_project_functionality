import React, { useEffect, useState } from "react";
import "./register.css";
import "react-toastify/dist/ReactToastify.css";
import {
	Card,
	CardBody,
	CardHeader,
	Container,
	FormGroup,
	Input,
	Label,
	Form,
	Dropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu,
	Button,
} from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
export default function Register() {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const [departments, setDepartments] = useState([]);
	const [dropdownChoice, setDropdownChoice] = useState("Choose Option");

	const toggle = () => setDropdownOpen((prevState) => !prevState);
	const [data, setData] = useState({
		id: 9999999,
		fname: "",
		lname: "",
		email: "",
		title: "",
		photograph_path: "",
		password: "",
		department_id: {
			id: 9999999,
			name: "",
			capacity: 9999999,
		},
	});

	useEffect(() => {
		axios
			.get("http://localhost:8080/departments")
			.then((response) => {
				console.log(response.data);
				setDepartments(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		console.log(data);
	}, [data]);

	function handelChange(event) {
		console.log(event);
		setData((data) => {
			return { ...data, [event.target.id]: event.target.value };
		});
	}

	function uploadPhoto(id) {
		const formData = new FormData();
		formData.append("file", data.photograph_path);
		// make a POST request to the File Upload API with the FormData object and Rapid API headers
		axios
			.post("http://localhost:8080/profile_photo/" + id, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				// handle the response
				console.log(response);
			})
			.catch((error) => {
				// handle errors
				console.log(error);
			});
	}

	async function validateAndSubmit(event) {
		console.log(event);
		event.preventDefault();
		if (data.fname === "") {
			toast.error("First name is Emplty");
			return;
		}

		if (data.lname === "") {
			toast.error("Last name is Emplty");
			return;
		}
		if (data.email === "") {
			toast.error("E-mail is Emplty");
			return;
		}
		if (data.password === "") {
			toast.error("Password is Emplty");
			return;
		}
		if (data.title === "") {
			toast.error("Title is Emplty");
			return;
		}
		if (data.department_id === "Choose Option") {
			toast.error("Please select department");
			return;
		}
		if (data.photograph_path === "") {
			toast.error("Please add profile picture");
			return;
		}
		data.photograph_path = "";
		toast.success("Okay submitting");
		console.log(data);
		try {
			const response = await axios.post(
				"http://localhost:8080/employee",
				data
			);
			console.log(response);
			if (response.status === 200) {
				console.log(response);
				uploadPhoto(response.data.id);
			} else {
				// Handle authentication error
				toast.error("Submit failed");
			}
		} catch (error) {
			toast.error("Error during uploading:" + String(error));
		}
	}

	function handlePhotoUpdate(event) {
		console.log(event);
		setData((data) => {
			return { ...data, photograph_path: event.target.files[0] };
		});
	}
	return (
		<Container className="login_box">
			<Card className="login_box">
				<CardHeader>
					<h3> Fill the form to Register</h3>
				</CardHeader>
				<CardBody>
					<Form onSubmit={(e) => validateAndSubmit(e)}>
						<FormGroup>
							<Label for="firstname">First Name</Label>
							<Input
								type="text"
								placeholder="First name"
								id="fname"
								value={data.fname}
								onChange={(e) => handelChange(e)}
							></Input>
						</FormGroup>
						<FormGroup>
							<Label for="lastname">Last Name</Label>
							<Input
								type="text"
								placeholder="Last name"
								id="lname"
								value={data.lname}
								onChange={(e) => handelChange(e)}
							></Input>
						</FormGroup>
						<FormGroup>
							<Label for="email">E-mail</Label>
							<Input
								type="text"
								placeholder="email"
								id="email"
								value={data.email}
								onChange={(e) => handelChange(e)}
							></Input>
						</FormGroup>
						<FormGroup>
							<Label for="password">Password</Label>
							<Input
								type="password"
								placeholder="password"
								id="password"
								value={data.password}
								onChange={(e) => handelChange(e)}
							></Input>
						</FormGroup>
						<FormGroup>
							<Label for="title">Title</Label>
							<Input
								type="text"
								placeholder="Title"
								id="title"
								value={data.title}
								onChange={(e) => handelChange(e)}
							></Input>
						</FormGroup>
						<FormGroup>
							<Label for="department">Department</Label>
							<Dropdown
								isOpen={dropdownOpen}
								toggle={toggle}
								direction="down"
								defaultValue={"Choose Option"}
							>
								<DropdownToggle caret>
									Select Department
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem disabled={true}>
										Choose Option
									</DropdownItem>
									{departments ? (
										departments.map((department) => (
											<DropdownItem
												key={department.id}
												onClick={() => {
													setData((data) => {
														setDropdownChoice(
															department.name
														);
														return {
															...data,
															department_id: {
																id: department.id,
																name: department.name,
																capacity: 9999999,
															},
														};
													});
												}}
											>
												{department.name}{" "}
												{/* Adjust this based on your department structure */}
											</DropdownItem>
										))
									) : (
										<DropdownItem>Loading</DropdownItem>
									)}
								</DropdownMenu>
							</Dropdown>
							<Label for="choice">{dropdownChoice}</Label>
						</FormGroup>
						<FormGroup>
							<Label for="photograph_path">
								Choose the Profile Photo
							</Label>
							<Input
								id="photograph_path"
								name="file"
								type="file"
								onChange={(e) => handlePhotoUpdate(e)}
							/>
						</FormGroup>
						<Button>Submit</Button>
					</Form>
				</CardBody>
			</Card>
		</Container>
	);
}
