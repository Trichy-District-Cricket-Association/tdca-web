import firebase from 'firebase';

export default class User {
    /** User ID of that user. */
    uid?: string;

    /** Role of that user. */
    role?: string;

    /** Name of that user. */
    name?: string;

    /** Email of that user. */
    email?: string;

    constructor({ uid, role, name, email }: User) {
        this.uid = uid ?? undefined;
        this.role = role ?? undefined;
        this.name = name ?? undefined;
        this.email = email ?? undefined;
    }
}

export const userFromFirestore = (doc: firebase.firestore.DocumentSnapshot): User =>
    new User({
        uid: doc.id,
        role: doc.data()?.role,
        name: doc.data()?.name,
        email: doc.data()?.email,
    });
