export type BattingStats = {

    NumberOfmatches : number;
    
    numberOfInnings: number;
    
    totalRuns: number;

    HighestRuns: number;

    numberOfFifties: number;

    numberOfHundreds: number;
};

export type BowlingStats ={

    NumberOfOvers: number;

    NoOfMaidens: number;

    runsGiven: number;

    wicketsTaken: number;

    bestBowling:{

        runsGiven: number;

        wicketsTaken: number;
    };

    fiveWicketHaul: number;
}