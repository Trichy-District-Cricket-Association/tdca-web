import firebase from 'firebase';

export default class OldMatch {
    /** Document id of the match document. */
    docId?: string;

    oldMatchId?: string;

    division?: number;

    schoolMatchType?: string;

    teamA?: string;

    teamB?: string;
    /**League, knockout, school matches are the possible types */
    type?: string;

    date?: Date;

    venue?: string;

    status?: string;

    teamAScore?: string;

    teamBScore?: string;

    totalOvers?: number;

    teamAOvers?: number;

    teamBOvers?: number;

    handleOldMatch({ field, value }: { field: string; value: string }): void {
        if (field == 'oldMatchId') this.oldMatchId = value;

        if (field == 'division') this.division = parseInt(value);
        if (field == 'schoolMatchType') this.schoolMatchType = value;

        if (field == 'teamA') this.teamA = value;
        if (field == 'teamB') this.teamB = value;

        if (field == 'type') this.type = value;
        if (field == 'date') this.date = new Date(value);
        if (field == 'venue') this.venue = value;

        if (field == 'status') this.status = value;

        if (field == 'teamAScore') this.teamAScore = value;
        if (field == 'teamBScore') this.teamBScore = value;

        if (field == 'totalOvers') this.totalOvers = parseInt(value);
        if (field == 'teamAOvers') this.teamAOvers = parseInt(value);
        if (field == 'teamBOvers') this.teamBOvers = parseInt(value);
    }

    constructor({
        docId,
        oldMatchId,
        division,
        schoolMatchType,
        teamA,
        teamB,
        type,
        date,
        venue,
        status,
        teamAScore,
        teamBScore,
        totalOvers,
        teamAOvers,
        teamBOvers,
    }: {
        docId?: string;
        oldMatchId?: string;
        division?: number;
        schoolMatchType?: string;
        teamA?: string;
        teamB?: string;
        type?: string;
        date?: Date;
        venue?: string;
        status?: string;
        teamAScore?: string;
        teamBScore?: string;
        totalOvers?: number;
        teamAOvers?: number;
        teamBOvers?: number;
    }) {
        if (docId) this.docId = docId;
        this.oldMatchId = oldMatchId ?? '';
        if (division) this.division = division;
        if (schoolMatchType) this.schoolMatchType = schoolMatchType;
        this.teamA = teamA ?? '';
        this.teamB = teamB ?? '';
        this.type = type ?? '';
        this.date = date;
        this.venue = venue ?? '';
        this.status = status ?? 'Toss not Done';
        this.teamAScore = teamAScore ?? '0/0';
        this.teamBScore = teamBScore ?? '0/0';
        this.totalOvers = totalOvers ?? 0;
        this.teamAOvers = teamAOvers ?? 0;
        this.teamBOvers = teamBOvers ?? 0;
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): OldMatch {
        return new OldMatch({
            docId: doc.id,
            oldMatchId: doc.data()?.oldMatchId,
            division: doc.data()?.division,
            schoolMatchType: doc.data()?.schoolMatchType,
            teamA: doc.data()?.teamA,
            teamB: doc.data()?.teamB,
            type: doc.data()?.type,
            date: new Date(doc.data()?.date),
            venue: doc.data()?.venue,
            status: doc.data()?.status,
            teamAScore: doc.data()?.teamAScore,
            teamBScore: doc.data()?.teamBScore,
            totalOvers: doc.data()?.totalOvers,
            teamAOvers: doc.data()?.teamAOvers,
            teamBOvers: doc.data()?.teamBOvers,
        });
    }
}
