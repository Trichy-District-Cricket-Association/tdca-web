import firebase from 'firebase';

export default class Gallery {
    /** Document id of the Gallery document. */
    docId?: string;

    /**Photo Url */
    photoUrl?: string;

    /** details of the event. */
    description?: string;


    handlePhoto({ field, value }: { field: string; value: string }): void {
        if (field == 'description') this.description = value;
    }
    set setPhoto(url: string) {
        this.photoUrl = url;
    }

    constructor({ docId, photoUrl, description }: { docId?: string; photoUrl?: string ;   description?: string;}) {
        if (docId) this.docId = docId;
        if (photoUrl) this.photoUrl = photoUrl;
        this.description = description ?? ''
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): Gallery {
        return new Gallery({
            docId: doc.id,
            photoUrl: doc.data()?.photoUrl,
            description: doc.data()?.description,
        });
    }
}
