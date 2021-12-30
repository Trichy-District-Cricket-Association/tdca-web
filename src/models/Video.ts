import firebase from 'firebase';

export default class Video {
    /** Document id of the Video document. */
    docId?: string;

    /**Photo Url */
    videoUrl?: string;

    /** Name of the ground. */
    description?: string;

    handleVideo({ field, value }: { field: string; value: string }): void {
        if (field == 'description') this.description = value;
        if (field == 'url') this.videoUrl = value;
    }

    constructor({ docId, videoUrl, description }: { docId?: string; videoUrl?: string; description?: string }) {
        if (docId) this.docId = docId;

        this.description = description ?? '';
        this.videoUrl = videoUrl ?? '';
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): Video {
        return new Video({
            docId: doc.id,
            videoUrl: doc.data()?.videoUrl,
            description: doc.data()?.description,
        });
    }
}
