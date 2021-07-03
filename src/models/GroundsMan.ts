import firebase from 'firebase';

export default class GroundsMan {
    /** Document id of the groundsMan document. */
    docId?: string;

    /** GroundsMan Id of groundsMan document. */
    groundsManId?: string;

    /** Name of the groundsMan */
    groundsManName?: string;

    /**groundsMan Photo Url */
    avatarUrl?: string;

    /** Email Id of groundsMan*/
    emailId?: string;

    /** Date of Birth of groundsMan */
    dateOfBirth?:Date;

    /** Primary Mobile Number of groundsMan */
    primaryContact?: string;

    /** Secondary Mobile Number of groundsMan */
    secondaryContact?: string;

    /**Permanent Address of the groundsMan */
    address?: string;

    /** Gpay of phonePay Number of groundsMan*/
    payPhoneNumber?: string;

    /**Aadhar Number of the groundsMan */
    aadharNumber?: string;

    /** Bank Account Number of groundsMan*/
    bankAccountNumber?: string;

    /** Name of the Bank */
    bankName?: string;

    /** Branch the bank */
    bankBranch?: string;

    /**IFSC code of the bank */
    bankIFSC?: string;

    handleGroundsMan({ field, value }: { field: string; value: string }): void {
        if (field == 'groundsManId') this.groundsManId = value;
        if (field == 'groundsManName') this.groundsManName = value;
        if (field == 'emailId') this.emailId = value;
        if (field == 'dateOfBirth') this.dateOfBirth = new Date(value);
        if (field == 'primaryContact') this.primaryContact = value;
        if (field == 'secondaryContact') this.secondaryContact = value;
        if (field == 'aadharNumber') this.aadharNumber = value;
        if (field == 'payPhoneNumber') this.payPhoneNumber = value;
        if (field == 'bankAccountNumber') this.bankAccountNumber = value;
        if (field == 'bankName') this.bankName = value;
        if (field == 'bankBranch') this.bankBranch = value;
        if (field == 'bankIFSC') this.bankIFSC = value;
        if (field == 'address') this.address = value;
    }
    set setAvatar(url: string) { this.avatarUrl = url};
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
        bankAccountNumber,
        bankName,
        bankBranch,
        bankIFSC,
        aadharNumber,
        address,
    }: {
        docId?: string;
        groundsManId?: string;
        groundsManName?: string;
        avatarUrl?: string;
        emailId?: string;
        dateOfBirth?: Date;
        primaryContact?: string;
        secondaryContact?: string;
        payPhoneNumber?: string;
        bankAccountNumber?: string;
        bankName?: string;
        bankBranch?: string;
        bankIFSC?: string;
        aadharNumber?: string;
        address?: string;
    }) {
        if (docId) this.docId = docId??'';
        this.groundsManId = groundsManId??'';
        this.groundsManName = groundsManName??'';
        if (avatarUrl) this.avatarUrl = avatarUrl??"";
        this.emailId = emailId??'';
        this.dateOfBirth = dateOfBirth;
        this.primaryContact = primaryContact??'';
        this.secondaryContact = secondaryContact??'';
        this.payPhoneNumber = payPhoneNumber??'';
        this.bankAccountNumber = bankAccountNumber??'';
        this.bankName = bankName??'';
        this.bankBranch = bankBranch??'';
        this.bankIFSC = bankIFSC??'';
        this.aadharNumber = aadharNumber??'';
        this.address = address??'';
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): GroundsMan {
        return new GroundsMan({
            docId: doc.id,
            groundsManId: doc.data()?.groundsManId,
            groundsManName: doc.data()?.groundsManName,
            avatarUrl: doc.data()?.avatarUrl,
            emailId: doc.data()?.emailId,
            dateOfBirth: new Date(doc.data()?.dateOfBirth),
            primaryContact: doc.data()?.primaryContact,
            secondaryContact: doc.data()?.secondaryContact,
            payPhoneNumber: doc.data()?.payPhoneNumber,
            bankAccountNumber: doc.data()?.bankAccountNumber,
            bankName: doc.data()?.bankName,
            bankBranch: doc.data()?.bankBranch,
            bankIFSC: doc.data()?.bankIFSC,
            aadharNumber: doc.data()?.aadharNumber,
            address: doc.data()?.address,
        });
    }
}
