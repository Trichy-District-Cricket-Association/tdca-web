import firebase from 'firebase';
import { MatchTeam } from './model_types/MatchTeam';
import { MatchUmpire } from './model_types/MatchUmpire';
import { MatchScorer } from './model_types/MatchScorer';
export default class Match {
    /** Document id of the match document. */
    docId?: string;

    matchId?: string;

    teamA?: MatchTeam;

    teamB?: MatchTeam;

    umpireA?: MatchUmpire;

    umpireB?: MatchUmpire;

    scorer?: MatchScorer;

    type?:  string;

    date?: Date;

    venue?: string;

    handleMatch({ field, value }: { field: string; value: string; }): void {
        if (field == 'matchId') this.matchId = value;

        if (field == 'teamA_teamName') this.teamA!.teamName = value;
        if (field == 'teamA_teamId') this.teamA!.teamId =value;
        if (field == 'teamB_teamName') this.teamB!.teamName = value;
        if (field == 'teamB_teamId') this.teamB!.teamId =value;

        if (field == 'umpireA_umpireName') this.umpireA!.umpireName = value;
        if (field == 'umpireA_umpireId') this.umpireA!.umpireId = value;
        // if (field == 'umpireA_umpireFeeStatus') this.umpireA!.umpireFeeStatus= boolean;
        if (field == 'umpireB_umpireName') this.umpireB!.umpireName = value;
        if (field == 'umpireB_umpireId') this.umpireB!.umpireId = value;
        // if (field == 'umpireB_umpireFeeStatus') this.umpireB!.umpireFeeStatus= boolean;

        if (field == 'scorer_scorerName') this.scorer!.scorerName = value;
        if (field == 'scorer_scorerId') this.scorer!.scorerId = value;
        // if (field == 'scorer_scorerFeeStatus') this.scorer!.scorerFeeStatus= boolean;

        if (field == 'type') this.type = value;
        if(field == 'date') this.date= new Date(Date.parse(value));
        if (field == 'venue') this.venue =value;
        
    }

    constructor({
        docId,
        matchId,
        teamA,
        teamB,
        umpireA,
        umpireB,
        scorer,
        type,
        date,
        venue,
    }: {
        docId?: string;
        matchId?: string;
        teamA?: MatchTeam;
        teamB?: MatchTeam;
        umpireA?: MatchUmpire;
        umpireB?: MatchUmpire;
        scorer?: MatchScorer;
        type?: string;
        date?: Date;
        venue?: string;
    }) {
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
