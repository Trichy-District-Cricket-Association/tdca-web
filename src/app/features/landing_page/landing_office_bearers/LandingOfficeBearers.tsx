import './LandingOfficeBearers.scss';
import Carousel, { autoplayPlugin, slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
const officeBearer1 = `${process.env.PUBLIC_URL}/assets/images/officeBearers/president1.jpeg`;
const officeBearer2 = `${process.env.PUBLIC_URL}/assets/images/officeBearers/secretary.jpeg`;
const officeBearer3 = `${process.env.PUBLIC_URL}/assets/images/officeBearers/vicePresident1.jpeg`;
const officeBearer4 = `${process.env.PUBLIC_URL}/assets/images/officeBearers/vicePresident4.jpeg`;
const officeBearer5 = `${process.env.PUBLIC_URL}/assets/images/officeBearers/vicePresident2.jpeg`;
const officeBearer6 = `${process.env.PUBLIC_URL}/assets/images/officeBearers/vicePresident3.jpeg`;
const officeBearer7 = `${process.env.PUBLIC_URL}/assets/images/officeBearers/jtSecretary1.jpeg`;
const officeBearer8 = `${process.env.PUBLIC_URL}/assets/images/officeBearers/jtSecretary2.jpeg`;
const officeBearer9 = `${process.env.PUBLIC_URL}/assets/images/officeBearers/treasurer.jpeg`;

const LandingOfficeBearers: React.FC<any> = (): JSX.Element => {
    return (
        <div className="officeBearers">
            <h1 className="officeBearers__heading">Office Bearers</h1>

            <Carousel
                plugins={[
                    'arrows',
                    'infinite',
                    {
                        resolve: slidesToShowPlugin,
                        options: {
                            numberOfSlides: 1,
                        },
                    },
                    {
                        resolve: autoplayPlugin,
                        options: {
                            interval: 2000,
                        },
                    },
                ]}
                animationSpeed={1000}
                className="officeBearers__container"
            >
                <div className="officeBearer">
                    <div className="officeBearer__row1">
                        <img src={officeBearer1} alt="Dr R Ramasubbu" className="officeBearer__img" />
                    </div>
                    <div className="officeBearer__row2">
                        <h1 className="officeBearer__row2--name">Dr R Ramasubbu</h1>
                        <p className="officeBearer__row2--designation">President</p>
                        <p className="officeBearer__row2--contact">balajidmrtry@gmail.com</p>
                    </div>
                </div>
                <div className="officeBearer">
                    <div className="officeBearer__row1">
                        <img src={officeBearer2} alt="K Sanjay" className="officeBearer__img" />
                    </div>
                    <div className="officeBearer__row2">
                        <h1 className="officeBearer__row2--name">K Sanjay</h1>
                        <p className="officeBearer__row2--designation">Secretary</p>
                        <p className="officeBearer__row2--contact">sanjaykalidas@gmail.com</p>
                    </div>
                </div>

                <div className="officeBearer">
                    <div className="officeBearer__row1">
                        <img src={officeBearer3} alt=" M Meenakshisundaram " className="officeBearer__img" />{' '}
                    </div>
                    <div className="officeBearer__row2">
                        <h1 className="officeBearer__row2--name">M Meenakshisundaram</h1>
                        <p className="officeBearer__row2--designation">Vice President</p>
                        <p className="officeBearer__row2--contact">mmsbaskar@yahoo.co.in</p>
                    </div>
                </div>

                <div className="officeBearer">
                    <div className="officeBearer__row1">
                        <img src={officeBearer4} alt=" K Premanathan" className="officeBearer__img" />{' '}
                    </div>
                    <div className="officeBearer__row2">
                        <h1 className="officeBearer__row2--name">K Premanathan</h1>
                        <p className="officeBearer__row2--designation">Vice President</p>
                        <p className="officeBearer__row2--contact">kpr@anandengg.in</p>
                    </div>
                </div>

                <div className="officeBearer">
                    <div className="officeBearer__row1">
                        <img src={officeBearer5} alt="V Vasudevan" className="officeBearer__img" />
                    </div>
                    <div className="officeBearer__row2">
                        <h1 className="officeBearer__row2--name">V Vasudevan</h1>
                        <p className="officeBearer__row2--designation">Vice President</p>
                        <p className="officeBearer__row2--contact">vasusangam@gmail.com</p>
                    </div>
                </div>
                <div className="officeBearer">
                    <div className="officeBearer__row1">
                        <img src={officeBearer6} alt="K Jayakarna" className="officeBearer__img" />
                    </div>
                    <div className="officeBearer__row2">
                        <h1 className="officeBearer__row2--name">K Jayakarna</h1>
                        <p className="officeBearer__row2--designation">Vice President</p>
                        <p className="officeBearer__row2--contact">oxinakarna@yahoo.in</p>
                    </div>
                </div>

                <div className="officeBearer">
                    <div className="officeBearer__row1">
                        <img src={officeBearer7} alt="T Kumar" className="officeBearer__img" />
                    </div>
                    <div className="officeBearer__row2">
                        <h1 className="officeBearer__row2--name">T Kumar</h1>
                        <p className="officeBearer__row2--designation">Jt Secretary</p>
                        <p className="officeBearer__row2--contact">majestic.cc@gmail.com</p>
                    </div>
                </div>

                <div className="officeBearer">
                    <div className="officeBearer__row1">
                        <img src={officeBearer8} alt="V Boobeshnathan" className="officeBearer__img" />
                    </div>
                    <div className="officeBearer__row2">
                        <h1 className="officeBearer__row2--name">V Boobeshnathan</h1>
                        <p className="officeBearer__row2--designation">Jt Secretary</p>
                        <p className="officeBearer__row2--contact">boobeshnathan1981@gmail.com</p>
                    </div>
                </div>

                <div className="officeBearer">
                    <div className="officeBearer__row1">
                        <img src={officeBearer9} alt="M Sakthivel" className="officeBearer__img" />
                    </div>
                    <div className="officeBearer__row2">
                        <h1 className="officeBearer__row2--name">M Sakthivel</h1>
                        <p className="officeBearer__row2--designation">Treasurer</p>
                        <p className="officeBearer__row2--contact">sakthivelmurugan0479@gmail.com</p>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default LandingOfficeBearers;
