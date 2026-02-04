import React, {Component} from 'react';

class Hobbies extends Component {
    render() {
        return (
            <>
                <br/>
                <h1>Hobbies</h1>
                <br/>
                <h4><i className="fas fa-book fa-lg"/> &nbsp;&nbsp;Reading</h4>
                <br/>
                <h4><i className="fas fa-plane-departure"/> &nbsp;Traveling</h4>
                <br/>
                <h4><i className="fas fa-running fa-lg"/> &nbsp;&nbsp;Sport</h4>
                <br/>
                <h4><i className="fas fa-memory"/> &nbsp;Technology</h4>
                {/*<br/>*/}
                {/*<h4><i className="fas fa-basketball-ball"/> &nbsp;Basket</h4>*/}
                {/*<br/>*/}
                {/*<h4><i className="fas fa-volleyball-ball"/> &nbsp;Volley</h4>*/}
                {/*<br/>*/}
                {/*<h4><i className="fas fa-headphones"/> &nbsp;Music</h4>*/}
            </>
        );
    }
}

export default Hobbies;
