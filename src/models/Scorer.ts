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

    totalMatches: number;

    totalDue: number;

    totalPaid: number;

    balanceAmount: number;

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
        totalDue,
        totalPaid,
        balanceAmount,
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
        this.totalDue = totalDue;
        this.totalPaid = totalPaid;
        this.balanceAmount = balanceAmount;
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
}
