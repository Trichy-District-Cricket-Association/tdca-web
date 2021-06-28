import { SidebarData } from './SideNavBarData';
import { Link } from 'react-router-dom';
import './SideNavBar.scss';

const SideNavBar = (props:any) => (
    <div>
        <div className={props.sidebar ? 'nav-menu active' : 'nav-menu'}>
            <div className="container">
                <div onClick={props.showSidebar}>
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
