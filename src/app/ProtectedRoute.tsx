import { Redirect, Route, RouteProps } from 'react-router';
import { PageRoutes } from '../enums/pageRoutes';
import useAuth from '../hooks/useAuth';
import LoadingComp from './shared_components/loading_comp/LoadingComp';

export type ProtectedRouteProps = {
    userRole: string;
} & RouteProps;

export default function ProtectedRoute({ userRole, ...routeProps }: ProtectedRouteProps) {
    const authData = useAuth();
    if (authData === null) {
        console.log('You are not authenticated, redirecting to landing page!');
        return <Redirect to={{ pathname: PageRoutes.home }} />;
    } else if (authData?.role == userRole) {
        return <Route {...routeProps} />;
    }
    return <Route {...routeProps} component={LoadingComp} />;
}
