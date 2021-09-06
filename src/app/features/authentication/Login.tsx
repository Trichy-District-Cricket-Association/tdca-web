import Modal from 'react-modal';
import './Login.scss';
import useInput from '../../../hooks/useInput';
import { auth } from '../../../firebase';
import InputBox from '../../role_content/admin_panel/shared_components/input_box/InputBox';
import { PageRoutes } from '../../../enums/pageRoutes';
import { Link } from 'react-router-dom';
const logo = `${process.env.PUBLIC_URL}/assets/images/logo.jpg`;

type LoginProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login: React.FC<LoginProps> = ({ setModalOpen }): JSX.Element => {
    const [email, bindEmail] = useInput('');
    const [password, bindPassword] = useInput('');

    const login = async () => {
        await auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                setModalOpen(false);
            })
            .catch(() => {
                alert('Invalid Email or Password');
            });
    };
    return (
        <div className="Login">
            <Modal
                isOpen={true}
                onRequestClose={() => setModalOpen(false)}
                className="Login__modal"
                overlayClassName="Login__overlay"
                ariaHideApp={false}
            >
                <div className="Login__container">
                    <img src={logo} alt="TDCA" className="Login__modal--img" />
                    <div className="Login__modal--form">
                        <InputBox title="Email" name="emailId" type="text" textHandler={bindEmail} />
                        <InputBox title="Password" name="password" type="password" textHandler={bindPassword} />
                        <button onClick={login} className="Login__btn">
                            Login
                        </button>
                        <Link
                            to={PageRoutes.forgetPassword}
                            className="Login__forgetPass"
                            onClick={() => setModalOpen(false)}
                        >
                            Forget Password?
                        </Link>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Login;
