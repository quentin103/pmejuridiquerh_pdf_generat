import { PdfTemplate } from '../interfaces/pdf-template.interface';

export const attestationStageEcoleTemplate: PdfTemplate = {
  name: 'attestation-stage-ecole',
  description: 'Template pour les attestations de stage école',
  htmlContent: `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Attestation de Stage-École</title>
    </head>
    <body>
        <div class="document">
            <div class="header">
                <h1>ATTESTATION DE STAGE-ÉCOLE</h1>
                {{#if reference}}
                <div class="reference">
                    <span class="label">N/Ref :</span> {{reference}}
                </div>
                {{/if}}
            </div>
            
            <div class="content">
                <div class="declarant-section">
                    <p>
                        Je soussigné(e), <strong>{{declarant.nom}}</strong>, 
                        {{declarant.fonction}} de {{entreprise.nom}} sise à {{entreprise.adresse}}, 
                        {{#if entreprise.bp}}BP {{entreprise.bp}}{{/if}} ;
                    </p>
                </div>
                
                <div class="attestation-section">
                    <h2>Atteste que :</h2>
                    
                    <div class="stagiaire-info">
                        <p>
                            {{stagiaire.civilite}} <strong>{{stagiaire.nom}}</strong> 
                            né(e) le <strong>{{formatDate stagiaire.dateNaissance}}</strong>, 
                            à <strong>{{stagiaire.lieuNaissance}}</strong>, 
                            a effectué au sein de notre entreprise, un stage-école, 
                            du <strong>{{formatDate stage.dateDebut}}</strong> 
                            au <strong>{{formatDate stage.dateFin}}</strong>, 
                            aux fins de la validation du diplôme : 
                            <strong>{{stage.diplome}}</strong>.
                        </p>
                    </div>
                    
                    {{#if stage.description}}
                    <div class="description-stage">
                        <p><strong>Description du stage :</strong></p>
                        <p>{{stage.description}}</p>
                    </div>
                    {{/if}}
                    
                    {{#if stage.evaluation}}
                    <div class="evaluation-stage">
                        <p><strong>Évaluation :</strong> {{stage.evaluation}}</p>
                    </div>
                    {{/if}}
                </div>
                
                <div class="footer-section">
                    <p>
                        En foi de quoi, la présente attestation lui est délivrée 
                        pour servir et valoir ce que de droit.
                    </p>
                    
                    <div class="signature-section">
                        <div class="lieu-date">
                            <p>
                                Fait à <strong>{{lieu}}</strong>, 
                                le <strong>{{formatDate dateEmission}}</strong>
                            </p>
                        </div>
                        
                        <div class="signature">
                            <p><strong>{{declarant.civilite}} {{declarant.nom}}</strong></p>
                            <p class="fonction">{{declarant.fonction}}</p>
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
        font-family: 'Times New Roman', serif;
        line-height: 1.6;
        color: #000;
        background-color: #fff;
    }
    
    .document {
        max-width: 210mm;
        margin: 0 auto;
        padding: 30mm;
        min-height: 297mm;
    }
    
    .header {
        text-align: center;
        margin-bottom: 40px;
        border-bottom: 2px solid #000;
        padding-bottom: 20px;
    }
    
    .header h1 {
        font-size: 18px;
        font-weight: bold;
        text-decoration: underline;
        margin-bottom: 20px;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .reference {
        text-align: left;
        font-size: 14px;
        margin-bottom: 15px;
    }
    
    .reference .label {
        text-decoration: underline;
        font-weight: bold;
    }
    
    .content {
        font-size: 14px;
        line-height: 1.8;
    }
    
    .declarant-section {
        margin-bottom: 30px;
        text-align: justify;
    }
    
    .attestation-section {
        margin-bottom: 40px;
    }
    
    .attestation-section h2 {
        font-size: 16px;
        font-weight: bold;
        text-decoration: underline;
        margin-bottom: 20px;
    }
    
    .stagiaire-info {
        margin-bottom: 25px;
        text-align: justify;
    }
    
    .description-stage {
        margin-bottom: 20px;
        text-align: justify;
    }
    
    .description-stage p:first-child {
        font-weight: bold;
        margin-bottom: 10px;
    }
    
    .evaluation-stage {
        margin-bottom: 20px;
        text-align: justify;
        font-style: italic;
    }
    
    .footer-section {
        margin-top: 40px;
    }
    
    .footer-section p {
        text-align: justify;
        margin-bottom: 40px;
    }
    
    .signature-section {
        margin-top: 60px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    
    .lieu-date {
        flex: 1;
        text-align: left;
    }
    
    .signature {
        flex: 1;
        text-align: right;
        margin-left: 20px;
    }
    
    .signature p {
        margin-bottom: 10px;
        font-weight: bold;
    }
    
    .signature .fonction {
        text-decoration: underline;
        font-style: italic;
    }
    
    strong {
        font-weight: bold;
    }
    
    @media print {
        .document {
            padding: 20mm;
        }
        
        @page {
            size: A4;
            margin: 0;
        }
    }
  `,
  sampleData: {
    reference: 'ATT/STAGE/2024/001',
    declarant: {
      civilite: 'M.',
      nom: 'DUPONT Jean',
      fonction: 'Directeur Général'
    },
    entreprise: {
      nom: 'ENTREPRISE ABC',
      adresse: '123 Avenue de la République, 75001 Paris',
      bp: '12345'
    },
    stagiaire: {
      civilite: 'M.',
      nom: 'DURAND Paul',
      dateNaissance: new Date('2000-03-15'),
      lieuNaissance: 'Lyon'
    },
    stage: {
      dateDebut: new Date('2024-06-01'),
      dateFin: new Date('2024-08-31'),
      diplome: 'Master en Informatique',
      description: 'Stage en développement web et mobile, participation aux projets de l\'équipe technique, apprentissage des technologies React et Node.js.',
      evaluation: 'Très satisfaisante'
    },
    lieu: 'Paris',
    dateEmission: new Date()
  }
};