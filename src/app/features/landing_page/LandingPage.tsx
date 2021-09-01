import LandingHeader from './landing_header/LandingHeader';
import './LandingPage.scss';
import LandingMatches from './landing_matches/LandingMatches';
import LandingOfficeBearers from './landing_office_bearers/LandingOfficeBearers';
import LandingFooter from './landing_footer/LandingFooter';
const LandingPage: React.FC<void> = (): JSX.Element => {
    return (
        <div className="landingPage">
            <LandingHeader />

            <LandingMatches />

            <LandingOfficeBearers />
            <LandingFooter />
        </div>
    );
};

export default LandingPage;
