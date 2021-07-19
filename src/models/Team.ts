import firebase from 'firebase';

export default class Team {
    /** Document id of the teams document. */
    docId?: string;

    teamId?: string;

    teamName?: string;

      /**Team Logo Url */
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

    handleTeam({ field, value }: { field: string; value: string }): void {
        if (field == 'teamId') this.teamId = value;
        if (field == 'teamName') this.teamName = value;
        if (field == 'emailId') this.emailId = value;
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
    }
    set setAvatar(url: string) {
        this.avatarUrl = url;
    }

    constructor({
        docId,
        teamId,
        teamName,
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
    }: {
        docId?: string;
        teamId?: string;
        teamName?: string;
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
    }) {
        if (docId) this.docId = docId;
        this.teamId = teamId??'';
        this.teamName = teamName??'';
        if (avatarUrl) this.avatarUrl = avatarUrl;
        this.emailId = emailId??'';
        this.division = division??0;
        this.numberOfMatches = numberOfMatches??0;
        this.won = won??0;
        this.lost = lost??0;
        this.draw = draw??0;
        this.tie = tie??0;
        this.noResult = noResult??0;
        this.totalPoints = totalPoints??0;
        this.walkover = walkover??0;
        this.conceed = conceed??0;
        this.refusal = refusal??0;
        this.penalty = penalty??0;
    }
    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): Team {
        return new Team({
            docId: doc.id,
            teamId: doc.data()?.teamId,
            teamName: doc.data()?.teamName,
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
        });
    }
}
