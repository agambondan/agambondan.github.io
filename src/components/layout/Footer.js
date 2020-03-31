import React, {Component} from 'react';
import {a} from "react-router-dom";

class Footer extends Component {
    render() {
        return (
            <footer className="page-footer font-small blue-grey darken-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 py-5">
                            <div className="mb-5 flex-center">
                                <a href="https://www.facebook.com/agambondan" className="fb-ic">
                                    <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"/>
                                </a>
                                <a href="https://twitter.com/AgamMADESU" className="tw-ic">
                                    <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"/>
                                </a>
                                <a href="https://aboutme.google.com/u/1/?pageId=none" className="gplus-ic">
                                    <i className="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x"/>
                                </a>
                                <a href="https://www.aedin.com/in/firman-agam/" className="li-ic">
                                    <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"/>
                                </a>
                                <a href="https://www.instagram.com/agammadesu/" className="ins-ic">
                                    <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"/>
                                </a>
                                <a href="https://github.com/agambondan" className="pin-ic">
                                    <i className="fab fa-github fa-lg white-text fa-2x"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright text-center py-3">© 2020 Copyright: Firman Agam
                </div>
            </footer>
        );
    }
}

export default Footer;
