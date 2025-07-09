import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Res,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiQuery,
  ApiBody,
  ApiConsumes,
  ApiProduces
} from '@nestjs/swagger';
import { GeneratePdfDto, DirectPdfGenerationDto } from './dto/generate-pdf.dto';
import { PdfOptionsDto } from './dto/pdf-options.dto';
import { EnumTemplate } from './templates/emu';

@ApiTags('PDF Generation')
@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('generate')
  @ApiOperation({ 
    summary: 'Générer un PDF avec un template et des données',
    description: 'Génère un PDF en utilisant un template spécifique et des données personnalisées'
  })
  @ApiBody({ 
    type: GeneratePdfDto,
    description: 'Données pour générer le PDF',
    examples: {
      user: {
        summary: 'Exemple pour template user',
        value: {
          templateName: 'user',
          data: {
            id: '123',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+33 1 23 45 67 89',
            address: '123 Rue de la Paix, Paris',
            generatedAt: '2024-01-15T10:00:00Z',
            profile: {
              age: 30,
              profession: 'Développeur',
              interests: ['Technologie', 'Voyage']
            }
          },
          options: {
            format: 'A4',
            orientation: 'portrait'
          }
        }
      },
      order: {
        summary: 'Exemple pour template order',
        value: {
          templateName: 'order',
          data: {
            orderNumber: 'ORD-2024-001',
            customerName: 'Jane Smith',
            customerEmail: 'jane@example.com',
            orderDate: '2024-01-15T10:00:00Z',
            status: 'Confirmée',
            items: [
              { name: 'Produit A', quantity: 2, price: 29.99, total: 59.98 }
            ],
            total: 59.98
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'PDF généré avec succès',
    content: { 
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Données invalides ou template non trouvé',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Template user not found' },
        error: { type: 'string', example: 'Bad Request' }
      }
    }
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/pdf')
  async generatePDF(
    @Body() generatePdfDto: GeneratePdfDto,
    @Res() res: Response,
  ) {
    try {
      const { templateName, data, options } = generatePdfDto;
      
      const pdfBuffer = await this.pdfService.generatePDF(
        templateName,
        data,
        options,
      );

      const filename = `${templateName}_${Date.now()}.pdf`;
      
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      });

      res.end(pdfBuffer);

    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('templates')
  @ApiOperation({ 
    summary: 'Lister tous les templates disponibles',
    description: 'Retourne la liste de tous les templates PDF disponibles avec leur nombre'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des templates disponibles',
    schema: {
      type: 'object',
      properties: {
        templates: {
          type: 'array',
          items: { type: 'string' },
          example: ['user', 'order', 'invoice', 'report']
        },
        count: {
          type: 'number',
          example: 4
        }
      }
    }
  })
  getAvailableTemplates() {
    return {
      templates: this.pdfService.getAvailableTemplates(),
      count: this.pdfService.getAvailableTemplates().length
    };
  }

  @Get('templates/:name')
  @ApiOperation({ 
    summary: 'Obtenir les informations d\'un template',
    description: 'Retourne les détails d\'un template spécifique avec ses données d\'exemple'
  })
  @ApiParam({ 
    name: 'name', 
    description: 'Nom du template',
    enum: EnumTemplate,
    example: 'user'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Informations du template',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'user' },
        description: { type: 'string', example: 'Template pour les profils utilisateur' },
        sampleData: { 
          type: 'object',
          description: 'Données d\'exemple pour ce template'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Template non trouvé',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Template user not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  getTemplateInfo(@Param('name') name: string) {
    const templateInfo = this.pdfService.getTemplateInfo(name);
    
    if (!templateInfo) {
      throw new HttpException(
        `Template '${name}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return templateInfo;
  }

  @Get('templates/:name/preview')
  @ApiOperation({ 
    summary: 'Prévisualiser un template avec ses données d\'exemple',
    description: 'Génère un PDF de prévisualisation en utilisant les données d\'exemple du template'
  })
  @ApiParam({ 
    name: 'name', 
    description: 'Nom du template',
    enum: EnumTemplate,
    example: 'user'
  })
  @ApiQuery({ 
    name: 'format', 
    required: false, 
    enum: ['A4', 'A3', 'Letter'],
    description: 'Format du PDF'
  })
  @ApiQuery({ 
    name: 'orientation', 
    required: false, 
    enum: ['portrait', 'landscape'],
    description: 'Orientation du PDF'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'PDF de prévisualisation généré',
    content: { 
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Template non trouvé'
  })
  @ApiProduces('application/pdf')
  async previewTemplate(
    @Res() res: Response,
    @Param('name') name: string,
    @Query('format') format?: 'A4' | 'A3' | 'Letter',
    @Query('orientation') orientation?: 'portrait' | 'landscape',
    
  ) {
    try {
      const template = this.pdfService.getTemplate(name);
      
      if (!template) {
        throw new HttpException(
          `Template '${name}' not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const options: PdfOptionsDto = {};
      if (format) options.format = format;
      if (orientation) options.orientation = orientation;

      const pdfBuffer = await this.pdfService.generatePDF(
        name,
        template.sampleData,
        options,
      );

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="preview_${name}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      });

      res.end(pdfBuffer);

    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':templateName')
  @ApiOperation({ 
    summary: 'Générer un PDF directement par nom de template',
    description: 'Génère un PDF en utilisant directement le nom du template dans l\'URL'
  })
  @ApiParam({ 
    name: 'templateName', 
    description: 'Nom du template',
    enum: EnumTemplate,
    example: 'user'
  })
  @ApiBody({ 
    type: DirectPdfGenerationDto,
    description: 'Données et options pour générer le PDF',
    examples: {
      user_data: {
        summary: 'Données pour template user',
        value: {
          data: {
            id: '123',
            name: 'John Doe',
            email: 'john@example.com',
            generatedAt: '2024-01-15T10:00:00Z'
          },
          options: {
            format: 'A4',
            orientation: 'portrait'
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'PDF généré avec succès',
    content: { 
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Données invalides ou template non trouvé'
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/pdf')
  async generatePdfByTemplate(
    @Param('templateName') templateName: string,
    @Body() requestBody: DirectPdfGenerationDto,
    @Res() res: Response,
  ) {
    try {
      const { data, options } = requestBody;
      
      const pdfBuffer = await this.pdfService.generatePDF(
        templateName,
        data,
        options,
      );

      const filename = `${templateName}_${Date.now()}.pdf`;
      
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      });

      res.end(pdfBuffer);

    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}