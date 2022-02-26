import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UserRoles } from '../../../enums/auth';
import { PageRoutes } from '../../../enums/pageRoutes';
import { auth, firestore } from '../../../firebase';
import useAuth from '../../../hooks/useAuth';
import Login from '../../features/authentication/Login';
import './TopNavBar.scss';
import SideNavBar from '../../role_content/admin_panel/shared_components/side_navbar/SideNavBar';
import { BsGear } from 'react-icons/bs';
import { MdPerson } from 'react-icons/md';
import Office from '../../../models/Office';
import { Collections } from '../../../enums/collection';

const logo = `${process.env.PUBLIC_URL}/assets/images/tdca_logo.jpg`;

const TopNav = (): JSX.Element => {
    const authData = useAuth();
    const [isMobileOpen, toggleMobileOpen] = useState(false);
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const [officeDocs, setOfficeDocs] = useState<Office[] | undefined>();
    useEffect(() => {
        const unsub = firestore.collection(Collections.office).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setOfficeDocs([]);
            if (snapshot.docs?.length > 0) {
                const office = snapshot.docs.map((doc) => Office.fromFirestore(doc));
                setOfficeDocs(office);
            }
        });
        return () => unsub();
    });
    return (
        <div>
            <div className="nav">
                <div className="nav__header">
                    {authData?.role == UserRoles.admin ? (
                        <div>
                            <button className="nav__menu-bars">
                                <BsGear onClick={showSidebar} />
                            </button>
                            <SideNavBar sidebar={sidebar} showSidebar={showSidebar} />
                        </div>
                    ) : authData?.role == UserRoles.team ? (
                        <div>
                            <Link to={PageRoutes.teamPanel} className="nav__menu-bars">
                                <MdPerson />
                            </Link>
                        </div>
                    ) : (
                        <div />
                    )}
                    <div>
                        <Link to={PageRoutes.home}>
                            <img src={logo} alt="Logo" className="nav__header--logo" />
                        </Link>
                    </div>
                    <div>
                        <Link to={PageRoutes.home} className="nav__headertxt">
                            <h1 className="nav__header--text">The Tiruchirappalli District Cricket Association</h1>
                            <h1 className="nav__header--textAbbr">TDCA</h1>
                        </Link>
                    </div>
                </div>
                <div>
                    <button type="button" className="hamburger" onClick={() => toggleMobileOpen(!isMobileOpen)}>
                        {isMobileOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                <div className={isMobileOpen ? 'nav__responsive' : 'nav__body'}>
                    <div>
                        <Link to={PageRoutes.home} className="nav__link" onClick={() => toggleMobileOpen(false)}>
                            Home
                        </Link>
                    </div>
                    <div className="item">
                        <Link to={PageRoutes.aboutUs} className="nav__link" onClick={() => toggleMobileOpen(false)}>
                            About Us
                        </Link>
                    </div>
                    <div className="item">
                        <Link to={PageRoutes.teams} className="nav__link" onClick={() => toggleMobileOpen(false)}>
                            Teams
                        </Link>
                    </div>
                    <div className="item">
                        <Link to={PageRoutes.matches} className="nav__link" onClick={() => toggleMobileOpen(false)}>
                            Matches
                        </Link>
                    </div>
                    <div className="dropdown">
                        <p className="dropbtn" onClick={() => toggleMobileOpen(false)}>
                            Governance
                        </p>

                        <div className="dropdown-content">
                            {officeDocs ? (
                                <div>
                                    {officeDocs[0]?.byLawsPdf ? (
                                        <a
                                            onClick={() => toggleMobileOpen(false)}
                                            className="link"
                                            href={officeDocs[0].byLawsPdf}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            By Laws
                                        </a>
                                    ) : null}
                                    {officeDocs[0]?.leagueRulesPdf ? (
                                        <a
                                            onClick={() => toggleMobileOpen(false)}
                                            className="link"
                                            href={officeDocs[0].leagueRulesPdf}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            League Ruels
                                        </a>
                                    ) : null}
                                    {officeDocs[0]?.knockoutRulesPdf ? (
                                        <a
                                            onClick={() => toggleMobileOpen(false)}
                                            className="link"
                                            href={officeDocs[0].knockoutRulesPdf}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Knockout Rules
                                        </a>
                                    ) : null}
                                    {officeDocs[0]?.accountsPdf ? (
                                        <a
                                            onClick={() => toggleMobileOpen(false)}
                                            className="link"
                                            href={officeDocs[0].accountsPdf}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Accounts
                                        </a>
                                    ) : null}
                                </div>
                            ) : null}

                            <Link to={PageRoutes.umpires} className="link" onClick={() => toggleMobileOpen(false)}>
                                Umpires
                            </Link>
                            <Link to={PageRoutes.scorers} className="link" onClick={() => toggleMobileOpen(false)}>
                                Scorers
                            </Link>
                        </div>
                    </div>
                    <div className="item">
                        <Link to={PageRoutes.activities} className="nav__link" onClick={() => toggleMobileOpen(false)}>
                            Activities
                        </Link>
                    </div>

                    {authData === undefined ? null : authData === null ? (
                        <div>
                            <Link to={PageRoutes.login} className="nav__btn">
                                Log In
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <Link
                                to={PageRoutes.home}
                                className="nav__btn"
                                onClick={async () => {
                                    await auth.signOut();
                                    toggleMobileOpen(false);
                                }}
                            >
                                Log Out
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopNav;
