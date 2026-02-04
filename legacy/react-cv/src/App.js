import React from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Footer from "./components/layout/Footer";
import Introduction from "./components/introduction/Introduction";
import Skill from "./components/skill/Skill";
import About from "./components/about/About";
import Hobbies from "./components/hobbies/Hobbies";

class App extends React.Component {
    render() {
        return (
            <>
                <Router>
                    <div className="container">
                        <div className="row mb-5 background-container">
                            <div className="col-md-12">
                                <Navbar/>
                            </div>
                        </div>
                        <Switch>
                            <Route exact path={""}><Introduction/></Route>
                            <Route path={"/introduction"}><Introduction/></Route>
                            <Route path={"/skill"}><Skill/></Route>
                            <Route path={"/about"}><About/></Route>
                            <Route path={"/hobbies"}><Hobbies/></Route>
                        </Switch>
                        <div className="row background-container">
                            <div className="col-md-12">
                                <Footer/>
                            </div>
                        </div>
                    </div>
                </Router>
            </>
        );
    }
}

export default App;

//  "homepage": "https://agambondan.github.io/portfolio",
