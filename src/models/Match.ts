import firebase from 'firebase';
import { MatchTeam } from './model_types/MatchTeam';
import { MatchUmpire } from './model_types/MatchUmpire';
import { MatchScorer } from './model_types/MatchScorer';
import { TypeMatches } from './model_types/TypeMatches';
export default class Match {
    /** Document id of the match document. */
    docId?: string;

    matchId: string;

    teamA: MatchTeam;

    teamB: MatchTeam;

    umpireA: MatchUmpire;

    umpireB: MatchUmpire;

    scorer: MatchScorer;

    type: TypeMatches;

    date: Date;

    venue: string;

    constructor({ docId, matchId, teamA, teamB, umpireA, umpireB, scorer, type, date, venue }: Match) {
        if (docId) this.docId = docId;
        this.matchId = matchId;
        this.teamA = teamA;
        this.teamB = teamB;
        this.umpireA = umpireA;
        this.umpireB = umpireB;
        this.scorer = scorer;
        this.type = type;
        this.date = date;
        this.venue = venue;
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): Match {
        return new Match({
            docId: doc.id,
            matchId: doc.data()?.matchId,
            teamA: doc.data()?.teamA,
            teamB: doc.data()?.teamB,
            umpireA: doc.data()?.umpireA,
            umpireB: doc.data()?.umpireB,
            scorer: doc.data()?.scorer,
            type: doc.data()?.type,
            date: doc.data()?.date,
            venue: doc.data()?.venue,
        });
    }
}
