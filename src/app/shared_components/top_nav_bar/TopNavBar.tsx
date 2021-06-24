import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { auth } from '../../../firebase';
import useAuth from '../../../hooks/useAuth';
import './TopNavBar.scss';

const logo = `${process.env.PUBLIC_URL}/assets/images/tdca_logo.jpg`;
const TopNav = () => {
    const authData = useAuth();
    const [isMobileOpen, toggleMobileOpen] = useState(false);
    return (
        <div className="nav">
            <div className="nav__header">
                <div>
                    <img src={logo} alt="Logo" className="nav__header--logo" />
                </div>
                <div>
                    <h1 className="nav__header--text">TDCA</h1>
                    <h1 className="nav__header--textAbbr">TDCA</h1>
                </div>
            </div>
            <div>
                <button type="button" className="hamburger" onClick={() => toggleMobileOpen(!isMobileOpen)}>
                    {isMobileOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            <div className={isMobileOpen ? 'nav__responsive' : 'nav__body'}>
                <div className="item">
                    <Link to="/" className="nav__link">
                        Home
                    </Link>
                </div>
                <div className="item">
                    <Link to="/" className="nav__link">
                        Matches
                    </Link>
                </div>
                <div className="item">
                    <Link to="/" className="nav__link">
                        Teams
                    </Link>
                </div>
                <div className="item">
                    <Link to="/" className="nav__link">
                        Staffs
                    </Link>
                </div>
                <div className="item">
                    <Link to="/" className="nav__link">
                        Contact
                    </Link>
                </div>

                {authData === undefined ? (
                    <div>
                        <Link
                            to="/"
                            className="nav__btn"
                            onClick={ () => null}
                        >
                            Log In
                        </Link>
                    </div>
                ) : (
                    <div>
                        <Link
                            to="/"
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
    );
};

export default TopNav;
