import React, {Component} from 'react';

class Language extends Component {
    render() {
        return (
            <>
                <h1><i className="fas fa-comments"/> &nbsp;Languages</h1>
                <br/>
                <h4>Indonesia</h4>
                <div className="progress md-progress">
                    <div className="progress-bar" role="progressbar" style={{width: "290px"}}
                         aria-valuenow="0" aria-valuemin="0"
                         aria-valuemax="100"/>
                </div>
                <h4>English</h4>
                <div className="progress md-progress">
                    <div className="progress-bar" role="progressbar" style={{width: "125px"}}
                         aria-valuenow="0" aria-valuemin="0"
                         aria-valuemax="100"/>
                </div>
                <h4>Japan</h4>
                <div className="progress md-progress">
                    <div className="progress-bar" role="progressbar" style={{width: "75px"}}
                         aria-valuenow="0" aria-valuemin="0"
                         aria-valuemax="100"/>
                </div>
            </>
        );
    }
}

export default Language;
