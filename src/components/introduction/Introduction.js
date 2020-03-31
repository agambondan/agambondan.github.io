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
        return (
            <>
                <div className="row mt-5 mb-5 background-container">
                    <div className="col-md-4 pl-md-4">
                        <img className="img-fluid circular--portrait z-depth-3"
                             src="https://scontent-cgk1-1.xx.fbcdn.net/v/t1.0-9/12042662_1502011750112370_376280996792218662_n.jpg?_nc_cat=100&_nc_sid=e007fa&_nc_eui2=AeFbmJXxemTqE7J6ooFamyVa7Gkld1E54quovJQNh2QUlsZC2uFtUWZDq5L4eRIinuaYN2kiQYleYB5zjD0e__uxMEQgtB-6TZ5rtJCg8m3bzA&_nc_ohc=R6eZwvcV8ywAX_3naDy&_nc_ht=scontent-cgk1-1.xx&oh=a7bf32f915368f19f37db0fdee228697&oe=5EA48A1D"
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
