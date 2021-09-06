import { AuthProvider } from '../contexts/AuthContext';
import ForgetPassword from './features/authentication/forget_password/ForgetPassword';
import Routes from './Routes';
import TopNavBar from './shared_components/top_nav_bar/TopNavBar';

function App() {
    return (
        <AuthProvider>
            <div>
                <TopNavBar />
                <Routes />
                {/* <ForgetPassword /> */}
            </div>
        </AuthProvider>
    );
}

export default App;
