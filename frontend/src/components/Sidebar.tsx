import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  // Fonction pour gérer la couleur du lien actif
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 rounded-lg transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
    }`;

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-blue-400">⚽ ERP Foot</h1>
      </div>

      <nav className="flex-1 space-y-2">
        <NavLink to="/" className={linkClass}>🏠 Tableau de bord</NavLink>
        <NavLink to="/joueurs" className={linkClass}>👟 Joueurs</NavLink>
        <NavLink to="/licences" className={linkClass}>📄 Licences</NavLink>
        <NavLink to="/rencontres" className={linkClass}>🏟️ Rencontres</NavLink>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-700 text-sm text-gray-500 text-center">
        Saison 2026-2027
      </div>
    </aside>
  );
}