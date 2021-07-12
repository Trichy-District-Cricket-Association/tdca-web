import firebase from 'firebase';
import { BattingStats, BowlingStats } from './model_types/PlayerStats';

export default class Player {
    /** Document id of the player document. */
    docId?: string;

    playerId?: string;

    teamName?: string;

    teamId?: string;

    playerName?: string;

    avatarUrl?: string;

    emailId?: string;

    dateOfBirth?: Date;

    fatherName?: string;

    primaryContact?: string;

    registerationFee?: string;

    dateOfRegisteration?:Date;

    aadharNumber?: string;

    voterId?: string;

    rationCardNumber?: string;

    drivingLicense?: string;

    panCardNumber?: string;

    passport?: string;

    battingStats?: BattingStats;

    bowlingStats?: BowlingStats;

    handlePlayer({ field, value }: { field: string; value: string }): void {
        if (field == 'playerName') this.playerName = value;
        if (field == 'playerId') this.playerId = value;
        if (field == 'teamName') this.teamName = value;
        if (field == 'teamId') this.teamId = value;
        if (field == 'emailId') this.emailId = value;
        if (field == 'dateOfBirth') this.dateOfBirth = new Date(value);
        if (field == 'fatherName') this.fatherName = value;
        if (field == 'primaryContact') this.primaryContact = value;
        if (field == 'registerationFee') this.registerationFee = value;
        if (field == 'dateOfRegisteration') this.dateOfRegisteration = new Date(value);
        if (field == 'aadharNumber') this.aadharNumber = value;
        if (field == 'voterId') this.voterId = value;
        if (field == 'rationCardNumber') this.rationCardNumber = value;
        if (field == 'drivingLicense') this.drivingLicense = value;
        if (field == 'panCardNumber') this.panCardNumber = value;
        if (field == 'passport') this.passport = value;

        if (field == 'battingStats_numberOfMatches') this.battingStats!.numberOfMatches = parseInt(value);
        if (field == 'battingStats_numberOfInnings') this.battingStats!.numberOfInnings = parseInt(value);
        if (field == 'battingStats_totalRuns') this.battingStats!.totalRuns = parseInt(value);
        if (field == 'battingStats_highestScore') this.battingStats!.highestScore = parseInt(value);
        if (field == 'battingStats_numberOfFifties') this.battingStats!.numberOfFifties = parseInt(value);
        if (field == 'battingStats_numberOfHundreds') this.battingStats!.numberOfHundreds = parseInt(value);

        if (field == 'bowlingStats_numberOfOvers') this.bowlingStats!.numberOfOvers = parseInt(value);
        if (field == 'bowlingStats_noOfMaidens') this.bowlingStats!.noOfMaidens = parseInt(value);
        if (field == 'bowlingStats_runsGiven') this.bowlingStats!.runsGiven = parseInt(value);
        if (field == 'bowlingStats_wicketsTaken') this.bowlingStats!.wicketsTaken = parseInt(value);
        if (field == 'bowlingStats_bestBowling_runsGiven') this.bowlingStats!.bestBowling!.runsGiven = parseInt(value);
        if (field == 'bowlingStats_bestBowling_wicketsTaken')
            this.bowlingStats!.bestBowling!.wicketsTaken = parseInt(value);
        if (field == 'bowlingStats_fiveWicketHaul') this.bowlingStats!.fiveWicketHaul = parseInt(value);
    }
    set setAvatar(url: string) {
        this.avatarUrl = url;
    }

    constructor({
        docId,
        playerId,
        teamName,
        teamId,
        playerName,
        avatarUrl,
        emailId,
        dateOfBirth,
        
        primaryContact,
        registerationFee,
        dateOfRegisteration,
        fatherName,
        aadharNumber,
        voterId,
        rationCardNumber,
        drivingLicense,
        panCardNumber,
        passport,
        battingStats,
        bowlingStats,
    }: {
        docId?: string;
        playerId?: string;
        teamName?: string;
        teamId?: string;
        playerName?: string;
        avatarUrl?: string;
        emailId?: string;
        dateOfBirth?: Date;
        fatherName?: string;
        primaryContact?: string;
        registerationFee?: string;

    dateOfRegisteration?:Date;
        aadharNumber?: string;
        voterId?: string;
        rationCardNumber?: string;
        drivingLicense?: string;
        panCardNumber?: string;
        passport?: string;
        battingStats?: BattingStats;
        bowlingStats?: BowlingStats;
    }) {
        if (docId) this.docId = docId;
        this.playerId = playerId ?? '';
        this.teamName = teamName ?? '';
        this.teamId = teamId ?? '';
        this.playerName = playerName ?? '';
        if (avatarUrl) this.avatarUrl = avatarUrl;
        this.emailId = emailId ?? '';
        this.dateOfBirth = dateOfBirth;
        this.primaryContact = primaryContact ?? '';
        this.registerationFee = registerationFee ?? '';
        this.dateOfRegisteration = dateOfRegisteration;
        this.fatherName = fatherName ?? '';
        this.aadharNumber = aadharNumber ?? '';
        this.rationCardNumber = rationCardNumber ?? '';
        this.voterId = voterId ?? '';
        this.drivingLicense = drivingLicense ?? '';
        this.panCardNumber = panCardNumber ?? '';
        this.passport = passport ?? '';
        this.battingStats = battingStats ?? {
            numberOfMatches: 0,
            numberOfInnings: 0,
            totalRuns: 0,
            highestScore: 0,
            numberOfFifties: 0,
            numberOfHundreds: 0,
        };
        this.bowlingStats = bowlingStats ?? {
            numberOfOvers: 0,
            noOfMaidens: 0,
            runsGiven: 0,
            wicketsTaken: 0,
            bestBowling: { runsGiven: 0, wicketsTaken: 0 },
            fiveWicketHaul: 0,
        };
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): Player {
        return new Player({
            docId: doc.id,
            playerId: doc.data()?.playerId,
            teamName: doc.data()?.teamName,
            teamId: doc.data()?.teamId,
            playerName: doc.data()?.playerName,
            avatarUrl: doc.data()?.avatarUrl,
            emailId: doc.data()?.emailId,
            dateOfBirth: new Date(doc.data()?.dateOfBirth),
            primaryContact: doc.data()?.primaryContact,
            registerationFee: doc.data()?.registerationFee,
            dateOfRegisteration: new Date(doc.data()?.dateOfRegisteration),
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
