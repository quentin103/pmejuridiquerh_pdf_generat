import { PdfTemplate } from '../interfaces/pdf-template.interface';

export const attestationTravailTemplate: PdfTemplate = {
  name: 'attestation-travail',
  description: 'Template pour les attestations de travail',
  htmlContent: `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Attestation de Travail</title>
    </head>
    <body>
        <div class="document">
            <div class="header">
                <h1>ATTESTATION DE TRAVAIL</h1>
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
                    
                    <div class="employee-info">
                        <p>
                            {{employe.civilite}} <strong>{{employe.nom}}</strong> 
                            né(e) le <strong>{{formatDate employe.dateNaissance}}</strong>, 
                            à <strong>{{employe.lieuNaissance}}</strong>, 
                            matricule CNPS <strong>{{employe.matriculeCNPS}}</strong> 
                            est employé(e) dans notre entreprise 
                            en qualité de <strong>{{employe.poste}}</strong> 
                            depuis le <strong>{{formatDate employe.dateEmbauche}}</strong>.
                        </p>
                    </div>
                    
                    {{#if employe.salaire}}
                    <div class="salaire-info">
                        <p>
                            Son salaire mensuel brut est de <strong>{{formatCurrency employe.salaire}}</strong>.
                        </p>
                    </div>
                    {{/if}}
                    
                    {{#if employe.contratType}}
                    <div class="contrat-info">
                        <p>
                            Il/Elle est titulaire d'un contrat de type <strong>{{employe.contratType}}</strong>.
                        </p>
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
    
    .employee-info {
        margin-bottom: 20px;
        text-align: justify;
    }
    
    .salaire-info {
        margin-bottom: 20px;
        text-align: justify;
    }
    
    .contrat-info {
        margin-bottom: 20px;
        text-align: justify;
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
    reference: 'ATT/TRAV/2024/001',
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
    employe: {
      civilite: 'M.',
      nom: 'MARTIN Pierre',
      dateNaissance: new Date('1985-03-15'),
      lieuNaissance: 'Lyon',
      matriculeCNPS: '123456789',
      poste: 'Comptable',
      dateEmbauche: new Date('2020-01-15'),
      salaire: 450000,
      contratType: 'CDI'
    },
    lieu: 'Paris',
    dateEmission: new Date()
  }
};
