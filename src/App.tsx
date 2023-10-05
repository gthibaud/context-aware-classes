import { generateId } from "@owlgrid-dev/generators";
import { Athlete } from "./AthleteClass";
import { useRace } from "./raceContext";

const athletes = [
    new Athlete(generateId(), 'John Doe'),
    new Athlete(generateId(), 'Jane Doe'),
    new Athlete(generateId(), 'Foo Bar'),
];

export const App = () => {
    const { getAthleteCurrentRanking } = useRace();

    return (
        <div>
            <h1>Athletes ranking</h1>
            <div>
                <h3>Actions (not working on example)</h3>
                <button type="button">Change time at which the ranking is computed.</button>
                <button type="button">Change the list of athletes on which the ranking is computed.</button>
            </div>
            <div>
                <h3>Ranking</h3>
                <ul>
                    {athletes.map((athlete) => (
                        <li key={athlete.id}>
                            {athlete.fullName} - ranking: {getAthleteCurrentRanking(athlete)} (positions gained on last 24h: {athlete.getRankingProgression(athletes, Date.now(), 24 * 60 * 60 * 1000)})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}