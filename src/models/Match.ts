import firebase from 'firebase';
import { MatchTeam } from './model_types/MatchTeam';
import { MatchUmpire } from './model_types/MatchUmpire';
import { MatchScorer } from './model_types/MatchScorer';
import { MatchGround } from './model_types/MatchGround';

export default class Match {
    /** Document id of the match document. */
    docId?: string;

    matchId?: string;

    division?: number;

    teamA?: MatchTeam;

    teamB?: MatchTeam;

    umpireA?: MatchUmpire;

    umpireB?: MatchUmpire;

    scorer?: MatchScorer;

    /**League, knockout, school matches are the possible types */
    type?: string;

    schoolMatchType?: string;

    date?: Date;

    venue?: MatchGround;

    status?: string;

    handleMatch({ field, value }: { field: string; value: string }): void {
        if (field == 'matchId') this.matchId = value;

        if (field == 'division') this.division = parseInt(value);
        if (field == 'schoolMatchType') this.schoolMatchType= value;

        if (field == 'teamA_teamName') this.teamA!.teamName = value;
        if (field == 'teamA_teamId') this.teamA!.teamId = value;
        if (field == 'teamA_teamColor') this.teamA!.teamColor = value;
        if (field == 'teamB_teamName') this.teamB!.teamName = value;
        if (field == 'teamB_teamId') this.teamB!.teamId = value;
        if (field == 'teamB_teamColor') this.teamB!.teamColor = value;

        if (field == 'umpireA_umpireName') this.umpireA!.umpireName = value;
        if (field == 'umpireA_umpireId') this.umpireA!.umpireId = value;
        if (field == 'umpireA_umpireFeeStatus') this.umpireA!.umpireFeeStatus = value;
        if (field == 'umpireB_umpireName') this.umpireB!.umpireName = value;
        if (field == 'umpireB_umpireId') this.umpireB!.umpireId = value;
        if (field == 'umpireB_umpireFeeStatus') this.umpireB!.umpireFeeStatus = value;

        if (field == 'scorer_scorerName') this.scorer!.scorerName = value;
        if (field == 'scorer_scorerId') this.scorer!.scorerId = value;
        if (field == 'scorer_scorerFeeStatus') this.scorer!.scorerFeeStatus = value;

        if (field == 'type') this.type = value;
        if (field == 'date') this.date = new Date(value);

        if (field == 'venue_groundName') this.venue!.groundName = value;
        if (field == 'venue_groundId') this.venue!.groundId = value;
        

        if (field == 'status') this.status = value;
    }
    set setUmpire1Avatar(umpire1AvatarUrl: string) {
        this.umpireA!.umpireAvatar = umpire1AvatarUrl;
    }
    set setUmpire2Avatar(umpire2AvatarUrl: string) {
        this.umpireB!.umpireAvatar = umpire2AvatarUrl;
    }
    set setScorerAvatar(scorerAvatarUrl: string) {
        this.scorer!.scorerAvatar = scorerAvatarUrl;
    }

    set setTeam1Logo(team1LogoUrl: string) {
        this.teamA!.teamLogo = team1LogoUrl;
    }
    set setTeam2Logo(team2LogoUrl: string) {
        this.teamB!.teamLogo = team2LogoUrl;
    }

    set setGroundAvatar(groundAvatarUrl: string) {
        this.venue!.groundAvatar = groundAvatarUrl;
    }

    constructor({
        docId,
        matchId,
        division,
        schoolMatchType,
        teamA,
        teamB,
        umpireA,
        umpireB,
        scorer,
        type,
        date,
        venue,
        status,
    }: {
        docId?: string;
        matchId?: string;
        division?: number;
        schoolMatchType?: string;
        teamA?: MatchTeam;
        teamB?: MatchTeam;
        umpireA?: MatchUmpire;
        umpireB?: MatchUmpire;
        scorer?: MatchScorer;
        type?: string;
        date?: Date;
        venue?: MatchGround;
        status?: string;
    }) {
        if (docId) this.docId = docId;
        this.matchId = matchId ?? '';
        if(division)this.division = division;
        if(schoolMatchType)this.schoolMatchType= schoolMatchType;
        this.teamA = teamA ?? {
            teamId: '',
            teamName: '',
            playingEleven: [],
            onBench: [],
            teamColor:'',
            teamLogo: ''
        };
        this.teamB = teamB ?? {
            teamId: '',
            teamName: '',
            playingEleven: [],
            onBench: [],
            teamColor:'',
            teamLogo: ''
        };
        this.umpireA = umpireA ?? { umpireId: '', umpireFeeStatus: '', umpireName: '', umpireAvatar: '' };
        this.umpireB = umpireB ?? { umpireId: '', umpireFeeStatus: '', umpireName: '', umpireAvatar: '' };
        this.scorer = scorer ?? { scorerId: '', scorerFeeStatus: '', scorerName: '', scorerAvatar: '' };
        this.type = type ?? '';
        this.date = date;
        this.venue = venue ?? { groundId: '', groundName: '', groundAvatar: '' };
        this.status = status ?? 'Toss Yet to Put';
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): Match {
        return new Match({
            docId: doc.id,
            matchId: doc.data()?.matchId,
            division: doc.data()?.division,
            schoolMatchType: doc.data()?.schoolMatchType,
            teamA: doc.data()?.teamA,
            teamB: doc.data()?.teamB,
            umpireA: doc.data()?.umpireA,
            umpireB: doc.data()?.umpireB,
            scorer: doc.data()?.scorer,
            type: doc.data()?.type,
            date: new Date(doc.data()?.date),
            venue: doc.data()?.venue,
            status: doc.data()?.status,
        });
    }
}
