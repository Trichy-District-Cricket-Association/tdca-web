import './LandingHeader.scss';
import { MdKeyboardArrowRight } from 'react-icons/md';
const landingImg = `${process.env.PUBLIC_URL}/assets/images/landingImg.svg`;
const cricketStadium = `${process.env.PUBLIC_URL}/assets/images/cricketStadium.jpg`;
const LandingHeader: React.FC<any> = (): JSX.Element => {
    return (
        <div
            className="header"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.600),rgba(0,0,0,0.810)),url(${cricketStadium})`,
            }}
        >
            <div className="header__container">
                <div>
                    <p className="header__container--text">
                        We are passionate group of people here at Trichy, organizing Matches for those who love cricket.
                    </p>
                    <p className="header__container--subText">
                        We help you play in cricket matches of various levels and kinds
                    </p>
                    <button className="header__container--contactBtn">
                        Contact
                        <i className="icons">
                            <MdKeyboardArrowRight />
                        </i>
                    </button>
                </div>
                <img src={landingImg} alt="Landing" className="header__container--img" />
            </div>
        </div>
    );
};

export default LandingHeader;
