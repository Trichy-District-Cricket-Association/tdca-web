import { useState } from 'react';
import { auth } from '../../../../firebase';
import './ForgetPassword.scss';

const logo = `${process.env.PUBLIC_URL}/assets/images/logo.jpg`;
const ForgetPassword: React.FC<any> = (): JSX.Element => {
    const [email, setEmail] = useState('');

    const handlePasswordReset = async (email: string) => {
        try {
            await auth.sendPasswordResetEmail(email);
            alert('Password reset link sent!');
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <div className="forgetPass">
            <div className="container">
                <form className="container__form" onSubmit={() => handlePasswordReset(email)}>
                    <img src={logo} className="container__form--logo" alt="logo" />
                    <h4>Just provide your email</h4>
                    <div className="container__form__formGroup">
                        <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>
                            <br />
                            Email
                        </label>
                        <span>enter your email</span>
                    </div>

                    <button className="container__form--loginBtn" type="submit" prevent-default>
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
