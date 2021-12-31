import firebase from 'firebase';

export default class News {
    /** Document id of the News document. */
    docId?: string;

    /**Photo Url */
    photoUrl?: string;

    /** details of the event. */
    description?: string;

    /** Headline. */
    title?: string;

    /** place of the event. */
    place?: string;

    /** date of the event. */
    date?: string;

    handleNews({ field, value }: { field: string; value: string }): void {
        if (field == 'description') this.description = value;
        if (field == 'title') this.title = value;
        if (field == 'place') this.place = value;
        if (field == 'date') this.date = value;
    }

    set setUrl(url: string) {
        this.photoUrl = url;
    }

    constructor({
        docId,
        photoUrl,
        description,
        place,
        date,
        title,
    }: {
        docId?: string;
        photoUrl?: string;
        description?: string;
        title?: string;
        place?: string;
        date?: string;
    }) {
        if (docId) this.docId = docId;
        if (photoUrl) this.photoUrl = photoUrl;
        this.description = description ?? '';
        this.title = title ?? '';
        this.place = place ?? '';
        this.date = date ?? '';
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): News {
        return new News({
            docId: doc.id,
            photoUrl: doc.data()?.photoUrl,
            description: doc.data()?.description,
            title: doc.data()?.title,
            place: doc.data()?.place,
            date: doc.data()?.date,
        });
    }
}
