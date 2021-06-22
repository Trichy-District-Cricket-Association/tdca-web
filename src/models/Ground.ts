import firebase from 'firebase';

export default class Ground {
    /** Document id of the Ground document. */
    docId: string;

    /** Ground Id of ground document. */
    groundId: number;

    /** Name of the ground. */
    name: string;

    /** Number of total matches in that ground. */
    totalMatches: number;

    /** Number of matches per division in the ground. */
    div1: number;

    div2: number;

    div3: number;

    div4: number;

    div5: number;

    /** Number of matches according to the match type. */
    interDistrict: number;

    knockout: number;

    league: number;

    school: number;

    constructor({
        docId,
        groundId,
        name,
        totalMatches,
        div1,
        div2,
        div3,
        div4,
        div5,
        interDistrict,
        knockout,
        league,
        school,
    }: Ground) {
        this.docId = docId;
        this.groundId = groundId;
        this.name = name;
        this.totalMatches = totalMatches;
        this.div1 = div1;
        this.div2 = div2;
        this.div3 = div3;
        this.div4 = div4;
        this.div5 = div5;
        this.interDistrict = interDistrict;
        this.knockout = knockout;
        this.league = league;
        this.school = school;
    }
}

export const groundFromFirestore = (doc: firebase.firestore.DocumentSnapshot): Ground =>
    new Ground({
        docId: doc.id,
        groundId: doc.data()?.groundId,
        name: doc.data()?.name,
        totalMatches: doc.data()?.totalMatches,
        div1: doc.data()?.div1,
        div2: doc.data()?.div2,
        div3: doc.data()?.div3,
        div4: doc.data()?.div4,
        div5: doc.data()?.div5,
        interDistrict: doc.data()?.interDistrict,
        knockout: doc.data()?.knockout,
        league: doc.data()?.league,
        school: doc.data()?.school,
    });
