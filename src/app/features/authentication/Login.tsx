import Modal from 'react-modal';
import Input from '../../shared_components/input/Input';
import Button from '../../shared_components/button/Button';
import './Login.scss';
import useInput from '../../../hooks/useInput';
import { auth } from '../../../firebase';
export default function Login(props: any) {
    const logo = `${process.env.PUBLIC_URL}/assets/images/c7.jpg`;
    const [email, bindEmail] = useInput('');
    const [password, bindPassword] = useInput('');
    const login = async () => {
        await auth.signInWithEmailAndPassword(email, password).then(() => {
            props.setModalOpen(false);
        });
    };
    return (
        <div className="Login">
            <Modal
                isOpen={props.isOpen}
                onRequestClose={() => props.setModalOpen(false)}
                className="Login__modal"
                overlayClassName="Login__overlay"
                ariaHideApp={false}
            >
                <div className="Login__container">
                    <div className="Login__modal--imgDiv">
                        <img src={logo} alt="" />
                    </div>
                    <div className="Login__modal--form">
                        <Input
                            title="Email"
                            icon="fa fa-envelope"
                            placeholder="Email"
                            name="email"
                            onChange={bindEmail}
                        />
                        <Input
                            title="Password"
                            icon="fa fa-lock"
                            name="Password"
                            type="password"
                            onChange={bindPassword}
                        />
                        <Button title="Login" onClick={login} />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
