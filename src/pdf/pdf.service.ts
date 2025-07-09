import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as Handlebars from 'handlebars';
import { PdfTemplate, PdfOptions } from './interfaces/pdf-template.interface';
import { HandlebarsHelpers } from './utils/handlebars-helpers';
import { allPdfTemplate } from './templates/allpdf-template';

@Injectable()
export class PdfService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PdfService.name);
  private browser: puppeteer.Browser;
  private templates: Map<string, PdfTemplate> = new Map();

  async onModuleInit() {
    try {
      // Initialiser Puppeteer avec la nouvelle configuration
      this.browser = await puppeteer.launch({
        headless: "new", // Utiliser le nouveau mode headless
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
          '--disable-features=TranslateUI',
          '--disable-ipc-flooding-protection',
          '--memory-pressure-off',
          '--max_old_space_size=4096',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
        ],
        timeout: 60000, // 60 secondes timeout
      });

      this.logger.log('✅ Puppeteer browser initialized successfully');

      // Enregistrer les helpers Handlebars
      HandlebarsHelpers.register();
      this.logger.log('✅ Handlebars helpers registered');

      // Charger les templates
      this.loadTemplates();

      this.logger.log('✅ PDF Service initialized successfully');

    } catch (error) {
      this.logger.error('❌ Failed to initialize PDF Service:', error.message);

      // Afficher des instructions d'aide
      this.logger.error('🔧 To fix this issue, run:');
      this.logger.error('   npm run install-chrome');
      this.logger.error('   or');
      this.logger.error('   npx puppeteer browsers install chrome');

      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      if (this.browser) {
        await this.browser.close();
        this.logger.log('✅ Puppeteer browser closed');
      }
    } catch (error) {
      this.logger.error('❌ Error closing browser:', error.message);
    }
  }

  private loadTemplates() {
    try {
      // Charger les templates par défaut
      const defaultTemplates = allPdfTemplate

      defaultTemplates.forEach(template => {
        this.templates.set(template.name, template);
      });

      this.logger.log(`📄 Loaded ${this.templates.size} templates: ${Array.from(this.templates.keys()).join(', ')}`);
    } catch (error) {
      this.logger.error('❌ Error loading templates:', error.message);
      throw error;
    }
  }

  async generatePDF(
    templateName: string,
    data: any,
    options: PdfOptions = {}
  ): Promise<Buffer> {
    const startTime = Date.now();

    try {
      // Vérifier si le navigateur est disponible
      if (!this.browser) {
        throw new Error('Browser not initialized. Please restart the application.');
      }

      // Récupérer le template
      const template = this.templates.get(templateName);
      if (!template) {
        throw new Error(`Template '${templateName}' not found. Available templates: ${Array.from(this.templates.keys()).join(', ')}`);
      }

      // Fusionner les options
      const mergedOptions = { ...template.options, ...options };

      // Construire le HTML complet
      const fullHtml = this.buildFullHtml(template.htmlContent, template.cssContent);

      // Compiler le template avec Handlebars
      const compiledTemplate = Handlebars.compile(fullHtml);
      const html = compiledTemplate(data);

      // Créer une nouvelle page
      const page = await this.browser.newPage();

      try {
        // Optimiser la page pour la génération PDF
        await page.setDefaultNavigationTimeout(30000);
        await page.setDefaultTimeout(30000);

        // Définir la taille de la viewport
        await page.setViewport({
          width: 1200,
          height: 800,
          deviceScaleFactor: 1,
        });

        // Définir le contenu HTML
        await page.setContent(html, {
          waitUntil: 'networkidle0',
          timeout: 30000
        });

        // Attendre que toutes les ressources soient chargées
        await page.evaluateHandle('document.fonts.ready');

        // Options PDF
        const pdfOptions: puppeteer.PDFOptions = {
          format: mergedOptions.format || 'A4',
          landscape: mergedOptions.orientation === 'landscape',
          margin: mergedOptions.margins || {
            top: '20px',
            right: '20px',
            bottom: '20px',
            left: '20px',
          },
          printBackground: true,
          preferCSSPageSize: true,
          displayHeaderFooter: mergedOptions.displayHeaderFooter || false,
          headerTemplate: mergedOptions.headerTemplate || '',
          footerTemplate: mergedOptions.footerTemplate || '',
          timeout: 30000,
        };

        // Générer le PDF
        const pdfBuffer = await page.pdf(pdfOptions);

        const duration = Date.now() - startTime;
        this.logger.log(`✅ PDF generated successfully for template '${templateName}' in ${duration}ms`);

        return pdfBuffer;

      } finally {
        // Fermer la page
        await page.close();
      }

    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(`❌ Error generating PDF for template '${templateName}' after ${duration}ms:`, error.message);
      throw new Error(`Erreur lors de la génération du PDF: ${error.message}`);
    }
  }

  private buildFullHtml(htmlContent: string, cssContent: string): string {
    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document PDF</title>
        <style>
          ${cssContent}
          
          /* Styles de base pour PDF */
          * {
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            color: #333;
            background-color: #fff;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          .page-break {
            page-break-after: always;
          }
          
          .no-print {
            display: none !important;
          }
          
          /* Améliorer le rendu des tableaux */
          table {
            border-collapse: collapse;
            width: 100%;
          }
          
          /* Éviter les coupures de page dans les éléments */
          .metric-card, .section {
            page-break-inside: avoid;
          }
          
          @page {
            margin: 0;
          }
          
          @media print {
            .page-break {
              page-break-after: always;
            }
            
            .no-print {
              display: none !important;
            }
            
            body {
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;
  }

  // Méthodes utilitaires
  getAvailableTemplates(): string[] {
    return Array.from(this.templates.keys());
  }

  getTemplate(name: string): PdfTemplate | undefined {
    return this.templates.get(name);
  }

  getTemplateInfo(name: string): { name: string; description: string; sampleData: any } | undefined {
    const template = this.templates.get(name);
    if (!template) return undefined;

    return {
      name: template.name,
      description: template.description,
      sampleData: template.sampleData
    };
  }

  addCustomTemplate(template: PdfTemplate): void {
    this.templates.set(template.name, template);
    this.logger.log(`📄 Added custom template: ${template.name}`);
  }

  removeTemplate(name: string): boolean {
    const removed = this.templates.delete(name);
    if (removed) {
      this.logger.log(`🗑️ Removed template: ${name}`);
    }
    return removed;
  }

  // Méthode pour vérifier l'état du service
  async getServiceHealth(): Promise<{
    status: 'healthy' | 'unhealthy';
    browser: boolean;
    templatesCount: number;
    error?: string;
  }> {
    try {
      const isBrowserConnected = this.browser && this.browser.isConnected();

      return {
        status: isBrowserConnected ? 'healthy' : 'unhealthy',
        browser: isBrowserConnected,
        templatesCount: this.templates.size,
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        browser: false,
        templatesCount: this.templates.size,
        error: error.message,
      };
    }
  }
}