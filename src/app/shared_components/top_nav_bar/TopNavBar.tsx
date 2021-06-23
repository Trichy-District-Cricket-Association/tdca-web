import { Link } from 'react-router-dom';
import { auth } from '../../../firebase';
import useAuth from '../../../hooks/useAuth';

const logo = `${process.env.PUBLIC_URL}/assets/images/tdca_logo.jpg`;

const TopNavBar = () => {
    const authData = useAuth();

    return (
        <div className="navBar">
            <div className="navBarContainer">
                <div className="navLogo">
                    <img src={logo} alt="Logo" />
                </div>
            </div>
        </div>
    );
};

export default TopNavBar;
