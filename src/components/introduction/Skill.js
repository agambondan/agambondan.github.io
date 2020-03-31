import React, {Component} from 'react';

class Skill extends Component {
    render() {
        return (
            <>
                <h1><i className="fas fa-cogs"/> &nbsp;Skill</h1>
                <br/>
                <h4>HTML</h4>
                <div className="progress md-progress">
                    <div className="progress-bar" role="progressbar" style={{width: "75%"}}
                         aria-valuenow="0" aria-valuemin="0"
                         aria-valuemax="100"/>
                </div>
                <h4>CSS</h4>
                <div className="progress md-progress">
                    <div className="progress-bar" role="progressbar" style={{width: "45%"}}
                         aria-valuenow="0" aria-valuemin="0"
                         aria-valuemax="100"/>
                </div>
                <h4>JavaScript</h4>
                <div className="progress md-progress">
                    <div className="progress-bar" role="progressbar" style={{width: "55%"}}
                         aria-valuenow="0" aria-valuemin="0"
                         aria-valuemax="100"/>
                </div>
                <h4>PHP</h4>
                <div className="progress md-progress">
                    <div className="progress-bar" role="progressbar" style={{width: "60%"}}
                         aria-valuenow="0" aria-valuemin="0"
                         aria-valuemax="100"/>
                </div>
                <h4>JAVA</h4>
                <div className="progress md-progress">
                    <div className="progress-bar" role="progressbar" style={{width: "75%"}}
                         aria-valuenow="0" aria-valuemin="0"
                         aria-valuemax="100"/>
                </div>
                <h4>Golang</h4>
                <div className="progress md-progress">
                    <div className="progress-bar" role="progressbar" style={{width: "40%"}}
                         aria-valuenow="0" aria-valuemin="0"
                         aria-valuemax="100"/>
                </div>
                <h4>SQL</h4>
                <div className="progress md-progress">
                    <div className="progress-bar" role="progressbar" style={{width: "45%"}}
                         aria-valuenow="0" aria-valuemin="0"
                         aria-valuemax="100"/>
                </div>
                <h4>NoSQL</h4>
                <div className="progress md-progress">
                    <div className="progress-bar" role="progressbar" style={{width: "30%"}}
                         aria-valuenow="0" aria-valuemin="0"
                         aria-valuemax="100"/>
                </div>
            </>
        );
    }
}

export default Skill;
