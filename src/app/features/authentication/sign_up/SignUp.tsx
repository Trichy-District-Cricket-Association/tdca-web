import { useHistory } from 'react-router-dom';
import './SignUp.scss';
import useInput from '../../../../hooks/useInput';
import { auth, firestore } from '../../../../firebase';
import InputBox from '../../../role_content/admin_panel/shared_components/input_box/InputBox';
import { PageRoutes } from '../../../../enums/pageRoutes';
import { Link } from 'react-router-dom';
import LoadingComp from '../../../shared_components/loading_comp/LoadingComp';
import { useEffect, useState } from 'react';
import Team from '../../../../models/Team';
import { Collections } from '../../../../enums/collection';
import SelectInputBox from '../../../role_content/admin_panel/shared_components/select_input_box/SelectInputBox';
import User from '../../../../models/User';
import { UserRoles } from '../../../../enums/auth';
const logo = `${process.env.PUBLIC_URL}/assets/images/logo.jpg`;

const SignUp = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [teamDocs, setTeamDocs] = useState<Team[] | undefined>();
    const [email, bindEmail] = useInput('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [password, bindPassword] = useInput('');
    const history = useHistory();

    const signUp = async () => {
        setIsLoading(true);
        await auth
            .createUserWithEmailAndPassword(selectedEmail, password)
            .then(async (userCredential) => {
                // send verification mail.
                userCredential?.user?.sendEmailVerification();
                const userTeam = teamDocs?.find((team) => team.emailId == selectedEmail);
                await firestore
                    .collection(Collections.users)
                    .doc(auth.currentUser?.uid)
                    .set(
                        JSON.parse(
                            JSON.stringify(
                                new User({
                                    email: userTeam?.emailId,
                                    id: userTeam?.teamId,
                                    role: UserRoles.team,
                                    name: userTeam?.teamName,
                                }),
                            ),
                        ),
                    )
                    .catch((e) => {
                        console.log(e);
                    });
                auth.signOut().then(() => {
                    window.location.reload();
                });
                alert('Verification Email Sent.');
                history.push(PageRoutes.login);
            })
            .catch(() => {
                alert('Invalid Email or Password');
            });
    };

    useEffect(() => {
        const unsub = firestore.collection(Collections.teams).onSnapshot((snapshot) => {
            if (snapshot.docs?.length === 0) setTeamDocs([]);
            if (snapshot.docs?.length > 0) {
                const teams = snapshot.docs.map((doc) => Team.fromFirestore(doc));
                setTeamDocs(teams);
            }
        });
        return () => {
            unsub();
        };
    }, []);
    const teamNames: any = teamDocs?.map((teamName) => teamName.teamName);

    const handleSelectForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const fieldName = `${e.target.name}` as const;
        if (fieldName == 'teamName') {
            const teamEmail = teamDocs?.find((team) => team.teamName == e.target.value)?.emailId;
            setSelectedEmail(teamEmail ?? '');
        }
    };
    return (
        <div className="signUp">
            {isLoading || teamDocs == undefined ? (
                <LoadingComp />
            ) : (
                <div className="signUp__container">
                    <img src={logo} alt="TDCA" className="signUp__container--img" />
                    <div className="signUp__container--form">
                        <SelectInputBox
                            title="Team Name"
                            name="teamName"
                            options={teamNames}
                            textHandler={handleSelectForm}
                        />
                        <InputBox
                            title="Email"
                            name="emailId"
                            type="text"
                            readOnly={true}
                            value={selectedEmail}
                            textHandler={bindEmail}
                        />
                        <InputBox title="Password" name="password" type="password" textHandler={bindPassword} />
                        <button onClick={signUp} className="signUp__btn">
                            Sign up
                        </button>
                        <Link to={PageRoutes.login} className="signUp__login">
                            Login here!
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUp;
