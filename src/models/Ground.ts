import firebase from 'firebase';
import { DivisionMatches } from './model_types/DivisionMatches';
import { TypeMatches } from './model_types/TypeMatches';

export default class Ground {
    /** Document id of the Ground document. */
    docId?: string;

    /** Ground Id of ground document. */
    groundId?: string;

    /** Name of the ground. */
    groundName?: string;

        /**ground Photo Url */
        avatarUrl?: string;

    /** Number of total matches in that ground. */
    totalMatches?: number;

    /** Number of matches per division in the ground. */
    divisionMatches?: DivisionMatches;

    /** Number of matches according to the match type. */
    typeMatches?: Omit<TypeMatches, 'institutionMatch' | 'tncaMatch' | 'combinedDistrictMatch' | 'privateMatch'>;

    handleGround({ field, value }: { field: string; value: string }): void {
        if (field == 'groundId') this.groundId = value;
        if (field == 'groundName') this.groundName = value;
        if (field == 'totalMatches') this.totalMatches = parseInt(value);
        if (field == 'divisionMatches_one') this.divisionMatches!.one = parseInt(value);
        if (field == 'divisionMatches_two') this.divisionMatches!.two = parseInt(value);
        if (field == 'divisionMatches_three') this.divisionMatches!.three = parseInt(value);
        if (field == 'divisionMatches_four') this.divisionMatches!.four = parseInt(value);
        if (field == 'divisionMatches_five') this.divisionMatches!.five = parseInt(value);
        if (field == 'typeMatches_interDistrictMatch') this.typeMatches!.interDistrictMatch = parseInt(value);
        if (field == 'typeMatches_knockoutMatch') this.typeMatches!.knockoutMatch = parseInt(value);
        if (field == 'typeMatches_leagueMatch') this.typeMatches!.leagueMatch = parseInt(value);
        if (field == 'typeMatches_schoolMatch') this.typeMatches!.schoolMatch = parseInt(value);
    }

    set setAvatar(url: string) {
        this.avatarUrl = url;
    }

    constructor({
        docId,
        groundId,
        avatarUrl,
        groundName,
        totalMatches,
        divisionMatches,
        typeMatches,
    }: {
        docId?: string;
        groundId?: string;
        groundName?: string;
        avatarUrl?: string;
        totalMatches?: number;
        divisionMatches?: DivisionMatches;
        typeMatches?: Omit<TypeMatches, 'institutionMatch' | 'tncaMatch' | 'combinedDistrictMatch' | 'privateMatch'>;
    }) {
        if (docId) this.docId = docId;
        this.groundId = groundId ?? '';
        this.groundName = groundName ?? '';
        if (avatarUrl) this.avatarUrl = avatarUrl;
        this.totalMatches = totalMatches ?? 0;
        this.divisionMatches = divisionMatches ?? { one: 0, two: 0, three: 0, four: 0, five: 0 };
        this.typeMatches = typeMatches ?? { interDistrictMatch: 0, knockoutMatch: 0, leagueMatch: 0, schoolMatch: 0 };
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): Ground {
        return new Ground({
            docId: doc.id,
            groundId: doc.data()?.groundId,
            groundName: doc.data()?.groundName,
            avatarUrl: doc.data()?.avatarUrl,
            totalMatches: doc.data()?.totalMatches,
            divisionMatches: doc.data()?.divisionMatches,
            typeMatches: doc.data()?.typeMatches,
        });
    }
}
