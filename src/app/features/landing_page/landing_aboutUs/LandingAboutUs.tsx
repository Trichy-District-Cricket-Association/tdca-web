import { Link } from 'react-router-dom';
import { PageRoutes } from '../../../../enums/pageRoutes';
import './LandingAboutUs.scss';

const aboutUsImg = `${process.env.PUBLIC_URL}/assets/images/about.png`;
const LandingAboutUs: React.FC<any> = (): JSX.Element => {
    return (
        <div className="aboutUs">
            <h1 className="aboutUs__heading">About Us</h1>
            <div className="aboutUs__container">
                <div>
                    <img src={aboutUsImg} alt="About Us" className="aboutUs__container--img" />
                </div>
                <div>
                    <div className="aboutUs__container__header">
                        <h1 className="aboutUs__container__header--text">
                            THE TIRUCHIRAPALLI DISTRICT CRICKET ASSOCIATION
                        </h1>
                        <h3 className="aboutUs__container__header--quote">
                            IT IS FAR MORE THAN A GAME, THIS CRICKET- NEVILLE CARDUS
                        </h3>
                    </div>
                    <p className="aboutUs__container--content">
                        The Tiruchirappalli District Cricket Association (TDCA), affiliated to The Tamilnadu Cricket
                        Association (TNCA), is one of the earliest cricket administration bodies in Tamilnadu, formed in
                        1958. Apart from Trichy, we administered and fostered cricket in the present districts of
                        Pudukkottai, Karur, Perambalur, Ariyalur districts (all these were part of the erstwhile Trichy
                        district). <Link to={PageRoutes.aboutUs}>more</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LandingAboutUs;
