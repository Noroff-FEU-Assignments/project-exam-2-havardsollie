import React from "react";
import { useContext } from "react";
import ListOfPosts from "../feed/Feed";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import logo from "../../assets/caffeine_logo.png"
import { Card } from "react-bootstrap";

export default function HomePage() {
  const [auth] = useContext(AuthContext);

  if (!auth) {
    return (
    		<div className="formPage">
          <Card.Img src={logo} alt="Coffeine logo" />
          <hr />
          <div className="welcomeText">
            <h2>Welcome to</h2><h1>Caffeine</h1>
          </div>
          <hr />
          <div className="homeOptions">
            <Link to="/login"><h2>Login</h2></Link>
            <h3>or</h3>
            <Link to="/register"><h2>Register</h2></Link>
          </div>
        </div>
    )
    } else {
      return (
        <ListOfPosts />
      )
  }
}