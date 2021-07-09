import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UserRoles } from '../../../enums/auth';
import { PageRoutes } from '../../../enums/pageRoutes';
import { auth } from '../../../firebase';
import useAuth from '../../../hooks/useAuth';
import Login from '../../features/authentication/Login';
import './TopNavBar.scss';
import SideNavBar from '../../role_content/admin_panel/shared_components/side_navbar/SideNavBar';
import { BsGear } from 'react-icons/bs';
import { MdPerson } from 'react-icons/md';

const logo = `${process.env.PUBLIC_URL}/assets/images/tdca_logo.jpg`;
const TopNav = (): JSX.Element => {
    const authData = useAuth();
    const [isMobileOpen, toggleMobileOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const loginClick = () => setModalOpen(true);
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
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
                        <img src={logo} alt="Logo" className="nav__header--logo" />
                    </div>
                    <div>
                        <h1 className="nav__header--text">Trichy District Cricket Association</h1>
                        <h1 className="nav__header--textAbbr">TDCA</h1>
                    </div>
                </div>
                <div>
                    <button type="button" className="hamburger" onClick={() => toggleMobileOpen(!isMobileOpen)}>
                        {isMobileOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                <div className={isMobileOpen ? 'nav__responsive' : 'nav__body'}>
                    <div>
                        <Link to={PageRoutes.home} className="nav__link">
                            Home
                        </Link>
                    </div>
                    <div className="item">
                        <Link to={PageRoutes.matches} className="nav__link">
                            Matches
                        </Link>
                    </div>
                    <div className="item">
                        <Link to={PageRoutes.teams} className="nav__link">
                            Teams
                        </Link>
                    </div>
                    <div className="item">
                        <Link to={PageRoutes.staffs} className="nav__link">
                            Staffs
                        </Link>
                    </div>
                    <div className="item">
                        <Link to={PageRoutes.contact} className="nav__link">
                            Contact
                        </Link>
                    </div>

                    {authData === undefined ? null : authData === null ? (
                        <div>
                            <Link to={PageRoutes.home} className="nav__btn" onClick={loginClick}>
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
                                }}
                            >
                                Log Out
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {isModalOpen ? <Login setModalOpen={setModalOpen} /> : null}
        </div>
    );
};

export default TopNav;
