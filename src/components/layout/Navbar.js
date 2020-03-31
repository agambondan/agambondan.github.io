import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Navbar extends Component {
    render() {
        const img = require("../../images/Portfolio.png");
        return (
            <nav className="navbar navbar-expand-lg navbar-dark blue-grey">
                <Link to="" className="navbar-brand">
                    <img className="img-fluid" src={img} width="100px" alt="img"/>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                        aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="basicExampleNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="" className="nav-link">INTRODUCTION
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/skill" className="nav-link">SKILL</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/hobbies" className="nav-link">HOBBIES</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">ABOUT</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;
