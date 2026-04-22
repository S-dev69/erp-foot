# 🚀 Roadmap ERP Foot (MVP)

## 📌 Étape 1 : Joueurs (En cours)
- [x] Afficher la liste des joueurs (GET)
- [x] Ajouter un joueur via formulaire (POST)
- [ ] Supprimer un joueur (DELETE)

## 📌 Étape 2 : Licences (Relation 1-to-1)
- [ ] Créer le composant `LicencesList` et l'ajouter au menu.
- [ ] Afficher la liste des licences avec les joueurs associés (GET).
- [ ] Formulaire : Attribuer une nouvelle licence (numéro, type) à un joueur sans licence (POST).

## 📌 Étape 3 : Rencontres (Relation Many-to-Many)
- [ ] Créer le composant `RencontresList` et l'ajouter au menu.
- [ ] Formulaire : Créer un match (Date, Adversaire, Lieu) (POST).
- [ ] Interface avancée : Sélectionner plusieurs joueurs dans l'effectif pour composer la feuille de match (PUT/POST relation).

## 📌 Étape 4 : Statistiques et Blessures (Logique métier)
- [ ] Permettre de déclarer un joueur blessé depuis sa carte profil (Statut indisponible).
- [ ] Ajouter des statistiques (buts, cartons) à un joueur après un match.

## 📌 Étape 5 : Finitions Pro (UX/UI)
- [ ] Remplacer les `alert()` par des notifications "Toast" (ex: react-hot-toast).
- [ ] Créer un vrai Tableau de bord (Dashboard) sur la page d'accueil avec des statistiques globales (nb joueurs, prochain match).