import { PdfTemplate } from '../interfaces/pdf-template.interface';

export const orderTemplate: PdfTemplate = {
  name: 'order',
  description: 'Template pour les commandes',
  htmlContent: `
    <div class="document">
      <div class="header">
        <h1>Commande #{{orderNumber}}</h1>
        <div class="order-info">
          <div class="order-date">Date: {{formatDate orderDate}}</div>
          <div class="order-status status-{{status}}">{{status}}</div>
        </div>
      </div>
      
      <div class="customer-section">
        <h2>Informations client</h2>
        <div class="customer-info">
          <div class="customer-details">
            <p><strong>{{customerName}}</strong></p>
            <p>{{customerEmail}}</p>
            {{#if customerPhone}}
            <p>{{customerPhone}}</p>
            {{/if}}
          </div>
          <div class="shipping-address">
            <h3>Adresse de livraison</h3>
            <p>{{shippingAddress}}</p>
          </div>
        </div>
      </div>
      
      <div class="items-section">
        <h2>Articles commandés</h2>
        <table class="items-table">
          <thead>
            <tr>
              <th>Article</th>
              <th>Quantité</th>
              <th>Prix unitaire</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {{#each items}}
            <tr>
              <td>{{name}}</td>
              <td class="text-center">{{quantity}}</td>
              <td class="text-right">{{formatCurrency price}}</td>
              <td class="text-right">{{formatCurrency total}}</td>
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
            <span>TVA:</span>
            <span>{{formatCurrency tax}}</span>
          </div>
          <div class="total-line total-final">
            <span>Total:</span>
            <span>{{formatCurrency total}}</span>
          </div>
        </div>
      </div>
      
      <div class="footer">
        <p>Merci pour votre commande!</p>
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
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #3498db;
    }
    
    .header h1 {
      color: #2c3e50;
      font-size: 28px;
      margin-bottom: 10px;
    }
    
    .order-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .order-date {
      color: #7f8c8d;
      font-size: 14px;
    }
    
    .order-status {
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
    }
    
    .status-Confirmée {
      background-color: #d4edda;
      color: #155724;
    }
    
    .status-En-cours {
      background-color: #fff3cd;
      color: #856404;
    }
    
    .status-Livrée {
      background-color: #d1ecf1;
      color: #0c5460;
    }
    
    .customer-section {
      margin-bottom: 30px;
    }
    
    .customer-section h2 {
      color: #2c3e50;
      margin-bottom: 15px;
      font-size: 20px;
    }
    
    .customer-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
    }
    
    .customer-details p {
      margin-bottom: 5px;
    }
    
    .shipping-address h3 {
      color: #34495e;
      margin-bottom: 10px;
      font-size: 16px;
    }
    
    .items-section {
      margin-bottom: 30px;
    }
    
    .items-section h2 {
      color: #2c3e50;
      margin-bottom: 15px;
      font-size: 20px;
    }
    
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    
    .items-table th,
    .items-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    .items-table th {
      background-color: #3498db;
      color: white;
      font-weight: bold;
    }
    
    .items-table tbody tr:hover {
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
      margin-bottom: 30px;
    }
    
    .totals {
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      min-width: 300px;
    }
    
    .total-line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 5px 0;
    }
    
    .total-final {
      border-top: 2px solid #3498db;
      padding-top: 10px;
      font-weight: bold;
      font-size: 18px;
      color: #2c3e50;
    }
    
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #bdc3c7;
      color: #7f8c8d;
      font-size: 14px;
    }
  `,
  sampleData: {
    orderNumber: 'ORD-2024-001',
    customerName: 'Marie Martin',
    customerEmail: 'marie.martin@example.com',
    customerPhone: '+33 1 23 45 67 89',
    orderDate: new Date(),
    status: 'Confirmée',
    shippingAddress: '456 Avenue des Champs, 75008 Paris',
    items: [
      { name: 'Laptop Dell XPS', quantity: 1, price: 1299.99, total: 1299.99 },
      { name: 'Souris sans fil', quantity: 1, price: 29.99, total: 29.99 },
      { name: 'Clavier mécanique', quantity: 1, price: 89.99, total: 89.99 }
    ],
    subtotal: 1419.97,
    tax: 283.99,
    total: 1703.96
  }
};