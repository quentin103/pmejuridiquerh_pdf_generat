import { PdfTemplate } from '../interfaces/pdf-template.interface';

export const userTemplate: PdfTemplate = {
  name: 'user',
  description: 'Template pour les profils utilisateur',
  htmlContent: `
    <div class="document">
      <div class="header">
        <h1>Profil Utilisateur</h1>
        <div class="date">Généré le {{formatDate generatedAt 'long'}}</div>
      </div>
      
      <div class="content">
        <div class="section">
          <h2>Informations personnelles</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">ID:</span>
              <span class="value">{{id}}</span>
            </div>
            <div class="info-item">
              <span class="label">Nom:</span>
              <span class="value">{{name}}</span>
            </div>
            <div class="info-item">
              <span class="label">Email:</span>
              <span class="value">{{email}}</span>
            </div>
            {{#if phone}}
            <div class="info-item">
              <span class="label">Téléphone:</span>
              <span class="value">{{phone}}</span>
            </div>
            {{/if}}
            {{#if address}}
            <div class="info-item">
              <span class="label">Adresse:</span>
              <span class="value">{{address}}</span>
            </div>
            {{/if}}
          </div>
        </div>
        
        {{#if profile}}
        <div class="section">
          <h2>Profil</h2>
          <div class="profile-content">
            {{#if profile.age}}
            <p><strong>Âge:</strong> {{profile.age}} ans</p>
            {{/if}}
            {{#if profile.profession}}
            <p><strong>Profession:</strong> {{profile.profession}}</p>
            {{/if}}
            {{#if profile.interests}}
            <p><strong>Centres d'intérêt:</strong></p>
            <ul class="interests">
              {{#each profile.interests}}
              <li>{{this}}</li>
              {{/each}}
            </ul>
            {{/if}}
          </div>
        </div>
        {{/if}}
      </div>
      
      <div class="footer">
        <p>Document généré automatiquement</p>
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
      background-color: #fff;
    }
    
    .document {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
    }
    
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid #3498db;
    }
    
    .header h1 {
      color: #2c3e50;
      font-size: 32px;
      margin-bottom: 10px;
    }
    
    .date {
      color: #7f8c8d;
      font-size: 14px;
    }
    
    .section {
      margin-bottom: 30px;
      padding: 20px;
      background-color: #f8f9fa;
      border-radius: 8px;
    }
    
    .section h2 {
      color: #2c3e50;
      margin-bottom: 15px;
      font-size: 20px;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    
    .info-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    
    .label {
      font-weight: bold;
      color: #34495e;
      font-size: 14px;
    }
    
    .value {
      color: #2c3e50;
      font-size: 16px;
    }
    
    .profile-content p {
      margin-bottom: 10px;
    }
    
    .interests {
      list-style: none;
      padding-left: 0;
    }
    
    .interests li {
      padding: 5px 0;
      padding-left: 20px;
      position: relative;
    }
    
    .interests li:before {
      content: "•";
      color: #3498db;
      position: absolute;
      left: 0;
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
    }
  `,
  sampleData: {
    id: 'user_123',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de la Paix, 75001 Paris',
    generatedAt: new Date(),
    profile: {
      age: 35,
      profession: 'Développeur Full Stack',
      interests: ['Programmation', 'Voyage', 'Photographie']
    }
  }
};