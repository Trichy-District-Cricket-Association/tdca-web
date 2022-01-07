import firebase from 'firebase';

export default class Team {
    /** Document id of the teams document. */
    docId?: string;

    teamId?: string;

    teamName?: string;
    
    type?: string;
    /**Team Logo Url */
    avatarUrl?: string;

    teamColor?: string;

    emailId?: string;

    division?: number;

    numberOfMatches?: number;

    won?: number;

    lost?: number;

    draw?: number;

    tie?: number;

    noResult?: number;

    totalPoints?: number;

    walkover?: number;

    conceed?: number;

    refusal?: number;

    penalty?: number;

    runRate?: number;

    active?: string;

    handleTeam({ field, value }: { field: string; value: string }): void {
        if (field == 'teamId') this.teamId = value;
        if (field == 'teamName') this.teamName = value;
        if (field == 'type') this.type = value;
        if (field == 'emailId') this.emailId = value;
        if (field == 'teamColor') this.teamColor = value;
        if (field == 'division') this.division = parseInt(value);
        if (field == 'numberOfMatches') this.numberOfMatches = parseInt(value);
        if (field == 'won') this.won = parseInt(value);
        if (field == 'lost') this.lost = parseInt(value);
        if (field == 'draw') this.draw = parseInt(value);
        if (field == 'tie') this.tie = parseInt(value);
        if (field == ' noResult') this.noResult = parseInt(value);
        if (field == 'totalPoints') this.totalPoints = parseInt(value);
        if (field == 'walkover') this.walkover = parseInt(value);
        if (field == 'conceed') this.conceed = parseInt(value);
        if (field == 'refusal') this.refusal = parseInt(value);
        if (field == 'penalty') this.penalty = parseInt(value);
        if (field == 'runRate') this.runRate = parseInt(value);
        if (field == 'active') this.active = value;
    }
    set setAvatar(url: string) {
        this.avatarUrl = url;
    }

    constructor({
        docId,
        teamId,
        teamName,
        type,
        teamColor,
        avatarUrl,
        emailId,
        division,
        numberOfMatches,
        won,
        lost,
        draw,
        tie,
        noResult,
        totalPoints,
        walkover,
        conceed,
        refusal,
        penalty,
        runRate,
        active
    }: {
        docId?: string;
        teamId?: string;
        teamName?: string;
        type?: string;
        teamColor?: string;
        avatarUrl?: string;
        emailId?: string;
        division?: number;
        numberOfMatches?: number;
        won?: number;
        lost?: number;
        draw?: number;
        tie?: number;
        noResult?: number;
        totalPoints?: number;
        walkover?: number;
        conceed?: number;
        refusal?: number;
        penalty?: number;
        runRate?: number;
        active?: string;
    }) {
        if (docId) this.docId = docId;
        this.teamId = teamId ?? '';
        this.teamName = teamName ?? '';
        this.type = type ?? '';
        this.teamColor = teamColor ?? '#fff';
        if (avatarUrl) this.avatarUrl = avatarUrl;
        this.emailId = emailId ?? '';
        this.division = division ?? 0;
        this.numberOfMatches = numberOfMatches ?? 0;
        this.won = won ?? 0;
        this.lost = lost ?? 0;
        this.draw = draw ?? 0;
        this.tie = tie ?? 0;
        this.noResult = noResult ?? 0;
        this.totalPoints = totalPoints ?? 0;
        this.walkover = walkover ?? 0;
        this.conceed = conceed ?? 0;
        this.refusal = refusal ?? 0;
        this.penalty = penalty ?? 0;
        this.runRate = runRate ?? 0;
        this.active = active ?? 'Yes';
    }
    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): Team {
        return new Team({
            docId: doc.id,
            teamId: doc.data()?.teamId,
            teamName: doc.data()?.teamName,
            type: doc.data()?.type,
            teamColor: doc.data()?.teamColor,
            avatarUrl: doc.data()?.avatarUrl,
            emailId: doc.data()?.emailId,
            division: doc.data()?.division,
            numberOfMatches: doc.data()?.numberOfMatches,
            won: doc.data()?.won,
            lost: doc.data()?.lost,
            draw: doc.data()?.draw,
            tie: doc.data()?.tie,
            noResult: doc.data()?.noResult,
            totalPoints: doc.data()?.totalPoints,
            walkover: doc.data()?.walkover,
            conceed: doc.data()?.conceed,
            refusal: doc.data()?.refusal,
            penalty: doc.data()?.penalty,
            runRate: doc.data()?.runRate,
            active: doc.data()?.active,
        });
    }
}
