import { PdfTemplate } from '../interfaces/pdf-template.interface';

export const attestationCongesMaterniteTemplate: PdfTemplate = {
  name: 'attestation-conges-maternite',
  description: 'Template pour les attestations de congés de maternité',
  htmlContent: `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Attestation de Congés de Maternité</title>
    </head>
    <body>
        <div class="document">
            <div class="header">
                <h1>ATTESTATION DE CONGÉS DE MATERNITÉ</h1>
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
                            {{employe.civilite}} <strong>{{employe.nom}}</strong>, 
                            employée en qualité de <strong>{{employe.poste}}</strong>, 
                            bénéficie d'un congé de maternité de quatorze (14) semaines 
                            du <strong>{{formatDate conge.dateDebut}}</strong> 
                            au <strong>{{formatDate conge.dateFin}}</strong> inclus.
                        </p>
                    </div>
                    
                    <div class="reprise-info">
                        <p>
                            Elle reprendra le service le <strong>{{formatDate conge.dateReprise}}</strong> 
                            à <strong>{{conge.heureReprise}}</strong>.
                        </p>
                    </div>
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
    
    .reprise-info {
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
    reference: 'ATT/MAT/2024/001',
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
      civilite: 'Mme',
      nom: 'MARTIN Marie',
      poste: 'Responsable Marketing'
    },
    conge: {
      dateDebut: new Date('2024-02-15'),
      dateFin: new Date('2024-05-30'),
      dateReprise: new Date('2024-05-31'),
      heureReprise: '08h00'
    },
    lieu: 'Paris',
    dateEmission: new Date()
  }
};