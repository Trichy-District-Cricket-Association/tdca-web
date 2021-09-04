// import firebase from 'firebase';
//
export default class Scorecard {
    id: number;

    constructor(id: number) {
        this.id = id;
    }
}
//  export default class ScoreCard{
//     /** Document id of the Ground document. */
//     docId?: string;
//     ballByBallRuns: any;
//     extra: number;
//     innings1: {
//       ballByBallRuns: any;
//     };
//     innings2: {
//       ballByBallRuns: any;
//     };
//     optTo: string;
//     over: number;
//     run: number;
//     target: number;
//     team1: string;
//     team1Batsman: Array<IBatsman>;
//     team1Bowlers: Array<IBowler>;
//     team1extra: number;
//     team1overs: number;
//     team1run: number;
//     team1wicket: number;
//     team2: string;
//     team2Batsman: Array<IBatsman>;
//     team2Bowlers: Array<IBowler>;
//     team2extra: number;
//     team2overs: number;
//     team2run: number;
//     team2wicket: number;
//     toss: string;
//     wicket: number;
//
//     constructor({}:{}){}
//
//     static fromFirestore(doc: firebase.firestore.DocumentSnapshot): ScoreCard {
//         return new Ground({
//             docId: doc.id,
//             ballByBallRuns: doc.data().ballByBallRuns,
//             groundName: doc.data().groundName,
//             avatarUrl: doc.data()?.avatarUrl,
//             totalMatches: doc.data()?.totalMatches,
//             divisionMatches: doc.data()?.divisionMatches,
//             typeMatches: doc.data()?.typeMatches,
//         });
//     }
//   }
//
//   interface IBowler {
//     name: string;
//     over: string;
//     totRuns: number;
//     wicket: number;
//     image: string;
//   }
//
//   interface IBatsman {
//     ball: number;
//     four: number;
//     name: string;
//     runs: number;
//     six: number;
//     stick: boolean;
//     image: string;
//   }
