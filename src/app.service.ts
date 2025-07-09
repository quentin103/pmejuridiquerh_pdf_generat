import { Injectable } from '@nestjs/common';
import { PdfService } from './pdf/pdf.service';

@Injectable()
export class AppService {
  private readonly startTime = Date.now();

  constructor(private readonly pdfService: PdfService) {}

  getHealth() {
    const uptime = Date.now() - this.startTime;
    const uptimeMinutes = Math.floor(uptime / 60000);
    const uptimeSeconds = Math.floor((uptime % 60000) / 1000);
    
    return {
      message: 'PDF Generator API is running!',
      timestamp: new Date().toISOString(),
      uptime: `${uptimeMinutes}m ${uptimeSeconds}s`,
      version: '1.0.0',
      availableTemplates: ['user', 'order', 'invoice', 'report']
    };
  }

  async getDetailedHealth() {
    const uptime = Date.now() - this.startTime;
    const uptimeMinutes = Math.floor(uptime / 60000);
    const uptimeSeconds = Math.floor((uptime % 60000) / 1000);
    
    // Vérifier l'état du service PDF
    const pdfHealth = await this.pdfService.getServiceHealth();
    
    return {
      status: pdfHealth.status,
      timestamp: new Date().toISOString(),
      uptime: {
        ms: uptime,
        formatted: `${uptimeMinutes}m ${uptimeSeconds}s`
      },
      version: '1.0.0',
      services: {
        puppeteer: pdfHealth.browser ? 'active' : 'inactive',
        handlebars: 'active',
        templates: `loaded (${pdfHealth.templatesCount})`
      },
      templates: {
        available: ['user', 'order', 'invoice', 'report'],
        count: pdfHealth.templatesCount
      },
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        unit: 'MB'
      },
      pdf: pdfHealth
    };
  }
}