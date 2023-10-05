import { createRoot } from 'react-dom/client';
import { RaceContextProvider } from './raceContext';
import { App } from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

// Render the application
root.render(
    <RaceContextProvider>
        <App />
    </RaceContextProvider>
);