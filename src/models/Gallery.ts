import firebase from 'firebase';

export default class Gallery {
    /** Document id of the Gallery document. */
    docId?: string;

    /**Photo Url */
    photoUrl?: string;

    set setPhoto(url: string) {
        this.photoUrl = url;
    }

    constructor({ docId, photoUrl }: { docId?: string; photoUrl?: string }) {
        if (docId) this.docId = docId;
        if (photoUrl) this.photoUrl = photoUrl;
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): Gallery {
        return new Gallery({
            docId: doc.id,
            photoUrl: doc.data()?.photoUrl,
        });
    }
}
