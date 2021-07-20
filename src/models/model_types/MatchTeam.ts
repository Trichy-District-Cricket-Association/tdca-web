export type MatchTeam = {
    
    teamId: string;

    teamName: string;

    teamLogo: string;

    teamColor: string;

    playingEleven: {
        batsman: string[],
        bowler: string[],
        allRounder: string[],
        wicketKeeper: string[],
        captain: string
    }
    onBench: string[];
    
};
