import { AuthProvider } from '../contexts/AuthContext';
import Routes from './Routes';
import TopNavBar from './shared_components/top_nav_bar/TopNavBar';

function App() {
    return (
        <AuthProvider>
            <div>
                <TopNavBar />
                <Routes />
            </div>
        </AuthProvider>
    );
}

export default App;
