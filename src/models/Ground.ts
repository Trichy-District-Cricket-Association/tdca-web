export default class Ground {
    /** Document id of the Ground document. */
    docId: string;

    /** Ground Id of Ground Document */
    id: number;

    constructor({ docId, id }: Ground) {
        this.docId = docId;
        this.id = id;
    }
}
