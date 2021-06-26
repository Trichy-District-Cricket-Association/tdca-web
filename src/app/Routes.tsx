import { Route } from 'react-router-dom';
import LandingPage from './features/landing_page/LandingPage';
import AdminPanel from './role_content/admin_panel/AdminPanel';
import {PageRoutes} from '../enums/pageRoutes';
import ProtectedRoute from './ProtectedRoute';
import { UserRoles } from '../enums/auth';

const Routes = () => (
    <div>
        {/* Main Routes */}
        <Route exact path={PageRoutes.home} component={LandingPage} />
        <Route exact path={PageRoutes.teams} component={LandingPage} />
        <Route exact path={PageRoutes.staffs}  component={LandingPage} />
        <Route exact path={PageRoutes.contact}  component={LandingPage} />

        {/* Admin Panel Route */}
        <ProtectedRoute exact path={PageRoutes.adminPanel} userRole={UserRoles.admin} component={AdminPanel} />
        <ProtectedRoute exact path={PageRoutes.adminScorers} userRole={UserRoles.admin} component={AdminPanel} />
        <ProtectedRoute exact path={PageRoutes.adminUmpires} userRole={UserRoles.admin} component={AdminPanel} />
        <ProtectedRoute exact path={PageRoutes.adminGrounds} userRole={UserRoles.admin} component={AdminPanel} />
        <ProtectedRoute exact path={PageRoutes.adminGroundsMen} userRole={UserRoles.admin} component={AdminPanel} />
        <ProtectedRoute exact path={PageRoutes.adminTeams} userRole={UserRoles.admin} component={AdminPanel} />
        <ProtectedRoute exact path={PageRoutes.adminTeams} userRole={UserRoles.admin} component={AdminPanel} />
        <ProtectedRoute exact path={PageRoutes.adminMatches} userRole={UserRoles.admin} component={AdminPanel} />
        <ProtectedRoute exact path={PageRoutes.adminScorecards} userRole={UserRoles.admin} component={AdminPanel} />
    </div>
);

export default Routes;
