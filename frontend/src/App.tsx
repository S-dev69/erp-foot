import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import JoueursList from './components/JoueursList';
import { Users, FileText, Calendar, Activity } from 'lucide-react';

const Dashboard = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800">Tableau de Bord</h2>
      <span className="text-sm text-gray-500">Dernière mise à jour : 27 Avril 2026</span>
    </div>

    {/* Grille de statistiques type ERP */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Effectif Total', value: '24', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Licences Actives', value: '22', icon: FileText, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Matchs ce mois', value: '4', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Indice de Forme', value: '88%', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-100' },
      ].map((stat, i) => (
        <div key={i} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className={`${stat.bg} p-3 rounded-lg`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Journal d'activité*/}
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 font-bold text-gray-700 bg-gray-50">Activités Récentes</div>
      <div className="p-4 space-y-4">
        <div className="flex items-center text-sm border-l-4 border-blue-500 pl-3 py-1">
          <span className="font-semibold w-24 text-gray-400 italic">Il y a 2h</span>
          <p className="text-gray-600 italic">Action système : <span className="text-blue-600 font-medium">Nouveau joueur synchronisé</span></p>
        </div>
      </div>
    </div>
  </div>
);

// --- COMPOSANTS TEMPORAIRES ---
const Licences = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center py-12">
    <h3 className="text-xl font-bold text-gray-500">📄 Module Licences</h3>
    <p className="text-gray-400 mt-2">En cours de développement...</p>
  </div>
);

const Rencontres = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center py-12">
    <h3 className="text-xl font-bold text-gray-500">🗓️ Module Rencontres</h3>
    <p className="text-gray-400 mt-2">En cours de développement...</p>
  </div>
);

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
            <Route path="/joueurs" element={<JoueursList />} />
            <Route path="/licences" element={<Licences />} />
            <Route path="/rencontres" element={<Rencontres />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;