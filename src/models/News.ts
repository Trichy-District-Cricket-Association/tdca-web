import firebase from 'firebase';

export default class News {
    /** Document id of the News document. */
    docId?: string;

    /**Photo Url */
    photoUrl?: string;

    /** details of the match. */
    description?: string;

    /** Headline. */
    title?: string;

    handleNews({ field, value }: { field: string; value: string }): void {
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

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): News {
        return new News({
            docId: doc.id,
            photoUrl: doc.data()?.photoUrl,
            description: doc.data()?.description,
            title: doc.data()?.title,
        });
    }
}
