export class Athlete {
    public id: string;
    public fullName: string;

    constructor(
        id: string,
        fullName: string,
    ) {
        this.id = id;
        this.fullName = fullName;
    }

    // Cette méthode doit rester pure dans sa classe (c'est-à-dire qu'elle ne doit pas faire appel au contexte) étant donné qu'elle est utilisée dans le contexte et dans d'autres méthodes de la classe (cf. getRankingProgression)
    public getRanking = (athletes: Athlete[], timestamp: number): number => {
        // La méthode va calculer le ranking de l'athlète courant par rapport à une liste d'athlètes passée en paramètre, pour simplifier, on va juste retourner un nombre aléatoire
        return Math.floor(Math.random() * 100);
    };

    public getRankingProgression = (athletes: Athlete[], timestamp: number, interval: number): number => {
        const startTimestamp = timestamp - interval;
        const endTimestamp = timestamp;

        const startRanking = this.getRanking(athletes, startTimestamp);
        const endRanking = this.getRanking(athletes, endTimestamp);

        return endRanking - startRanking;
    }

    // Plein d'autres méthodes... (getGapToPrevious, getRemainingDistance, etc.)
}