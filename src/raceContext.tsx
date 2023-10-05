import { createContext, FC, useContext, useState } from 'react';
import { Athlete } from './AthleteClass';

const START_DATE = new Date('2021-01-01T00:00:00Z');

interface RaceContextProps {
    /** Set the time of the race (will be used to compute athletes positions, ranking, etc.) */
    setSelectedTime: (time: number) => void;
    /** Set the list of athletes on which the ranking will be computed */
    setSelectedAthletes: (athletes: Athlete[]) => void;
    /** Get athlete current ranking */
    getAthleteCurrentRanking: (athlete: Athlete) => number;
    /** Get athlete current ranking progression on a time interval */
    getAthleteCurrentRankingProgression: (athlete: Athlete, interval: number) => number;
}

const RaceContext = createContext<RaceContextProps>({
    setSelectedTime: () => { },
    setSelectedAthletes: () => { },
    getAthleteCurrentRanking: () => 0,
    getAthleteCurrentRankingProgression: () => 0,
});

interface RaceContextProviderProps {
    children: React.ReactNode;
}

export const RaceContextProvider: FC<RaceContextProviderProps> = ({ children }): JSX.Element => {

    const [selectedAthletes, setSelectedAthletes] = useState<Athlete[]>([]);
    const [selectedTime, setSelectedTime] = useState<number>(START_DATE.getTime());

    // Solution pas tout à fait satisfaisante car chaque méthode de la classe Athlete qui hérite de contexte doit être réécrite ici (pas maintenable à l'échelle car risque d'erreur humaine)
    const getAthleteCurrentRanking = (athlete: Athlete) => athlete.getRanking(selectedAthletes, selectedTime);

    const getAthleteCurrentRankingProgression = (athlete: Athlete, interval: number) => athlete.getRankingProgression(selectedAthletes, selectedTime, interval);

    return (
        <RaceContext.Provider
            value={{
                setSelectedTime,
                setSelectedAthletes,
                getAthleteCurrentRanking,
                getAthleteCurrentRankingProgression,
            }}
        >
            {children}
        </RaceContext.Provider>
    );
};

// Export the context in a hook way
export const useRace = (): RaceContextProps => useContext(RaceContext);
