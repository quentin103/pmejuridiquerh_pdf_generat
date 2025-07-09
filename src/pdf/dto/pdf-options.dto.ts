import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsObject, IsIn } from 'class-validator';

export class PdfOptionsDto {
  @ApiProperty({ 
    enum: ['A4', 'A3', 'Letter'], 
    default: 'A4',
    required: false 
  })
  @IsOptional()
  @IsIn(['A4', 'A3', 'Letter'])
  format?: 'A4' | 'A3' | 'Letter';

  @ApiProperty({ 
    enum: ['portrait', 'landscape'], 
    default: 'portrait',
    required: false 
  })
  @IsOptional()
  @IsIn(['portrait', 'landscape'])
  orientation?: 'portrait' | 'landscape';

  @ApiProperty({ 
    description: 'Marges du document',
    example: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
    required: false 
  })
  @IsOptional()
  @IsObject()
  margins?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };

  @ApiProperty({ 
    description: 'Afficher en-tête et pied de page',
    default: false,
    required: false 
  })
  @IsOptional()
  @IsBoolean()
  displayHeaderFooter?: boolean;

  @ApiProperty({ 
    description: 'Template HTML pour l\'en-tête',
    required: false 
  })
  @IsOptional()
  @IsString()
  headerTemplate?: string;

  @ApiProperty({ 
    description: 'Template HTML pour le pied de page',
    required: false 
  })
  @IsOptional()
  @IsString()
  footerTemplate?: string;
}