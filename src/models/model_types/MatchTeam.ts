export type MatchTeam = {
    
    teamId: string;

    teamName: string;

    playingEleven: {
        batsman: string[],
        bowler: string[],
        allRounder: string[],
        wicketKeeper: string[],
        captain: string
    }
    onBench: string[];
};
