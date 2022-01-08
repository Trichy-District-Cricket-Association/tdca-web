import { useState } from 'react';
import { auth } from '../../../../firebase';
import './ForgetPassword.scss';
import { PageRoutes } from '../../../../enums/pageRoutes';

const logo = `${process.env.PUBLIC_URL}/assets/images/logo.jpg`;
const ForgetPassword: React.FC<any> = (): JSX.Element => {
    const [email, setEmail] = useState('');

    const handlePasswordReset = async (email: string) => {
        await auth
            .sendPasswordResetEmail(email)
            .then(() => {
                window.alert('Password reset link sent!');
            })
            .catch((err) => {
                console.error(err);
                window.alert(err.message);
            });
    };

    return (
        <div className="forgetPass">
            <div className="container">
                <form className="container__form">
                    <img src={logo} className="container__form--logo" alt="logo" />
                    <h4>Just provide your email</h4>
                    <div className="container__form__formGroup">
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>
                            <br />
                            Email
                        </label>
                        <span>enter your email</span>
                    </div>

                    <button className="container__form--loginBtn" onClick={() => handlePasswordReset(email)}>
                        Next
                    </button>
                </form>
                {/* 
                <p>
                    Did you remember? <a href="">Sign In</a>
                </p> */}
            </div>
        </div>
    );
};

export default ForgetPassword;
