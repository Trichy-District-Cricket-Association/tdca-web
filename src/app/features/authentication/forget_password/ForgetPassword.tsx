import './ForgetPassword.scss';

const logo = `${process.env.PUBLIC_URL}/assets/images/logo.jpg`;
const ForgetPassword: React.FC<any> = (): JSX.Element => {
    return (
        <div className="forgetPass">
            <div className="container">
                <form className="container__form">
                    <img src={logo} className="container__form--logo" alt="logo" />
                    <h4>Just provide your email</h4>
                    <div className="container__form__formGroup">
                        <input type="text" name="email" />
                        <label>
                            <br />
                            Email
                        </label>
                        <span>enter your email</span>
                    </div>

                    <button className="container__form--loginBtn">Next</button>
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
