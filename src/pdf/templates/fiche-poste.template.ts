import { PdfTemplate } from '../interfaces/pdf-template.interface';

export const fichePosteTemplate: PdfTemplate = {
  name: 'fiche-poste',
  description: 'Template pour les fiches de poste',
  htmlContent: `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fiche de Poste</title>
    </head>
    <body>
        <div class="document">
            <div class="header">
                <h1>FICHE DE POSTE</h1>
            </div>
            
            <div class="content">
                <table class="fiche-table">
                    <tr>
                        <td class="label">Intitulé du poste</td>
                        <td class="value" colspan="3">{{poste.intitule}}</td>
                    </tr>
                    <tr>
                        <td class="label">Titulaire</td>
                        <td class="value" colspan="3">{{poste.titulaire}}</td>
                    </tr>
                    <tr>
                        <td class="label">Dépendance Hiérarchique</td>
                        <td class="value" colspan="3">{{poste.superieur}}</td>
                    </tr>
                    <tr>
                        <td class="label">Date de mise à jour</td>
                        <td class="value" colspan="3">{{formatDate poste.dateMiseAJour}}</td>
                    </tr>
                </table>
                
                <div class="section">
                    <h2>MISSION DU POSTE</h2>
                    <div class="mission-content">
                        {{#each poste.missions}}
                        <p>- {{this}}</p>
                        {{/each}}
                    </div>
                </div>
                
                <div class="section">
                    <h2>ACTIVITÉS PRINCIPALES</h2>
                    <table class="activites-table">
                        <thead>
                            <tr>
                                <th>TÂCHES</th>
                                <th>LIVRABLES / RÉSULTATS ATTENDUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {{#each poste.activites}}
                            <tr>
                                <td>{{this.tache}}</td>
                                <td>{{this.livrable}}</td>
                            </tr>
                            {{/each}}
                        </tbody>
                    </table>
                </div>
                
                <div class="section">
                    <h2>COMPÉTENCES</h2>
                    <div class="competences-grid">
                        <div class="competence-category">
                            <h3>Savoir</h3>
                            <ul>
                                {{#each poste.competences.savoir}}
                                <li>{{this}}</li>
                                {{/each}}
                            </ul>
                        </div>
                        <div class="competence-category">
                            <h3>Savoir Faire</h3>
                            <ul>
                                {{#each poste.competences.savoirFaire}}
                                <li>{{this}}</li>
                                {{/each}}
                            </ul>
                        </div>
                        <div class="competence-category">
                            <h3>Savoir Être</h3>
                            <ul>
                                {{#each poste.competences.savoirEtre}}
                                <li>{{this}}</li>
                                {{/each}}
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <h2>NIVEAU REQUIS ET EXPÉRIENCE PROFESSIONNELLE</h2>
                    <p><strong>Diplôme :</strong> {{poste.profil.diplome}}</p>
                    <p><strong>Années d'expérience :</strong> {{poste.profil.experience}}</p>
                </div>
                
                <div class="section">
                    <h2>AUTRES</h2>
                    <p><strong>Outils Informatiques :</strong> {{poste.autres.outils}}</p>
                    <p><strong>Langues :</strong> {{poste.autres.langues}}</p>
                </div>
                
                <div class="section">
                    <h2>CRITÈRES D'APPRÉCIATION</h2>
                    <ul>
                        {{#each poste.criteres}}
                        <li>{{this}}</li>
                        {{/each}}
                    </ul>
                </div>
                
                <div class="section">
                    <h2>VISA</h2>
                    <div class="visa-grid">
                        <div class="visa-item">
                            <h3>Titulaire du Poste</h3>
                            <p>Nom : {{poste.titulaire}}</p>
                            <p>Date et Signature : ________________</p>
                        </div>
                        <div class="visa-item">
                            <h3>Supérieur Hiérarchique</h3>
                            <p>Nom : {{poste.superieur}}</p>
                            <p>Date et Signature : ________________</p>
                        </div>
                        <div class="visa-item">
                            <h3>Direction</h3>
                            <p>Nom : {{declarant.nom}}</p>
                            <p>Date et Signature : ________________</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `,
  cssContent: `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: 'Arial', sans-serif;
        line-height: 1.4;
        color: #000;
        background-color: #fff;
        font-size: 12px;
    }
    
    .document {
        max-width: 210mm;
        margin: 0 auto;
        padding: 20mm;
        min-height: 297mm;
    }
    
    .header {
        text-align: center;
        margin-bottom: 20px;
        border-bottom: 2px solid #000;
        padding-bottom: 15px;
    }
    
    .header h1 {
        font-size: 18px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .fiche-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }
    
    .fiche-table td {
        border: 1px solid #000;
        padding: 8px;
        vertical-align: top;
    }
    
    .label {
        background-color: #f0f0f0;
        font-weight: bold;
        width: 25%;
    }
    
    .value {
        background-color: #fff;
    }
    
    .section {
        margin-bottom: 20px;
        page-break-inside: avoid;
    }
    
    .section h2 {
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        background-color: #e0e0e0;
        padding: 8px;
        border: 1px solid #000;
        margin-bottom: 10px;
    }
    
    .mission-content {
        border: 1px solid #000;
        padding: 10px;
        background-color: #f9f9f9;
    }
    
    .mission-content p {
        margin-bottom: 8px;
    }
    
    .activites-table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .activites-table th,
    .activites-table td {
        border: 1px solid #000;
        padding: 8px;
        vertical-align: top;
    }
    
    .activites-table th {
        background-color: #d0d0d0;
        font-weight: bold;
        text-align: center;
    }
    
    .competences-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 15px;
    }
    
    .competence-category {
        border: 1px solid #000;
        padding: 10px;
    }
    
    .competence-category h3 {
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
        background-color: #e0e0e0;
        padding: 5px;
        margin-bottom: 10px;
        text-align: center;
    }
    
    .competence-category ul {
        list-style: none;
        padding: 0;
    }
    
    .competence-category li {
        margin-bottom: 5px;
        padding-left: 15px;
        position: relative;
    }
    
    .competence-category li:before {
        content: "- ";
        position: absolute;
        left: 0;
    }
    
    .visa-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 15px;
    }
    
    .visa-item {
        border: 1px solid #000;
        padding: 10px;
        text-align: center;
    }
    
    .visa-item h3 {
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 10px;
        text-decoration: underline;
    }
    
    .visa-item p {
        margin-bottom: 10px;
    }
    
    strong {
        font-weight: bold;
    }
    
    @media print {
        .document {
            padding: 15mm;
        }
        
        @page {
            size: A4;
            margin: 0;
        }
        
        .competences-grid {
            grid-template-columns: 1fr;
        }
        
        .visa-grid {
            grid-template-columns: 1fr;
        }
    }
  `,
  sampleData: {
    poste: {
      intitule: 'Responsable Marketing Digital',
      titulaire: 'Marie DUBOIS',
      superieur: 'Directeur Commercial',
      dateMiseAJour: new Date(),
      missions: [
        'Développer et mettre en œuvre la stratégie marketing digital de l\'entreprise',
        'Gérer les campagnes publicitaires en ligne et les réseaux sociaux',
        'Analyser les performances des actions marketing et proposer des améliorations',
        'Coordonner les équipes créatives et techniques pour les projets digitaux'
      ],
      activites: [
        {
          tache: 'Élaboration de la stratégie marketing digital',
          livrable: 'Plan marketing annuel et roadmap des actions'
        },
        {
          tache: 'Gestion des campagnes publicitaires',
          livrable: 'Rapports de performance et ROI des campagnes'
        },
        {
          tache: 'Animation des réseaux sociaux',
          livrable: 'Contenu engageant et croissance de l\'audience'
        },
        {
          tache: 'Analyse des données marketing',
          livrable: 'Dashboards et recommandations d\'optimisation'
        }
      ],
      competences: {
        savoir: [
          'Connaissance des outils marketing digital (Google Ads, Facebook Ads, etc.)',
          'Maîtrise des analytics web (Google Analytics, etc.)',
          'Connaissance des CMS et outils de création de contenu',
          'Notions de SEO/SEA et référencement naturel'
        ],
        savoirFaire: [
          'Créer et optimiser des campagnes publicitaires en ligne',
          'Analyser et interpréter les données de performance',
          'Rédiger du contenu adapté aux différents canaux digitaux',
          'Gérer un budget marketing et calculer le ROI'
        ],
        savoirEtre: [
          'Créativité et sens de l\'innovation',
          'Capacité d\'adaptation aux évolutions technologiques',
          'Esprit d\'analyse et de synthèse',
          'Travail en équipe et leadership',
          'Résistance au stress et respect des délais'
        ]
      },
      profil: {
        diplome: 'Master en Marketing Digital ou équivalent',
        experience: '3 à 5 ans d\'expérience en marketing digital'
      },
      autres: {
        outils: 'Pack Office, Google Analytics, Facebook Business Manager, Photoshop',
        langues: 'Français (natif), Anglais (courant)'
      },
      criteres: [
        'Atteinte des objectifs de trafic et de conversion',
        'Qualité et créativité des campagnes réalisées',
        'Respect des budgets alloués',
        'Capacité à innover et proposer de nouvelles approches',
        'Collaboration efficace avec les équipes transverses'
      ]
    },
    declarant: {
      nom: 'Jean DUPONT'
    }
  }
};
