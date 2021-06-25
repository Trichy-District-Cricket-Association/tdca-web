import Modal from 'react-modal';
import Input from '../../shared_components/input/Input';
import Button from '../../shared_components/button/Button';
import './Login.scss';
import useInput from '../../../hooks/useInput';
export default function Login(props: any) {
    const logo = `${process.env.PUBLIC_URL}/assets/images/c7.jpg`;
    const { onChange: bindEmail } = useInput('');
    const { onChange: bindPassword } = useInput('');
    const login = () => {
        props.setModalOpen(false);
    };
    return (
        <div className="Login">
            <Modal
                isOpen={props.isOpen}
                onRequestClose={() => props.setModalOpen(false)}
                className="Login__modal"
                overlayClassName="Login__overlay"
            >
                <div className="Login__container">
                    <div className="Login__modal--imgDiv">
                        <img src={logo} alt="" />
                    </div>
                    <div className="Login__modal--form">
                        <Input title="Email" icon="fa fa-envelope" placeholder="Email" name="email" {...bindEmail} />
                        <Input title="Password" icon="fa fa-lock" name="password" type="password" {...bindPassword} />
                        <Button title="Login" onClick={login} />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
