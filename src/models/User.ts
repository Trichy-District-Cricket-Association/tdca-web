import firebase from 'firebase';
import { UserRoles } from '../enums/auth';

export default class User {
    /** User ID of that user. */
    uid: string;

    /** Role of that user. */
    role: UserRoles;

    /** Name of that user. */
    name: string;

    /** Email of that user. */
    email: string;

    constructor({ uid, role, name, email }: User) {
        this.uid = uid;
        this.role = role;
        this.name = name;
        this.email = email;
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): User {
        return new User({
            uid: doc.id,
            role: <UserRoles>doc.data()?.role,
            name: doc.data()?.name,
            email: doc.data()?.email,
        });
    }
}
