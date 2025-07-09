import { PdfTemplate } from '../interfaces/pdf-template.interface';

export const invoiceTemplate: PdfTemplate = {
  name: 'invoice',
  description: 'Template pour les factures',
  htmlContent: `
    <div class="document">
      <div class="header">
        <div class="company-info">
          <h1>{{company.name}}</h1>
          <p>{{company.address}}</p>
          <p>Tél: {{company.phone}} | Email: {{company.email}}</p>
        </div>
        <div class="invoice-info">
          <h2>FACTURE</h2>
          <div class="invoice-details">
            <p><strong>N°:</strong> {{invoiceNumber}}</p>
            <p><strong>Date:</strong> {{formatDate date}}</p>
            <p><strong>Échéance:</strong> {{formatDate dueDate}}</p>
          </div>
        </div>
      </div>
      
      <div class="client-section">
        <h3>Facturé à:</h3>
        <div class="client-info">
          <p><strong>{{client.name}}</strong></p>
          <p>{{client.address}}</p>
          {{#if client.email}}
          <p>{{client.email}}</p>
          {{/if}}
        </div>
      </div>
      
      <div class="services-section">
        <table class="services-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantité</th>
              <th>Taux</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            {{#each items}}
            <tr>
              <td>{{description}}</td>
              <td class="text-center">{{quantity}}</td>
              <td class="text-right">{{formatCurrency rate}}</td>
              <td class="text-right">{{formatCurrency amount}}</td>
            </tr>
            {{/each}}
          </tbody>
        </table>
      </div>
      
      <div class="totals-section">
        <div class="totals">
          <div class="total-line">
            <span>Sous-total:</span>
            <span>{{formatCurrency subtotal}}</span>
          </div>
          <div class="total-line">
            <span>TVA (20%):</span>
            <span>{{formatCurrency tax}}</span>
          </div>
          <div class="total-line total-final">
            <span>Total à payer:</span>
            <span>{{formatCurrency total}}</span>
          </div>
        </div>
      </div>
      
      <div class="footer">
        <p>Merci pour votre confiance!</p>
        <p><em>Paiement à effectuer dans les 30 jours</em></p>
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
    }
    
    .document {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 40px;
    }
    
    .company-info h1 {
      color: #2c3e50;
      font-size: 24px;
      margin-bottom: 10px;
    }
    
    .company-info p {
      color: #7f8c8d;
      font-size: 14px;
      margin-bottom: 5px;
    }
    
    .invoice-info {
      text-align: right;
      background-color: #3498db;
      color: white;
      padding: 20px;
      border-radius: 8px;
      min-width: 200px;
    }
    
    .invoice-info h2 {
      font-size: 24px;
      margin-bottom: 15px;
    }
    
    .invoice-details p {
      margin-bottom: 8px;
      font-size: 14px;
    }
    
    .client-section {
      margin-bottom: 30px;
    }
    
    .client-section h3 {
      color: #2c3e50;
      margin-bottom: 10px;
      font-size: 18px;
    }
    
    .client-info {
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
    }
    
    .client-info p {
      margin-bottom: 5px;
    }
    
    .services-section {
      margin-bottom: 30px;
    }
    
    .services-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    
    .services-table th,
    .services-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    .services-table th {
      background-color: #34495e;
      color: white;
      font-weight: bold;
    }
    
    .services-table tbody tr:hover {
      background-color: #f8f9fa;
    }
    
    .text-center {
      text-align: center;
    }
    
    .text-right {
      text-align: right;
    }
    
    .totals-section {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 40px;
    }
    
    .totals {
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      min-width: 300px;
      border: 1px solid #ddd;
    }
    
    .total-line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 5px 0;
    }
    
    .total-final {
      border-top: 2px solid #e74c3c;
      padding-top: 10px;
      font-weight: bold;
      font-size: 18px;
      color: #e74c3c;
    }
    
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #bdc3c7;
      color: #7f8c8d;
    }
    
    .footer p {
      margin-bottom: 10px;
    }
    
    .footer em {
      font-size: 12px;
    }
  `,
  sampleData: {
    invoiceNumber: 'INV-2024-001',
    date: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    company: {
      name: 'Mon Entreprise',
      address: '123 Rue du Commerce, 75001 Paris',
      phone: '+33 1 23 45 67 89',
      email: 'contact@entreprise.com'
    },
    client: {
      name: 'Client ABC',
      address: '789 Boulevard Client, 75002 Paris',
      email: 'client@abc.com'
    },
    items: [
      { description: 'Développement site web', quantity: 1, rate: 2500, amount: 2500 },
      { description: 'Maintenance mensuelle', quantity: 3, rate: 150, amount: 450 },
      { description: 'Formation utilisateur', quantity: 2, rate: 300, amount: 600 }
    ],
    subtotal: 3550,
    tax: 710,
    total: 4260
  }
};