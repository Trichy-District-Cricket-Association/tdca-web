import firebase from 'firebase';

export default class Video {
    /** Document id of the Video document. */
    docId?: string;

    /**Photo Url */
    photoUrl?: string;

    /** Name of the ground. */
    description?: string;

    /** Name of the ground. */
    title?: string;

    handleGround({ field, value }: { field: string; value: string }): void {
        if (field == 'description') this.description = value;
        if (field == 'title') this.title = value;
    }

    set setUrl(url: string) {
        this.photoUrl = url;
    }

    constructor({
        docId,
        photoUrl,
        description,
        title,
    }: {
        docId?: string;
        photoUrl?: string;
        description?: string;
        title?: string;
    }) {
        if (docId) this.docId = docId;
        if (photoUrl) this.photoUrl = photoUrl;
        this.description = description ?? '';
        this.title = title ?? '';
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): Video {
        return new Video({
            docId: doc.id,
            photoUrl: doc.data()?.photoUrl,
            description: doc.data()?.description,
            title: doc.data()?.title,
        });
    }
}
