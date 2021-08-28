import './LandingHeader.scss';
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
                        We are official cricket administration body with regards to any form of cricket played in trichy
                        district and affiliated to the TamilNadu District Cricket Association.
                    </p>
                    <p className="header__container--subText">
                        IT IS FAR MORE THAN A GAME, THIS CRICKET- NEVILLE CARDUS
                    </p>
                    <button className="header__container--contactBtn">Contact</button>
                </div>
                <img src={landingImg} alt="Landing" className="header__container--img" />
            </div>
        </div>
    );
};

export default LandingHeader;
