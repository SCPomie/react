import { Link } from "react-router-dom";
import React from "react";

const NavBar = () => {
    return (
        <nav>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/category" style={{ marginRight: "10px" }}>category</Link>
        <Link to="/order" style={{ marginRight: "10px" }} >Order</Link>
        <Link to="/customer" style={{ marginRight: "10px" }} >customer</Link>
        </nav>
    )
}

export default NavBar