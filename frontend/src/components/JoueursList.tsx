import { useState, useEffect } from 'react';
import axios from 'axios';

interface Joueur {
  id: number;
  nom: string;
  prenom: string;
  poste: string;
}

export default function JoueursList() {
  // états pour gérer les données, le chargement et les erreurs
  const [joueurs, setJoueurs] = useState<Joueur[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // états pour gérer la saisie et l'envoi du formulaire
  const [nouveauJoueur, setNouveauJoueur] = useState({ nom: '', prenom: '', poste: 'Milieu' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    // appel de l'api pour récupérer les joueurs
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

  // envoi des données à l'API et mise à jour de la liste locale
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    setFormError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/joueurs', nouveauJoueur, {
        headers: { 'Content-Type': 'application/ld+json' } 
      });

      // ajoute du nouveau joueur 
      setJoueurs([response.data, ...joueurs]);
      
      setNouveauJoueur({ nom: '', prenom: '', poste: 'Milieu' });
    } catch (err) {
      console.error(err);
      setFormError("Erreur lors de la création du joueur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-xl animate-pulse">Chargement des joueurs... ⏳</div>;
  if (error) return <div className="text-red-500 font-bold bg-red-100 p-4 rounded-lg">{error}</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Effectif de l'équipe</h2>

      {/* Formulaire*/}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">➕ Nouvelle recrue</h3>
        
        {formError && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-lg">{formError}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input 
              type="text" required 
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={nouveauJoueur.prenom}
              onChange={(e) => setNouveauJoueur({...nouveauJoueur, prenom: e.target.value})}
            />
          </div>

          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input 
              type="text" required 
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={nouveauJoueur.nom}
              onChange={(e) => setNouveauJoueur({...nouveauJoueur, nom: e.target.value})}
            />
          </div>

          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
            <select 
              className="w-full border border-gray-300 p-2.5 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={nouveauJoueur.poste}
              onChange={(e) => setNouveauJoueur({...nouveauJoueur, poste: e.target.value})}
            >
              <option value="Gardien">Gardien</option>
              <option value="Défenseur">Défenseur</option>
              <option value="Milieu">Milieu</option>
              <option value="Attaquant">Attaquant</option>
            </select>
          </div>

          <button 
            type="submit" disabled={isSubmitting} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg h-[46px] disabled:bg-blue-400"
          >
            {isSubmitting ? '...' : 'Ajouter'}
          </button>
        </form>
      </div>
      
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