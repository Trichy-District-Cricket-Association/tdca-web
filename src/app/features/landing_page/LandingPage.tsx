import LandingHeader from './landing_header/LandingHeader';
import './LandingPage.scss';
import LandingMatches from './landing_matches/LandingMatches';
import LandingAboutUs from './landing_aboutUs/LandingAboutUs';
const LandingPage: React.FC<void> = (): JSX.Element => {
    return (
        <div className="landingPage">
            <LandingHeader />
            <LandingMatches />
            {/* <LandingAboutUs /> */}
        </div>
    );
};

export default LandingPage;
