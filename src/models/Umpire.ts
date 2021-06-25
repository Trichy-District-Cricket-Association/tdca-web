import { DivisionMatches } from './model_types/DivisionMatches';
import { TypeMatches } from './model_types/TypeMatches';

export default class Umpire {
    /** Document id of the Umpire document. */
    docId?: string;

    umpireId: string;

    umpireName: string;

    avatarUrl?: string;

    emailId: string;

    divisionMatches: DivisionMatches;

    typeMatches: TypeMatches;

    totalMatches: number;

    totalDue: number;

    totalPaid: number;

    balanceAmount: number;

    panel: string;

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
        umpireId,
        umpireName,
        avatarUrl,
        emailId,
        divisionMatches,
        typeMatches,
        totalMatches,
        totalDue,
        totalPaid,
        balanceAmount,
        panel,
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
    }: Umpire) {
        if (docId) this.docId = docId;
        this.umpireId = umpireId;
        this.umpireName = umpireName;
        if (avatarUrl) this.avatarUrl = avatarUrl;
        this.emailId = emailId;
        this.divisionMatches = divisionMatches;
        this.typeMatches = typeMatches;
        this.totalMatches = totalMatches;
        this.totalDue = totalDue;
        this.totalPaid = totalPaid;
        this.balanceAmount = balanceAmount;
        this.panel = panel;
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
