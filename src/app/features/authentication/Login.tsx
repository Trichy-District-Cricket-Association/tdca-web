import { useHistory } from 'react-router-dom';
import './Login.scss';
import useInput from '../../../hooks/useInput';
import { auth } from '../../../firebase';
import InputBox from '../../role_content/admin_panel/shared_components/input_box/InputBox';
import { PageRoutes } from '../../../enums/pageRoutes';
import { Link } from 'react-router-dom';
import LoadingComp from '../../shared_components/loading_comp/LoadingComp';
import { useState } from 'react';
const logo = `${process.env.PUBLIC_URL}/assets/images/logo.jpg`;

const Login = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, bindEmail] = useInput('');
    const [password, bindPassword] = useInput('');
    const history = useHistory();
    const login = async () => {
        setIsLoading(true);
        await auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                history.push('/');
            })
            .then(() => setIsLoading(false))
            .catch(() => {
                alert('Invalid Email or Password');
            });
    };
    return (
        <div className="Login">
            {isLoading ? (
                <LoadingComp />
            ) : (
                <div className="Login__container">
                    <img src={logo} alt="TDCA" className="Login__container--img" />
                    <div className="Login__container--form">
                        <InputBox title="Email" name="emailId" type="text" textHandler={bindEmail} />
                        <InputBox title="Password" name="password" type="password" textHandler={bindPassword} />
                        <button onClick={login} className="Login__btn">
                            Login
                        </button>
                        <Link to={PageRoutes.forgetPassword} className="Login__forgetPass">
                            Forget Password?
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
