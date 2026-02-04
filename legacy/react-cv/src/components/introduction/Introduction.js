import React, {Component} from 'react';
import Skill from "./Skill";
import Language from "./Language";
import Contact from "./Contact";
import Experience from "./Experience";
import Graduation from "./Graduation";
import ProfessionalExperience from "./ProfessionalExperience";
import School from "./School";
import Hobbies from "./Hobbies";

class Introduction extends Component {
    render() {
        const pp = require("../../images/pp.jpg")
        return (
            <>
                <div className="row mt-5 mb-5 background-container">
                    <div className="col-md-4 pl-md-4">
                        <img className="img-fluid circular--portrait z-depth-3" src={pp}
                             alt="img"/>
                    </div>
                    <div className="col-md-8">
                        <h1 className="">Firman Agam</h1>
                        <h4 className="">Full-Stack Developer</h4>
                        <div className="col-md-12 horizontal-line"/>
                        <h3>About Me</h3>
                        <h5 className="font-weight-normal">
                            Hi, my name is firman agam. i'm a full-stack developer, i do programming since i'm
                            student.
                            I love exploring new technologies and often amazed by the progress we as a human.
                            even though I am not fast at learning, but I always try my best in doing everything.
                        </h5>
                    </div>
                    <div className="col-md-12 horizontal-line mb-5 mt-5"/>
                    <div className="col-md-4 pl-md-4">
                        <Skill/>
                        <br/>
                        <Language/>
                        <br/>
                        <Contact/>
                    </div>
                    <div className="col-md-2">
                        <Experience/>
                        <br/> <br/>
                        <br/>
                        <Graduation/>
                    </div>
                    <div className="col-md-6">
                        <ProfessionalExperience/>
                        <br/>
                        <School/>
                        <br/>
                        <Hobbies/>
                    </div>
                </div>
            </>
        );
    }
}

export default Introduction;
