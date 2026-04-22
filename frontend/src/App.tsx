import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';

// pages temporaires pour tester la navigation
const Dashboard = () => <h2 className="text-3xl font-bold">Tableau de bord</h2>;
const Joueurs = () => <h2 className="text-3xl font-bold">Liste des Joueurs</h2>;
const Licences = () => <h2 className="text-3xl font-bold">Gestion des Licences</h2>;
const Rencontres = () => <h2 className="text-3xl font-bold">Calendrier des Rencontres</h2>;

function App() {
  return (
    <BrowserRouter>
      {/* Le conteneur principal flexbox : Sidebar à gauche, contenu à droite */}
      <div className="flex min-h-screen bg-gray-100">
        
        {/* menu latéral */}
        <Sidebar />

        {/* La zone de contenu principal */}
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/joueurs" element={<Joueurs />} />
            <Route path="/licences" element={<Licences />} />
            <Route path="/rencontres" element={<Rencontres />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;