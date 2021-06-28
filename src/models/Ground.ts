import firebase from 'firebase';
import { DivisionMatches } from './model_types/DivisionMatches';
import { TypeMatches } from './model_types/TypeMatches';

export default class Ground {
    /** Document id of the Ground document. */
    docId?: string;

    /** Ground Id of ground document. */
    groundId: string;

    /** Name of the ground. */
    groundName: string;

    /** Number of total matches in that ground. */
    totalMatches: number;

    /** Number of matches per division in the ground. */
    divisionMatches: DivisionMatches;

    /** Number of matches according to the match type. */
    typeMatches: Omit<TypeMatches, 'institutionMatch' | 'tncaMatch' | 'combinedDistrictMatch' | 'privateMatch'>;

    handleGround({ field, value }: { field: string; value: any }): void {
        if (field == 'groundId') this.groundId = value;
        if (field == 'groundName') this.groundName = value;
        if (field == 'totalMatches') this.totalMatches = value;
        if (field == 'divisionMatches_one') this.divisionMatches.one = value;
        if (field == 'divisionMatches_two') this.divisionMatches.two = value;
        if (field == 'divisionMatches_three') this.divisionMatches.three = value;
        if (field == 'divisionMatches_four') this.divisionMatches.four = value;
        if (field == 'divisionMatches_five') this.divisionMatches.five = value;
        if (field == 'typeMatches_interDistrictMatch') this.typeMatches.interDistrictMatch = value;
        if (field == 'typeMatches_knockoutMatch') this.typeMatches.knockoutMatch = value;
        if (field == 'typeMatches_leagueMatch') this.typeMatches.leagueMatch = value;
        if (field == 'typeMatches_schoolMatch') this.typeMatches.schoolMatch = value;
    }

    constructor({
        docId,
        groundId,
        groundName,
        totalMatches,
        divisionMatches,
        typeMatches,
    }: {
        docId?: string;
        groundId: string;
        groundName: string;
        totalMatches: number;
        divisionMatches: DivisionMatches;
        typeMatches: Omit<TypeMatches, 'institutionMatch' | 'tncaMatch' | 'combinedDistrictMatch' | 'privateMatch'>;
    }) {
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
