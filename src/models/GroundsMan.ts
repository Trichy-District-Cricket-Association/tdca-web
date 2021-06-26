import firebase from 'firebase';

export default class GroundsMan {
    /** Document id of the groundsMan document. */
    docId?: string;

    groundsManId: string;

    groundsManName: string;

    avatarUrl?: string;

    emailId: string;

    dateOfBirth: Date;

    primaryContact: string;

    secondaryContact: string;

    payPhoneNumber: string;

    bankAccount: string;

    bankName: string;

    bankBranch: string;

    bankIFSC: string;

    aadharNumber: string;

    permanentAddress: string;

    constructor({
        docId,
        groundsManId,
        groundsManName,
        avatarUrl,
        emailId,
        dateOfBirth,
        primaryContact,
        secondaryContact,
        payPhoneNumber,
        bankAccount,
        bankName,
        bankBranch,
        bankIFSC,
        aadharNumber,
        permanentAddress,
    }: GroundsMan) {
        if (docId) this.docId = docId;
        this.groundsManId = groundsManId;
        this.groundsManName = groundsManName;
        if (avatarUrl) this.avatarUrl = avatarUrl;
        this.emailId = emailId;
        this.dateOfBirth = dateOfBirth;
        this.primaryContact = primaryContact;
        this.secondaryContact = secondaryContact;
        this.payPhoneNumber = payPhoneNumber;
        this.bankAccount = bankAccount;
        this.bankName = bankName;
        this.bankBranch = bankBranch;
        this.bankIFSC = bankIFSC;
        this.aadharNumber = aadharNumber;
        this.permanentAddress = permanentAddress;
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): GroundsMan {
        return new GroundsMan({
            docId: doc.id,
            groundsManId: doc.data()?.groundsManId,
            groundsManName: doc.data()?.groundsManName,
            avatarUrl: doc.data()?.avatarUrl,
            emailId: doc.data()?.emailId,
            dateOfBirth: doc.data()?.dateOfBirth,
            primaryContact: doc.data()?.primaryContact,
            secondaryContact: doc.data()?.secondaryContact,
            payPhoneNumber: doc.data()?.payPhoneNumber,
            bankAccount: doc.data()?.bankAccount,
            bankName: doc.data()?.bankName,
            bankBranch: doc.data()?.bankBranch,
            bankIFSC: doc.data()?.bankIFSC,
            aadharNumber: doc.data()?.aadharNumber,
            permanentAddress: doc.data()?.permanentAddress,
        });
    }
}
