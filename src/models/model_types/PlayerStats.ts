export type BattingStats = {
    numberOfMatches: number;

    numberOfInnings: number;

    totalRuns: number;

    highestRuns: number;

    numberOfFifties: number;

    numberOfHundreds: number;
};

export type BowlingStats = {
    numberOfOvers: number;

    noOfMaidens: number;

    runsGiven: number;

    wicketsTaken: number;

    bestBowling: {
        runsGiven: number;

        wicketsTaken: number;
    };

    fiveWicketHaul: number;
};
