import LandingHeader from './landing_header/LandingHeader';
import './LandingPage.scss';
import LandingMatches from './landing_matches/LandingMatches';
const LandingPage: React.FC<void> = (): JSX.Element => {
    return (
        <div className="landingPage">
            <LandingHeader />
            <LandingMatches />
            <div className="aboutUs"></div>
        </div>
    );
};

export default LandingPage;
