import { SidebarData } from './SideNavBarData';
import { Link } from 'react-router-dom';
import './SideNavBar.scss';

const SideNavBar = () => (
    <div>
        <div className="nav-menu active">
            <div className="container">
                <div className="nav-menu-items">
                    {SidebarData.map((item, index) => {
                        return (
                            <div key={index} className={item.cName}>
                                <Link to={item.path}>
                                    <div>
                                        <img src={item.icon} className="icons" />
                                    </div>
                                    <span>{item.title}</span>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
);

export default SideNavBar;
