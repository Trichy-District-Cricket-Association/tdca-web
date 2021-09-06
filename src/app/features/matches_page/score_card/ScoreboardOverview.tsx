import { useEffect, useState } from 'react';
import Match from '../../../../models/Match';
import Modal from 'react-modal';
import './ScoreboardOverview.scss';
import { firestore } from '../../../../firebase';
import { Collections } from '../../../../enums/collection';
import LoadingComp from '../../../shared_components/loading_comp/LoadingComp';
import Player from '../../../../models/Player';
import { MdClose } from 'react-icons/md';
const defaultTeamAvatar = `${process.env.PUBLIC_URL}/assets/images/teamAvatar.png`;
type ScoreboardProps = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    matchDoc: Match;
};
const ScoreboardOverview = ({ setModalOpen, matchDoc }: ScoreboardProps): JSX.Element => {
    const [scorecard, setScorecard] = useState<any>([]);
    const [teamaPlayerDocs, setTeamaPlayerDocs] = useState<Player[] | undefined>();
    const [teambPlayerDocs, setTeambPlayerDocs] = useState<Player[] | undefined>();
    const [innings1Players, setInnings1Players] = useState<Player[] | undefined>();
    const [innings1, setInnings1] = useState<string>();
    const [innings2, setInnings2] = useState<string>();
    const [innings2Players, setInnings2Players] = useState<Player[] | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchTeamPlayers = async () => {
        const teamA = firestore.collection(Collections.players).where('teamName', '==', matchDoc.teamA?.teamName);
        teamA
            .get()
            .then((snapshot) => {
                if (snapshot.docs?.length === 0) setTeamaPlayerDocs([]);
                if (snapshot.docs?.length > 0) {
                    const players = snapshot.docs.map((doc) => Player.fromFirestore(doc));
                    setTeamaPlayerDocs(players);
                }
            })
            .then(() => {
                const teamB = firestore
                    .collection(Collections.players)
                    .where('teamName', '==', matchDoc.teamB?.teamName);
                teamB.get().then((snapshot) => {
                    if (snapshot.docs?.length === 0) setTeambPlayerDocs([]);
                    if (snapshot.docs?.length > 0) {
                        const players = snapshot.docs.map((doc) => Player.fromFirestore(doc));
                        setTeambPlayerDocs(players);
                    }
                    setIsLoading(false);
                });
            });
    };
    useEffect(() => {
        setIsLoading(true);
        const unsub = firestore
            .collection(Collections.scorecard)
            .doc(matchDoc.matchId)
            .onSnapshot((snapshot) => {
                const dummyScorecard: Array<any> = [];
                dummyScorecard.push(snapshot.data());
                const scorecard = {
                    ...dummyScorecard[0],
                };
                setScorecard(scorecard);
            });
        fetchTeamPlayers();
        return () => unsub();
    }, []);

    useEffect(() => {
        if (
            (scorecard.toss == matchDoc.teamA?.teamName && scorecard.optTo == 'bat') ||
            (scorecard.toss == matchDoc.teamB?.teamName && scorecard.optTo == 'bowl')
        ) {
            setInnings1Players(teamaPlayerDocs);
            setInnings1(matchDoc.teamA?.teamName);
            setInnings2Players(teambPlayerDocs);
            setInnings2(matchDoc.teamB?.teamName);
        } else {
            setInnings1Players(teambPlayerDocs);
            setInnings1(matchDoc.teamB?.teamName);
            setInnings2Players(teamaPlayerDocs);
            setInnings2(matchDoc.teamA?.teamName);
        }
    }, [teamaPlayerDocs, teambPlayerDocs, innings1, innings2]);

    const in1batsmen = [];
    const in1bowlers = [];
    const in2batsmen = [];
    const in2bowlers = [];

    let innings1Data: any;
    let innings2Data: any;
    let firstInningsOversBowled: any;
    let secondInningsOversBowled: any;
    let innings1LastOver: any;
    let innings2LastOver: any;

    const innings1Batsmen: any = {};
    const innings1Bowlers: any = {};
    const innings2Batsmen: any = {};
    const innings2Bowlers: any = {};

    let team1Bowlers;

    let team2Bowlers: string | any[];

    if (scorecard && scorecard.length === 0) {
        console.log('wait');
    } else {
        if (scorecard.innings1) {
            firstInningsOversBowled = Object.keys(scorecard.innings1.ballByBallRuns).length;
            innings1Data = scorecard.innings1.ballByBallRuns;
            innings1LastOver = innings1Data[firstInningsOversBowled];
        }
        if (scorecard.innings2) {
            secondInningsOversBowled = Object.keys(scorecard.innings2.ballByBallRuns).length;
            innings2Data = scorecard.innings2.ballByBallRuns;
            innings2LastOver = innings2Data[secondInningsOversBowled];
        }

        team1Bowlers = scorecard.team1Bowlers;
        team2Bowlers = scorecard.team2Bowlers;
        if (innings1Data) {
            for (let i = 1; i <= firstInningsOversBowled; i++) {
                in1batsmen.push(innings1Data[i].batsman1.name);
                in1batsmen.push(innings1Data[i].batsman2.name);
                in1bowlers.push(innings1Data[i].bowler.name);
                in1batsmen.map((batsman) => {
                    if (innings1Data[i].batsman1.name == batsman) {
                        innings1Batsmen[`${batsman}`] = [
                            innings1Data[i].batsman1.run,
                            innings1Data[i].batsman1.balls,
                            innings1Data[i].batsman1.four,
                            innings1Data[i].batsman1.six,
                        ];
                    }
                    if (innings1Data[i].batsman2.name == batsman) {
                        innings1Batsmen[`${batsman}`] = [
                            innings1Data[i].batsman2.run,
                            innings1Data[i].batsman2.balls,
                            innings1Data[i].batsman2.four,
                            innings1Data[i].batsman2.six,
                        ];
                    }
                });
                in1bowlers.map((bowler) => {
                    if (innings1Data[i].bowler.name == bowler) {
                        innings1Bowlers[`${bowler}`] = [
                            innings1Data[i].bowler.name,
                            innings1Data[i].bowler.run,
                            innings1Data[i].bowler.balls,
                            innings1Data[i].extras,
                        ];
                    }
                });
            }
        }
        if (innings2Data) {
            for (let i = 1; i <= secondInningsOversBowled; i++) {
                in2batsmen.push(innings2Data[i].batsman1.name);
                in2batsmen.push(innings2Data[i].batsman2.name);
                in2bowlers.push(innings2Data[i].bowler.name);
                in2batsmen.map((batsman) => {
                    if (innings2Data[i].batsman1.name == batsman) {
                        innings2Batsmen[`${batsman}`] = [
                            innings2Data[i].batsman1.run,
                            innings2Data[i].batsman1.balls,
                            innings2Data[i].batsman1.four,
                            innings2Data[i].batsman1.six,
                        ];
                    }
                    if (innings2Data[i].batsman2.name == batsman) {
                        innings2Batsmen[`${batsman}`] = [
                            innings2Data[i].batsman2.run,
                            innings2Data[i].batsman2.balls,
                            innings2Data[i].batsman2.four,
                            innings2Data[i].batsman2.six,
                        ];
                    }
                });
                in2bowlers.map((bowler) => {
                    if (innings2Data[i].bowler.name == bowler) {
                        innings2Bowlers[`${bowler}`] = [
                            innings2Data[i].bowler.name,
                            innings2Data[i].bowler.run,
                            innings2Data[i].bowler.balls,
                            innings2Data[i].extras,
                        ];
                    }
                });
            }
        }
        if (team1Bowlers) {
            for (let i = 0; i < team1Bowlers.length; i++) {
                if (team1Bowlers[i].name == innings2Bowlers[`${team1Bowlers[i].name}`][0]) {
                    innings2Bowlers[`${team1Bowlers[i].name}`][4] = team1Bowlers[i].wicket;
                }
            }
        }
        if (team2Bowlers) {
            for (let i = 0; i < team2Bowlers.length; i++) {
                if (team2Bowlers[i].name == innings1Bowlers[`${team2Bowlers[i].name}`][0]) {
                    innings1Bowlers[`${team2Bowlers[i].name}`][4] = team2Bowlers[i].wicket;
                }
            }
        }
    }

    return (
        <Modal
            className="scoreboard"
            isOpen={true}
            onRequestClose={() => setModalOpen(false)}
            ariaHideApp={false}
            overlayClassName="Overlay"
        >
            <div className="scoreboard__modalClose" onClick={() => setModalOpen(false)}>
                <MdClose />
            </div>
            {isLoading ? (
                <LoadingComp />
            ) : (
                <div className="scoreboard__container">
                    {scorecard && scorecard.length === 0 ? (
                        <h2>No items here</h2>
                    ) : (
                        <div>
                            <div className="scoreboard__header">
                                <div className="scoreboard__header1">
                                    <div className="scoreboard__teamLogo">
                                        <img
                                            src={
                                                matchDoc.teamA?.teamLogo ? matchDoc.teamA?.teamLogo : defaultTeamAvatar
                                            }
                                            className="scoreboard__teamLogo--img"
                                        />
                                        <h2 className="scoreboard__teamLogo--vs">VS</h2>
                                        <img
                                            src={
                                                matchDoc.teamB?.teamLogo ? matchDoc.teamB?.teamLogo : defaultTeamAvatar
                                            }
                                            className="scoreboard__teamLogo--img"
                                        />
                                    </div>
                                    <div className="scoreboard__dummyStatus">
                                        <p>Toss: {scorecard.toss}</p>
                                        <p>Status: {matchDoc.status}</p>
                                        <p>Target: {scorecard.target}</p>
                                    </div>
                                </div>
                                <div className="scoreboard__status">
                                    <p>Toss: {scorecard.toss}</p>
                                    <p>Status: {matchDoc.status}</p>
                                    <p>Target: {scorecard.target}</p>
                                </div>
                                <div className="scoreboard__board">
                                    <div className="scoreboard__board__team">
                                        <p className="scoreboard__board__team--teamName">{innings1}</p>
                                        <p className="scoreboard__board__team--runsWickets">
                                            {scorecard.team1run}/{scorecard.team1wicket}
                                        </p>
                                        <p className="scoreboard__board__team--overs">Overs: {scorecard.team1overs}</p>
                                    </div>
                                    <div className="scoreboard__board__team">
                                        <p className="scoreboard__board__team--teamName">{innings2}</p>
                                        <p className="scoreboard__board__team--runsWickets">
                                            {scorecard.team2run}/{scorecard.team2wicket}
                                        </p>
                                        <p className="scoreboard__board__team--overs">Overs: {scorecard.team2overs}</p>
                                    </div>
                                </div>
                            </div>
                            {innings1Data && innings1Data.length === 0 ? (
                                <h1>Innings Yet to Start</h1>
                            ) : (
                                <div>
                                    <h1>INNINGS 1</h1>
                                    <table>
                                        <caption>{innings1}</caption>

                                        <thead>
                                            <tr>
                                                <th scope="col">Batter</th>
                                                <th scope="col">Runs</th>
                                                <th scope="col">Balls</th>
                                                <th scope="col">4s</th>
                                                <th scope="col">6s</th>
                                                <th scope="col">SR</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(innings1Batsmen)?.map((batsman) => (
                                                <tr key={batsman}>
                                                    <td data-label="Batter">{batsman}</td>
                                                    <td data-label="Runs">{innings1Batsmen[batsman][0]}</td>
                                                    <td data-label="Balls">{innings1Batsmen[batsman][1]}</td>
                                                    <td data-label="4s">{innings1Batsmen[batsman][2]}</td>
                                                    <td data-label="6s">{innings1Batsmen[batsman][3]}</td>
                                                    <td data-label="SR">
                                                        {(
                                                            (innings1Batsmen[batsman][0] /
                                                                innings1Batsmen[batsman][1]) *
                                                            100
                                                        ).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <th>Total Runs</th>
                                                <td>{scorecard.team1run}</td>
                                            </tr>
                                            <tr>
                                                <th>Extras</th>
                                                <td>{scorecard.team1extra}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {innings1LastOver ? (
                                        <p>
                                            Last Over: &ensp; {innings1LastOver.runs[0]} &ensp;
                                            {innings1LastOver.runs[1]}&ensp;
                                            {innings1LastOver.runs[2]}&ensp;
                                            {innings1LastOver.runs[3]}&ensp;
                                            {innings1LastOver.runs[4]}&ensp;
                                            {innings1LastOver.runs[5]}
                                        </p>
                                    ) : null}

                                    <table>
                                        <caption>{innings2}</caption>
                                        <thead>
                                            <tr>
                                                <th scope="col">Bowler</th>
                                                <th scope="col">Wickets</th>
                                                <th scope="col">Runs</th>
                                                <th scope="col">Overs</th>
                                                <th scope="col">Extras</th>
                                                <th scope="col">Economy</th>
                                            </tr>
                                        </thead>
                                        {Object.keys(innings1Bowlers)?.map((bowler) => (
                                            <tbody key={bowler}>
                                                <tr>
                                                    <td data-label="Bowler">{bowler}</td>
                                                    <td data-label="Wickets">{innings1Bowlers[bowler][4]}</td>
                                                    <td data-label="Runs">{innings1Bowlers[bowler][1]}</td>
                                                    <td data-label="Overs">{innings1Bowlers[bowler][2]}</td>
                                                    <td data-label="Extras">{innings1Bowlers[bowler][3]}</td>
                                                    <td data-label="Economy">
                                                        {(
                                                            innings1Bowlers[bowler][1] / innings1Bowlers[bowler][2]
                                                        ).toFixed(2)}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            )}
                            {innings2Data && innings2Data.length === 0 ? (
                                <h1>Innings Yet to Start</h1>
                            ) : (
                                <div>
                                    <h1>INNINGS 2</h1>
                                    <table>
                                        <caption>{innings2}</caption>
                                        <thead>
                                            <tr>
                                                <th scope="col">Batter</th>
                                                <th scope="col">Runs</th>
                                                <th scope="col">Balls</th>
                                                <th scope="col">4s</th>
                                                <th scope="col">6s</th>
                                                <th scope="col">SR</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(innings2Batsmen)?.map((batsman) => (
                                                <tr key={batsman}>
                                                    <td data-label="Batter">{batsman}</td>
                                                    <td data-label="Runs">{innings2Batsmen[batsman][0]}</td>
                                                    <td data-label="Balls">{innings2Batsmen[batsman][1]}</td>
                                                    <td data-label="4s">{innings2Batsmen[batsman][2]}</td>
                                                    <td data-label="6s">{innings2Batsmen[batsman][3]}</td>
                                                    <td data-label="SR">
                                                        {(
                                                            (innings2Batsmen[batsman][0] /
                                                                innings2Batsmen[batsman][1]) *
                                                            100
                                                        ).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <th>Total Runs</th>
                                                <td>{scorecard.team2run}</td>
                                            </tr>
                                            <tr>
                                                <th>Extras</th>
                                                <td>{scorecard.team2extra}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {innings2LastOver ? (
                                        <p>
                                            Last Over: &ensp; {innings2LastOver.runs[0]} &ensp;
                                            {innings2LastOver.runs[1]}&ensp;
                                            {innings2LastOver.runs[2]}&ensp;
                                            {innings2LastOver.runs[3]}&ensp;
                                            {innings2LastOver.runs[4]}&ensp;
                                            {innings2LastOver.runs[5]}
                                        </p>
                                    ) : null}

                                    <table>
                                        <caption>{innings1}</caption>
                                        <thead>
                                            <tr>
                                                <th scope="col">Bowler</th>
                                                <th scope="col">Wickets</th>
                                                <th scope="col">Runs</th>
                                                <th scope="col">Overs</th>
                                                <th scope="col">Extras</th>
                                                <th scope="col">Economy</th>
                                            </tr>
                                        </thead>
                                        {Object.keys(innings2Bowlers)?.map((bowler) => (
                                            <tbody key={bowler}>
                                                <tr>
                                                    <td data-label="Bowler">{bowler}</td>
                                                    <td data-label="Wickets">{innings2Bowlers[bowler][4]}</td>
                                                    <td data-label="Runs">{innings2Bowlers[bowler][1]}</td>
                                                    <td data-label="Overs">{innings2Bowlers[bowler][2]}</td>
                                                    <td data-label="Extras">{innings2Bowlers[bowler][3]}</td>
                                                    <td data-label="Economy">
                                                        {(
                                                            innings2Bowlers[bowler][1] / innings2Bowlers[bowler][2]
                                                        ).toFixed(2)}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </Modal>
    );
};
export default ScoreboardOverview;
