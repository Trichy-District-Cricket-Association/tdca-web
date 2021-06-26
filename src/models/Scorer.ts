import firebase from 'firebase';
import { DivisionMatches } from './model_types/DivisionMatches';
import { TypeMatches } from './model_types/TypeMatches';

export default class Scorer {
    /** Document id of the Umpire document. */
    docId?: string;

    scorerId: string;

    scorerName: string;

    avatarUrl?: string;

    emailId: string;

    divisionMatches: DivisionMatches;

    typeMatches: TypeMatches;

    panel: string;

    totalMatches: number;

    // totalDue: number;

    // totalPaid: number;

    // balanceAmount: number;

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
        scorerId,
        scorerName,
        avatarUrl,
        emailId,
        divisionMatches,
        typeMatches,
        totalMatches,
        panel,
        // totalDue,
        // totalPaid,
        // balanceAmount,
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
    }: Scorer) {
        if (docId) this.docId = docId;
        this.scorerId = scorerId;
        this.scorerName = scorerName;
        if (avatarUrl) this.avatarUrl = avatarUrl;
        this.emailId = emailId;
        this.divisionMatches = divisionMatches;
        this.typeMatches = typeMatches;
        this.totalMatches = totalMatches;
        this.panel = panel;
        {
            /**  
        this.totalDue = totalDue;
        this.totalPaid = totalPaid;
        this.balanceAmount = balanceAmount;*/
        }
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

    static fromFirestore(doc:firebase.firestore.DocumentSnapshot):Scorer{
        return new Scorer({
            docId:doc.id,
            scorerId:doc.data()?.scorerId,
            scorerName:doc.data()?.scorerName,
            avatarUrl:doc.data()?.avatarUrl,
            emailId:doc.data()?.emailId,
            divisionMatches:doc.data()?.divisionMatches,
            typeMatches:doc.data()?.typeMatches,
            panel:doc.data()?.panel,
            totalMatches:doc.data()?.totalMatches,
            // totalDue:doc.data()?.totalDue,
            // totalPaid:doc.data()?.totalPaid,
            // balanceAmount:doc.data()?.balanceAmount,
            dateOfBirth:doc.data()?.dateOfBirth,
            primaryContact:doc.data()?.primaryContact,
            secondaryContact:doc.data()?.secondaryContact,
            payPhoneNumber:doc.data()?.payPhoneNumber,
            bankAccount:doc.data()?.bankAccount,
            bankName:doc.data()?.bankName,
            bankBranch:doc.data()?.bankBranch,
            bankIFSC:doc.data()?.bankIFSC,
            aadharNumber:doc.data()?.aadharNumber,
            permanentAddress:doc.data()?.permanentAddress,
        });
    }
}
