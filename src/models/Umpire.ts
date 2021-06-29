import firebase from 'firebase';
import { DivisionMatches } from './model_types/DivisionMatches';
import { TypeMatches } from './model_types/TypeMatches';

export default class Umpire {
    /** Document id of the Umpire document. */
    docId?: string;

    /** umpire Id of umpire document. */
    umpireId?: string;

    /** Name of the umpire */
    umpireName?: string;

    /**umpire Photo Url */
    avatarUrl?: string;

    /** Email Id of umpire*/
    emailId?: string;

    /** Division Matches of umpire*/
    divisionMatches?: DivisionMatches;

    /** types of matches for umpire */
    typeMatches?: TypeMatches;

    /** total Matches of umpire*/
    totalMatches?: number;

    /** Gpay of phonePay Number of umpire*/
    panel?: string;

    /** Date of Birth of umpire */
    dateOfBirth?: Date;

    /** Primary Mobile Number of umpire */
    primaryContact?: string;

    /** Secondary Mobile Number of umpire */
    secondaryContact?: string;

    /** Gpay of phonePay Number of umpire*/
    payPhoneNumber?: string;

    /** Bank Account Number of umpire*/
    bankAccountNumber?: string;

    /** Name of the Bank */
    bankName?: string;

    /** Branch the bank */
    bankBranch?: string;

    /**IFSC code of the bank */
    bankIFSC?: string;

    /**Aadhar Number of the umpire */
    aadharNumber?: string;

    /**Permanent Address of the umpire */
    address?: string;

    handleUmpire({ field, value }: { field: string; value: string }): void {
        if (field == 'umpireId') this.umpireId = value;
        if (field == 'umpireName') this.umpireName = value;
        if (field == 'emailId') this.emailId = value;
        if (field == 'dateOfBirth') this.dateOfBirth = new Date(Date.parse(value));
        if (field == 'primaryContact') this.primaryContact = value;
        if (field == 'secondaryContact') this.secondaryContact = value;
        if (field == 'payPhoneNumber') this.payPhoneNumber = value;
        if (field == 'bankAccountNumber') this.bankAccountNumber = value;
        if (field == 'bankName') this.bankName = value;
        if (field == 'bankBranch') this.bankBranch = value;
        if (field == 'bankIFSC') this.bankIFSC = value;
        if (field == 'address') this.address = value;

        /**Matches Field */
        if (field == 'panel') this.panel! = value;
        if (field == 'divisionMatches_one') this.divisionMatches!.one = parseInt(value);
        if (field == 'divisionMatches_two') this.divisionMatches!.two = parseInt(value);
        if (field == 'divisionMatches_three') this.divisionMatches!.three = parseInt(value);
        if (field == 'divisionMatches_four') this.divisionMatches!.four = parseInt(value);
        if (field == 'divisionMatches_five') this.divisionMatches!.five = parseInt(value);
        if (field == 'typeMatches_interDistrictMatch') this.typeMatches!.interDistrictMatch = parseInt(value);
        if (field == 'typeMatches_knockoutMatch') this.typeMatches!.knockoutMatch = parseInt(value);
        if (field == 'typeMatches_leagueMatch') this.typeMatches!.leagueMatch = parseInt(value);
        if (field == 'typeMatches_schoolMatch') this.typeMatches!.schoolMatch = parseInt(value);
        if (field == 'typeMatches_tncaMatch') this.typeMatches!.tncaMatch = parseInt(value);
        if (field == 'typeMatches_combinedDistrictMatch') this.typeMatches!.combinedDistrictMatch = parseInt(value);
        if (field == 'typeMatches_interDistrictMatch') this.typeMatches!.interDistrictMatch = parseInt(value);
        if (field == 'typeMatches_privateMatch') this.typeMatches!.privateMatch = parseInt(value);
    }
    set setAvatar(url: string) {
        this.avatarUrl = url;
    }

    constructor({
        docId,
        umpireId,
        umpireName,
        avatarUrl,
        emailId,
        divisionMatches,
        typeMatches,
        totalMatches,
        panel,
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
        umpireId?: string;
        umpireName?: string;
        avatarUrl?: string;
        emailId?: string;
        divisionMatches?: DivisionMatches;
        typeMatches?: TypeMatches;
        totalMatches?: number;
        panel?: string;
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
        if (docId) this.docId = docId;
        this.umpireId = umpireId;
        this.umpireName = umpireName;
        if (avatarUrl) this.avatarUrl = avatarUrl;
        this.emailId = emailId;
        this.divisionMatches = divisionMatches;
        this.typeMatches = typeMatches;
        this.totalMatches = totalMatches;
        this.panel = panel;
        this.dateOfBirth = dateOfBirth;
        this.primaryContact = primaryContact;
        this.secondaryContact = secondaryContact;
        this.payPhoneNumber = payPhoneNumber;
        this.bankAccountNumber = bankAccountNumber;
        this.bankName = bankName;
        this.bankBranch = bankBranch;
        this.bankIFSC = bankIFSC;
        this.aadharNumber = aadharNumber;
        this.address = address;
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): Umpire {
        return new Umpire({
            docId: doc.id,
            umpireId: doc.data()?.umpireId,
            umpireName: doc.data()?.umpireName,
            avatarUrl: doc.data()?.avatarUrl,
            emailId: doc.data()?.emailId,
            divisionMatches: doc.data()?.divisionMatches,
            typeMatches: doc.data()?.typeMatches,
            totalMatches: doc.data()?.totalMatches,
            panel: doc.data()?.panel,
            dateOfBirth: doc.data()?.dateOfBirth,
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
