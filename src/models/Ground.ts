import firebase from 'firebase';
import { DivisionMatches } from './model_types/DivisionMatches';
import { TypeMatches } from './model_types/TypeMatches';

export default class Ground {
    /** Document id of the Ground document. */
    docId?: string;

    /** Ground Id of ground document. */
    groundId: number;

    /** Name of the ground. */
    groundName: string;

    /** Number of total matches in that ground. */
    totalMatches: number;

    /** Number of matches per division in the ground. */
    divisionMatches: DivisionMatches;

    /** Number of matches according to the match type. */
    typeMatches: Omit<TypeMatches, 'institutionMatch' | 'tncaMatch' | 'combinedDistrictMatch' | 'privateMatch'>;

    constructor({ docId, groundId, groundName, totalMatches, divisionMatches, typeMatches }: Ground) {
        if (docId) this.docId = docId;
        this.groundId = groundId;
        this.groundName = groundName;
        this.totalMatches = totalMatches;
        this.divisionMatches = divisionMatches;
        this.typeMatches = typeMatches;
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): Ground {
        return new Ground({
            docId: doc.id,
            groundId: doc.data()?.groundId,
            groundName: doc.data()?.groundName,
            totalMatches: doc.data()?.totalMatches,
            divisionMatches: doc.data()?.divisionMatches,
            typeMatches: doc.data()?.typeMatches,
        });
    }
}
