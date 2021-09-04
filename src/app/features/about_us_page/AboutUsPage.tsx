import './AboutUsPage.scss';

const logo = `${process.env.PUBLIC_URL}/assets/images/logo.jpg`;
const AboutUsPage: React.FC<void> = (): JSX.Element => {
    return (
        <div className="aboutUsPage">
            <div className="aboutUsPage__header">
                <div className="aboutUsPage__header__header1">
                    <h1 className="aboutUsPage__header__header1--text">About TDCA</h1>
                </div>
                <div className="aboutUsPage__header__header2"></div>
            </div>
            <div
                className="aboutUsPage__container"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.89), rgba(255, 255, 255, 0.89)),url(${logo})`,
                }}
            >
                <div className="aboutUsPage__container__header">
                    <h1 className="aboutUsPage__container__header--text">
                        THE TIRUCHIRAPALLI DISTRICT CRICKET ASSOCIATION
                    </h1>
                    <h2>(Affiliated to the TamilNadu Cricket Association)</h2>

                    <h3 className="aboutUsPage__container__header--quote">
                        IT IS FAR MORE THAN A GAME, THIS CRICKET- NEVILLE CARDUS
                    </h3>
                </div>
                <p className="aboutUsPage__container--content">
                    The Tiruchirappalli District Cricket Association (TDCA), affiliated to The Tamilnadu Cricket
                    Association (TNCA), is one of the earliest cricket administration bodies in Tamilnadu, formed in
                    1958. Apart from Trichy, we administered and fostered cricket in the present districts of
                    Pudukkottai, Karur, Perambalur, Ariyalur districts (all these were part of the erstwhile Trichy
                    district).
                    <br /> <br />
                    We have a robust cricketing calendar, conducting league matches, knock out tournaments, schools
                    league for various age groups, schools knockout tournaments for various age groups, every year. Our
                    league tournament consists of five divisions and we also have a very actively participated
                    qualifying knock out tournament for entry into the league table. We conduct on an average about 350
                    matches every year, apart from hosting the inter district tournaments of the TNCA in various
                    categories.
                    <br /> <br />
                    The conduct of so many matches every year is due to the availability sufficient cricket grounds. We
                    are blessed with this facility, thanks to the educational institutions and government owned
                    entities. National institute of Technology, Saranathan college of Engineering, JJ college of
                    engineering, National College, Ordnance Factory, RVS Institutions Southern Railway Institute, St.
                    Joseph’s college, Bishop Heber College, Indira Ganesan College of Engineering, Vignesh Vidyalaya,
                    Urumu Dhanalakshmi College, PABCET, BHEL, RKV grounds are some of the institutions that are helping
                    us in no mean measure by providing grounds for the matches.
                    <br /> <br />
                    TDCA is a forerunner in nurturing talent at a young age, by running a cricket academy (run on a
                    non-commercial basis) at Sowdambika AKKV School named TDCA Academy, with a team of qualified
                    coaches. We are proud to state that we are the first in moffusil districts to form an official
                    academy, next to the TNCA Academy at Chennai.
                    <br />
                    <br /> Trichy is also the only district which has a treasure of qualified umpires. We have 21
                    umpires in the TNCA panel and 50 qualified umpires in the TDCA panel as of 2021. No other district
                    in Tamilnadu, with the exception of Chennai city, has such a strong presence. Trichy also has the
                    unique record of producing four BCCI qualified umpires, a feat not matched by any district. Umpiring
                    classes for aspirants, including women, is a regular feature in our schedule of activities, Not to
                    be left behind in one other aspect of the game, we are actively involved in enriching our stock of
                    qualified Scorers. Regular classes are being held and this is also extended to women aspirants. We
                    have fifteen scorers of which four are official TNCA scorers as well. <br />
                    <br />
                    The increasing activity in women’s cricket all over the country, has prompted us to focus on
                    popularising and developing women’s cricket. We have drawn up an ambitious programme which will
                    witness a remarkable growth of the game among girls and women.
                    <br /> <br />
                    The great visionary and doyen of mofussil cricket in Tamilnadu late Sri Rathinavelu Thevar, inspires
                    and guides us in our quest to provide the youngsters of Trichy district, a platform for them to hone
                    their talent in all facets of the game. While much of progress has been witnessed, there is scope
                    for more and to that end we will strive tirelessly and relentlessly.
                    <br />
                    <br />
                </p>
                <div className="aboutUsPage__container__footer">
                    <h3 className="aboutUsPage__container__footer--quote">
                        RESOLVE TO PERFORM WHAT YOU OUGHT; PERFORM WITHOUT FAIL WHAT YOU RESOLVE. - BENJAMIN FRANKLIN
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
