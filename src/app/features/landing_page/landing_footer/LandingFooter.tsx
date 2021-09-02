import { Link } from 'react-router-dom';
import { BiMap } from 'react-icons/bi';
import { FiFacebook, FiMail } from 'react-icons/fi';

import { PageRoutes } from '../../../../enums/pageRoutes';
import './LandingFooter.scss';

const LandingFooter: React.FC<any> = (): JSX.Element => {
    return (
        <div className="">
            <footer className="footer">
                <div className="footer-left col-md-4 col-sm-6">
                    <p className="about">
                        <span> About TDCA</span> The Tiruchirappalli District Cricket Association (TDCA), affiliated to
                        The Tamilnadu Cricket Association (TNCA), is one of the earliest cricket administration bodies
                        in Tamilnadu, formed in 1958. Apart from Trichy, we administered and fostered cricket in the
                        present districts of Pudukkottai, Karur, Perambalur, Ariyalur districts. <p></p>
                        <Link to={PageRoutes.aboutUs}>more</Link>
                    </p>
                    <div className="icons">
                        <a href="https://m.facebook.com/100009163455431/">
                            <i className="fa fa-facebook">
                                <FiFacebook />
                            </i>
                        </a>
                    </div>
                </div>
                <div className="footer-center col-md-4 col-sm-6">
                    <div>
                        <i className="fa fa-map-marker">
                            <BiMap />
                        </i>
                        <p>Tiruchirappalli, India</p>
                    </div>

                    <div>
                        <i className="fa fa-envelope">
                            <FiMail />
                        </i>
                        <p>
                            <a href="mailto:tdcatrichy@gmail.com">tdcatrichy@gmail.com</a>
                        </p>
                    </div>
                </div>
                <div className="footer-right col-md-4 col-sm-6">
                    <p className="menu">
                        <a href="#"> Home</a> | <Link to={PageRoutes.aboutUs}> About</Link>
                    </p>
                    <p className="name"> tdca &copy; 2021</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingFooter;
