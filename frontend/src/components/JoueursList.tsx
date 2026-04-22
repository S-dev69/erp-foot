import { useState, useEffect } from 'react';
import axios from 'axios';

interface Joueur {
  id: number;
  nom: string;
  prenom: string;
  poste: string;
}

export default function JoueursList() {
  // création de 3 états pour gérer les données, le chargement et les erreurs
  const [joueurs, setJoueurs] = useState<Joueur[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // appelle de l'api pour récupérer les joueurs
    axios.get('http://127.0.0.1:8000/api/joueurs')
      .then((response) => {
        const data = response.data.member || response.data['hydra:member'] || [];
        setJoueurs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API :", err);
        setError("Impossible de charger les joueurs. Le serveur Symfony est-il allumé ?");
        setLoading(false);
      });
  }, []);

  // 4. L'affichage (le visuel)
  if (loading) return <div className="text-xl animate-pulse">Chargement des joueurs... ⏳</div>;
  if (error) return <div className="text-red-500 font-bold bg-red-100 p-4 rounded-lg">{error}</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Effectif de l'équipe</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {joueurs.map((joueur) => (
          <div key={joueur.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-gray-900">
              {joueur.prenom} <span className="uppercase">{joueur.nom}</span>
            </h3>
            <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              ⚽ {joueur.poste}
            </span>
          </div>
        ))}
        
        {joueurs.length === 0 && (
          <p className="col-span-full text-gray-500 italic">Aucun joueur trouvé dans la base de données.</p>
        )}
      </div>
    </div>
  );
}