import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Vérification de l\'état de l\'API',
    description: 'Endpoint pour vérifier que l\'API fonctionne correctement'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'API fonctionnelle',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'PDF Generator API is running!' },
        timestamp: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
        uptime: { type: 'string', example: '2.5 minutes' },
        version: { type: 'string', example: '1.0.0' },
        availableTemplates: { 
          type: 'array',
          items: { type: 'string' },
          example: ['user', 'order', 'invoice', 'report']
        }
      }
    }
  })
  getHealth() {
    return this.appService.getHealth();
  }

  @Get('health')
  @ApiOperation({ 
    summary: 'Endpoint de santé détaillé',
    description: 'Informations détaillées sur l\'état de l\'API et des services'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Statut détaillé de l\'API'
  })
  getDetailedHealth() {
    return this.appService.getDetailedHealth();
  }
}