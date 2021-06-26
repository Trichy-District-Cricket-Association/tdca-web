import firebase from 'firebase';

export default class Team {
    /** Document id of the teams document. */
    docId?: string;

    teamId: string;

    teamName: string;

    emailId: string;

    division: number;

    numberOfMatches: number;

    won: number;

    lost: number;

    draw: number;

    tie: number;

    noResult: number;

    totalPoints: number;

    walkover: number;

    conceed: number;

    refusal: number;

    penalty: number;

    constructor({
        docId,
        teamId,
        teamName,
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
    }: Team) {
        if (docId) this.docId = docId;
        this.teamId = teamId;
        this.teamName = teamName;
        this.emailId = emailId;
        this.division = division;
        this.numberOfMatches = numberOfMatches;
        this.won = won;
        this.lost = lost;
        this.draw = draw;
        this.tie = tie;
        this.noResult = noResult;
        this.totalPoints = totalPoints;
        this.walkover = walkover;
        this.conceed = conceed;
        this.refusal = refusal;
        this.penalty = penalty;
    }
    static fromFirestore(doc:firebase.firestore.DocumentSnapshot):Team{
        return new Team({
            docId:doc.id,
            teamId:doc.data()?.teamId,
            teamName:doc.data()?.teamName,
            emailId:doc.data()?.emailId,
            division:doc.data()?.division,
            numberOfMatches:doc.data()?.numberOfMatches,
            won:doc.data()?.won,
            lost:doc.data()?.lost,
            draw:doc.data()?.draw,
            tie:doc.data()?.tie,
            noResult:doc.data()?.noResult,
            totalPoints:doc.data()?.totalPoints,
            walkover:doc.data()?.walkover,
            conceed:doc.data()?.conceed,
            refusal:doc.data()?.refusal,
            penalty:doc.data()?.penalty,
        });
    }

}
