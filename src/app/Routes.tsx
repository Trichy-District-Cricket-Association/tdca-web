import { Route } from 'react-router-dom';
import LandingPage from './features/landing_page/LandingPage';
import AdminPanel from './role_content/admin_panel/AdminPanel';

const Routes = () => (
    <div>
        {/* Main Pages */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/matches" component={LandingPage} />
        <Route exact path="/teams" component={LandingPage} />
        <Route exact path="/staffs" component={LandingPage} />
        <Route exact path="/contact" component={LandingPage} />

        {/* Admin Panel Pages */}
        <Route exact path="/admin" component={AdminPanel} />

        <Route exact path="/admin/scorers" component={AdminPanel} />
        <Route exact path="/admin/scorers/add" component={AdminPanel} />

        <Route exact path="/admin/umpires" component={AdminPanel} />
        <Route exact path="/admin/umpires/add" component={AdminPanel} />

        <Route exact path="/admin/grounds" component={AdminPanel} />
        <Route exact path="/admin/grounds/add" component={AdminPanel} />

        <Route exact path="/admin/groundsmen" component={AdminPanel} />
        <Route exact path="/admin/groundsmen/add" component={AdminPanel} />

        <Route exact path="/admin/teams" component={AdminPanel} />
        <Route exact path="/admin/teams/add" component={AdminPanel} />

        <Route exact path="/admin/players" component={AdminPanel} />
        <Route exact path="/admin/players/add" component={AdminPanel} />

        <Route exact path="/admin/matches" component={AdminPanel} />
        <Route exact path="/admin/matches/add" component={AdminPanel} />

        <Route exact path="/admin/scorecards" component={AdminPanel} />
        <Route exact path="/admin/scorecards/add" component={AdminPanel} />
    </div>
);

export default Routes;
