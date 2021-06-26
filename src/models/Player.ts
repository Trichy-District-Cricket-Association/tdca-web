import firebase from 'firebase';
import { BattingStats, BowlingStats } from './model_types/PlayerStats';

export default class Player {
    /** Document id of the player document. */
    docId?: string;

    playerId: string;

    teamId: string;

    playerName: string;

    avatarUrl?: string;

    emailId: string;

    dateOfBirth: Date;

    fatherName: string;

    primaryContact: string;

    aadharNumber: string;

    voterId: string;

    rationCardNumber: string;

    drivingLicense: string;

    panCardNumber: string;

    passport: string;

    battingStats: BattingStats;

    bowlingStats: BowlingStats;

    constructor({
        docId,
        playerId,
        teamId,
        playerName,
        avatarUrl,
        emailId,
        dateOfBirth,
        primaryContact,
        fatherName,
        aadharNumber,
        voterId,
        rationCardNumber,
        drivingLicense,
        panCardNumber,
        passport,
        battingStats,
        bowlingStats,
    }: Player) {
        if (docId) this.docId = docId;
        this.playerId = playerId;
        this.teamId = teamId;
        this.playerName = playerName;
        if (avatarUrl) this.avatarUrl = avatarUrl;
        this.emailId = emailId;
        this.dateOfBirth = dateOfBirth;
        this.primaryContact = primaryContact;
        this.fatherName = fatherName;
        this.aadharNumber = aadharNumber;
        this.rationCardNumber = rationCardNumber;
        this.voterId = voterId;
        this.drivingLicense = drivingLicense;
        this.panCardNumber = panCardNumber;
        this.passport = passport;
        this.battingStats = battingStats;
        this.bowlingStats = bowlingStats;
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): Player {
        return new Player({
            docId: doc.id,
            playerId: doc.data()?.playerId,
            teamId: doc.data()?.teamId,
            playerName: doc.data()?.playerName,
            avatarUrl: doc.data()?.avatarUrl,
            emailId: doc.data()?.emailId,
            dateOfBirth: doc.data()?.dateOfBirth,
            primaryContact: doc.data()?.primaryContact,
            fatherName: doc.data()?.fatherName,
            aadharNumber: doc.data()?.aadharNumber,
            rationCardNumber: doc.data()?.rationCardNumber,
            voterId: doc.data()?.rationCardNumber,
            drivingLicense: doc.data()?.drivingLicense,
            panCardNumber: doc.data()?.panCardNumber,
            passport: doc.data()?.passport,
            battingStats: doc.data()?.battingStats,
            bowlingStats: doc.data()?.bowlingStats,
        });
    }
}
