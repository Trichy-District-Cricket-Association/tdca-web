import firebase from 'firebase';
import { DivisionMatches } from './model_types/DivisionMatches';
import { TypeMatches } from './model_types/TypeMatches';

export default class Scorer {
    /** Document id of the scorer document. */
    docId?: string;

    /** scorer Id of scorer document. */
    scorerId?: string;

    /** Name of the scorer */
    scorerName?: string;

    /**scorer Photo Url */
    avatarUrl?: string;

    /** Email Id of scorer*/
    emailId?: string;

    /** Division Matches of scorer*/
    divisionMatches?: DivisionMatches;

    /** types of matches for scorer */
    typeMatches?: TypeMatches;

    /** total Matches of scorer*/
    totalMatches?: number;

    /** Gpay of phonePay Number of scorer*/
    panel?: string;

    /** Date of Birth of scorer */
    dateOfBirth?: Date;

    /** Primary Mobile Number of scorer */
    primaryContact?: string;

    /** Secondary Mobile Number of scorer */
    secondaryContact?: string;

    /** Gpay of phonePay Number of scorer*/
    payPhoneNumber?: string;

    /** Bank Account Number of scorer*/
    bankAccountNumber?: string;

    /** Name of the Bank */
    bankName?: string;

    /** Branch the bank */
    bankBranch?: string;

    /**IFSC code of the bank */
    bankIFSC?: string;

    /**Aadhar Number of the scorer */
    aadharNumber?: string;

    /**Permanent Address of the scorer */
    address?: string;

    // totalDue: number;

    // totalPaid: number;

    // balanceAmount: number;
    handleScorer({ field, value }: { field: string; value: string }): void {
        if (field == 'scorerId') this.scorerId = value;
        if (field == 'scorerName') this.scorerName = value;
        if (field == 'emailId') this.emailId = value;
        if (field == 'dateOfBirth') this.dateOfBirth = new Date(value);
        if (field == 'primaryContact') this.primaryContact = value;
        if (field == 'secondaryContact') this.secondaryContact = value;
        if (field == 'payPhoneNumber') this.payPhoneNumber = value;
        if (field == 'bankAccountNumber') this.bankAccountNumber = value;
        if (field == 'bankName') this.bankName = value;
        if (field == 'bankBranch') this.bankBranch = value;
        if (field == 'bankIFSC') this.bankIFSC = value;
        if (field == 'address') this.address = value;
        if (field == 'aadharNumber') this.aadharNumber = value;

        /**Matches Field */
        if (field == 'panel') this.panel = value;
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
        if (field == 'typeMatches_institutionMatch') this.typeMatches!.institutionMatch= parseInt(value);
        if (field == 'typeMatches_privateMatch') this.typeMatches!.privateMatch = parseInt(value);
    }
    set setAvatar(url: string) {
        this.avatarUrl = url;
    }

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
        bankAccountNumber,
        bankName,
        bankBranch,
        bankIFSC,
        aadharNumber,
        address,
    }: {
        docId?: string;
        scorerId?: string;
        scorerName?: string;
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
        this.scorerId = scorerId ?? '';
        this.scorerName = scorerName ?? '';
        if (avatarUrl) this.avatarUrl = avatarUrl;
        this.emailId = emailId ?? '';
        this.divisionMatches =
            divisionMatches ??
            <DivisionMatches>{
                one: 0,
                two: 0,
                three: 0,
                four: 0,
                five: 0,
            };
        this.typeMatches =
            typeMatches ??
            <TypeMatches>{
                combinedDistrictMatch: 0,
                institutionMatch: 0,
                interDistrictMatch: 0,
                knockoutMatch: 0,
                leagueMatch: 0,
                privateMatch: 0,
                schoolMatch: 0,
                tncaMatch: 0,
            };
        this.totalMatches = totalMatches ?? 0;
        this.panel = panel ?? '';
        {
            /**  
        this.totalDue = totalDue;
        this.totalPaid = totalPaid;
        this.balanceAmount = balanceAmount;*/
        }
        if (dateOfBirth) this.dateOfBirth = dateOfBirth;
        this.primaryContact = primaryContact ?? '';
        this.secondaryContact = secondaryContact ?? '';
        this.payPhoneNumber = payPhoneNumber ?? '';
        this.bankAccountNumber = bankAccountNumber ?? '';
        this.bankName = bankName ?? '';
        this.bankBranch = bankBranch ?? '';
        this.bankIFSC = bankIFSC ?? '';
        this.aadharNumber = aadharNumber ?? '';
        this.address = address ?? '';
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): Scorer {
        return new Scorer({
            docId: doc.id,
            scorerId: doc.data()?.scorerId,
            scorerName: doc.data()?.scorerName,
            avatarUrl: doc.data()?.avatarUrl,
            emailId: doc.data()?.emailId,
            divisionMatches: doc.data()?.divisionMatches,
            typeMatches: doc.data()?.typeMatches,
            panel: doc.data()?.panel,
            totalMatches: doc.data()?.totalMatches,
            // totalDue:doc.data()?.totalDue,
            // totalPaid:doc.data()?.totalPaid,
            // balanceAmount:doc.data()?.balanceAmount,
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
