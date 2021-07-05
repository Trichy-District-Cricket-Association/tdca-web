import { Route } from 'react-router-dom';
import LandingPage from './features/landing_page/LandingPage';
import AdminPanel from './role_content/admin_panel/AdminPanel';
import GroundsOverview from './role_content/admin_panel/features/grounds/grounds_overview/GroundsOverview';
import { PageRoutes } from '../enums/pageRoutes';
import ProtectedRoute from './ProtectedRoute';
import { UserRoles } from '../enums/auth';
import GroundAdd from './role_content/admin_panel/features/grounds/ground_add/GroundAdd';
import GroundsMenOverview from './role_content/admin_panel/features/groundsMen/groundsMen_overview/GroundsMenOverview';
import UmpiresOverview from './role_content/admin_panel/features/umpires/umpires_overview/UmpiresOverview';
import ScorersOverview from './role_content/admin_panel/features/scorers/scorers_overview/ScorersOverview';
import TeamsOverview from './role_content/admin_panel/features/teams/teams_overview/TeamsOverview';
import MatchesOverview from './role_content/admin_panel/features/matches/matches_overview/MatchesOverview';
import PlayersOverview from './role_content/admin_panel/features/players/players_overview/PlayersOverview';
import MatchesPage from './features/matches_page/MatchesPage';
import TeamsPage from './features/teams_page/TeamsPage';
import StaffsPage from './features/staffs_page/StaffsPage';

const Routes = () => (
    <div>
        {/* Main Routes */}
        <Route exact path={PageRoutes.home} component={LandingPage} />
        <Route exact path={PageRoutes.teams} component={TeamsPage} />
        <Route exact path={PageRoutes.staffs} component={StaffsPage} />
        <Route exact path={PageRoutes.contact} component={LandingPage} />
        <Route exact path={PageRoutes.matches} component={MatchesPage} />

        {/* Admin Panel Route */}
        <ProtectedRoute exact path={PageRoutes.adminPanel} userRole={UserRoles.admin} component={AdminPanel} />
        <ProtectedRoute exact path={PageRoutes.adminScorers} userRole={UserRoles.admin} component={ScorersOverview} />
        <ProtectedRoute exact path={PageRoutes.adminUmpires} userRole={UserRoles.admin} component={UmpiresOverview} />
        <ProtectedRoute exact path={PageRoutes.adminGrounds} userRole={UserRoles.admin} component={GroundsOverview} />
        <ProtectedRoute
            exact
            path={PageRoutes.adminGroundsMen}
            userRole={UserRoles.admin}
            component={GroundsMenOverview}
        />
        <ProtectedRoute exact path={PageRoutes.adminPlayers} userRole={UserRoles.admin} component={PlayersOverview} />
        <ProtectedRoute exact path={PageRoutes.adminTeams} userRole={UserRoles.admin} component={TeamsOverview} />
        <ProtectedRoute exact path={PageRoutes.adminMatches} userRole={UserRoles.admin} component={MatchesOverview} />
        <ProtectedRoute exact path={PageRoutes.adminScorecards} userRole={UserRoles.admin} component={AdminPanel} />
    </div>
);

export default Routes;
