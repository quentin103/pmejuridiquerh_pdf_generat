import { PdfTemplate } from '../interfaces/pdf-template.interface';

export const reportTemplate: PdfTemplate = {
  name: 'report',
  description: 'Template pour les rapports',
  htmlContent: `
    <div class="document">
      <div class="header">
        <h1>{{title}}</h1>
        <div class="report-meta">
          <div class="meta-item">
            <span class="label">Période:</span>
            <span class="value">{{period}}</span>
          </div>
          <div class="meta-item">
            <span class="label">Généré le:</span>
            <span class="value">{{formatDate generatedDate 'long'}}</span>
          </div>
          <div class="meta-item">
            <span class="label">Généré par:</span>
            <span class="value">{{generatedBy}}</span>
          </div>
        </div>
      </div>
      
      {{#if summary}}
      <div class="summary-section">
        <h2>Résumé exécutif</h2>
        <div class="summary-content">
          <p>{{summary}}</p>
        </div>
      </div>
      {{/if}}
      
      {{#if metrics}}
      <div class="metrics-section">
        <h2>Métriques clés</h2>
        <div class="metrics-grid">
          {{#each metrics}}
          <div class="metric-card">
            <h3>{{name}}</h3>
            <div class="metric-value">{{formatNumber value}}</div>
            <div class="metric-unit">{{unit}}</div>
            {{#if change}}
            <div class="metric-change {{#if (gt change 0)}}positive{{else}}negative{{/if}}">
              {{#if (gt change 0)}}+{{/if}}{{formatNumber change}}%
            </div>
            {{/if}}
          </div>
          {{/each}}
        </div>
      </div>
      {{/if}}
      
      {{#if data}}
      <div class="data-section">
        <h2>Données détaillées</h2>
        <table class="data-table">
          <thead>
            <tr>
              {{#each dataHeaders}}
              <th>{{this}}</th>
              {{/each}}
            </tr>
          </thead>
          <tbody>
            {{#each data}}
            <tr>
              {{#each this}}
              <td>{{this}}</td>
              {{/each}}
            </tr>
            {{/each}}
          </tbody>
        </table>
      </div>
      {{/if}}
      
      {{#if conclusions}}
      <div class="conclusions-section">
        <h2>Conclusions</h2>
        <ul class="conclusions-list">
          {{#each conclusions}}
          <li>{{this}}</li>
          {{/each}}
        </ul>
      </div>
      {{/if}}
      
      <div class="footer">
        <p>Rapport généré automatiquement</p>
      </div>
    </div>
  `,
  cssContent: `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      font-size: 14px;
    }
    
    .document {
      max-width: 1000px;
      margin: 0 auto;
      padding: 30px;
    }
    
    .header {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 3px solid #3498db;
    }
    
    .header h1 {
      color: #2c3e50;
      font-size: 28px;
      margin-bottom: 15px;
    }
    
    .report-meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      background-color: #ecf0f1;
      padding: 15px;
      border-radius: 8px;
    }
    
    .meta-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    
    .label {
      font-weight: bold;
      color: #7f8c8d;
      font-size: 12px;
      text-transform: uppercase;
    }
    
    .value {
      color: #2c3e50;
      font-size: 14px;
    }
    
    .summary-section {
      margin-bottom: 30px;
      background-color: #e8f6f3;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #27ae60;
    }
    
    .summary-section h2 {
      color: #27ae60;
      margin-bottom: 15px;
      font-size: 20px;
    }
    
    .summary-content {
      font-size: 16px;
      line-height: 1.8;
    }
    
    .metrics-section {
      margin-bottom: 30px;
    }
    
    .metrics-section h2 {
      color: #2c3e50;
      margin-bottom: 20px;
      font-size: 20px;
    }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
    
    .metric-card {
      background-color: #ffffff;
      border: 2px solid #bdc3c7;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      transition: all 0.3s ease;
    }
    
    .metric-card:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .metric-card h3 {
      color: #2c3e50;
      font-size: 14px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    
    .metric-value {
      font-size: 32px;
      font-weight: bold;
      color: #3498db;
      margin: 10px 0;
    }
    
    .metric-unit {
      font-size: 12px;
      color: #7f8c8d;
      margin-bottom: 10px;
    }
    
    .metric-change {
      font-size: 14px;
      font-weight: bold;
      padding: 5px 10px;
      border-radius: 15px;
      display: inline-block;
    }
    
    .metric-change.positive {
      background-color: #d4edda;
      color: #155724;
    }
    
    .metric-change.negative {
      background-color: #f8d7da;
      color: #721c24;
    }
    
    .data-section {
      margin-bottom: 30px;
    }
    
    .data-section h2 {
      color: #2c3e50;
      margin-bottom: 15px;
      font-size: 20px;
    }
    
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 13px;
    }
    
    .data-table th,
    .data-table td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    .data-table th {
      background-color: #34495e;
      color: white;
      font-weight: bold;
    }
    
    .data-table tbody tr:nth-child(even) {
      background-color: #f8f9fa;
    }
    
    .data-table tbody tr:hover {
      background-color: #e8f4f8;
    }
    
    .conclusions-section {
      background-color: #fdf2e9;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #f39c12;
      margin-bottom: 30px;
    }
    
    .conclusions-section h2 {
      color: #f39c12;
      margin-bottom: 15px;
      font-size: 20px;
    }
    
    .conclusions-list {
      list-style: none;
      padding: 0;
    }
    
    .conclusions-list li {
      margin-bottom: 12px;
      padding-left: 25px;
      position: relative;
      line-height: 1.6;
    }
    
    .conclusions-list li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #f39c12;
      font-weight: bold;
    }
    
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #bdc3c7;
      color: #7f8c8d;
      font-size: 12px;
    }
    
    @media print {
      .document {
        padding: 20px;
      }
      
      .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .metric-card {
        break-inside: avoid;
      }
    }
  `,
  sampleData: {
    title: 'Rapport Mensuel des Ventes',
    period: 'Janvier 2024',
    generatedDate: new Date(),
    generatedBy: 'Système automatique',
    summary: 'Ce rapport présente une analyse complète des performances commerciales pour le mois de janvier 2024. Les résultats montrent une croissance significative par rapport à la période précédente.',
    metrics: [
      { name: 'Chiffre d\'affaires', value: 125000, unit: '€', change: 12.5 },
      { name: 'Commandes', value: 1250, unit: 'commandes', change: 8.2 },
      { name: 'Taux de conversion', value: 3.2, unit: '%', change: -2.1 },
      { name: 'Panier moyen', value: 100, unit: '€', change: 5.7 }
    ],
    dataHeaders: ['Produit', 'Quantité vendue', 'CA généré', 'Marge'],
    data: [
      ['Laptop Dell XPS', '45', '58 495 €', '35%'],
      ['Souris sans fil', '120', '3 599 €', '45%'],
      ['Clavier mécanique', '75', '6 749 €', '40%'],
      ['Écran 4K', '32', '15 360 €', '30%'],
      ['Webcam HD', '89', '4 450 €', '50%']
    ],
    conclusions: [
      'Excellente performance globale avec une croissance de 12.5% du chiffre d\'affaires',
      'Le taux de conversion nécessite une attention particulière et des actions correctives',
      'Les laptops restent notre produit phare avec la meilleure marge',
      'Recommandation: investir dans l\'optimisation du tunnel de vente',
      'Développer la gamme d\'accessoires qui génèrent des marges intéressantes'
    ]
  },
  options: {
    format: 'A4',
    orientation: 'landscape'
  }
};