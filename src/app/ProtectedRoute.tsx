import { Redirect, Route, RouteProps } from 'react-router';
import { PageRoutes } from '../enums/pageRoutes';
import useAuth from '../hooks/useAuth';

export type ProtectedRouteProps={
    userRole:string;
}&RouteProps;

export default function ProtectedRoute({userRole, ...routeProps}:ProtectedRouteProps) {
    const authData = useAuth();
  if(authData?.role==userRole) {
    return <Route {...routeProps} />;
  } else {
    console.log('redirecting to main');
    return <Redirect to={{ pathname: PageRoutes.home }} />;
  }
};