import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
			<Link className="navbar-brand" to="/">
				OHSEEM
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>

			<div
				className="collapse navbar-collapse"
				id="navbarSupportedContent"
			>
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<Link className="nav-link" to="/">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/products">
							Products
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/cart">
							Cart
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/profile">
							Profile
						</Link>
					</li>
				</ul>
				<form className="form-inline my-lg-0">
					<input
						className="form-control mr-sm-6"
						type="search"
						placeholder="Search"
						aria-label="Search"
					/>
					<button
						className="btn btn-outline-success my-sm-6"
						type="submit"
					>
						Search
					</button>
				</form>
			</div>
		</nav>
	);
}
