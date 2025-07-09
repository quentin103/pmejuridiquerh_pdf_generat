import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PdfOptionsDto } from './pdf-options.dto';
import { EnumTemplate } from '../templates/emu';

export class GeneratePdfDto {
  @ApiProperty({ 
    description: 'Nom du template à utiliser',
    example: 'user',
    enum: EnumTemplate
  })
  @IsString()
  templateName: string;

  @ApiProperty({ 
    description: 'Données à injecter dans le template',
    example: {
      name: 'John Doe',
      email: 'john@example.com',
      generatedAt: '2024-01-15T10:00:00Z'
    }
  })
  @IsObject()
  data: any;

  @ApiProperty({ 
    description: 'Options de génération PDF',
    type: PdfOptionsDto,
    required: false 
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PdfOptionsDto)
  options?: PdfOptionsDto;
}

export class DirectPdfGenerationDto {
  @ApiProperty({ 
    description: 'Données à injecter dans le template',
    example: {
      name: 'John Doe',
      email: 'john@example.com',
      generatedAt: '2024-01-15T10:00:00Z'
    }
  })
  @IsObject()
  data: any;

  @ApiProperty({ 
    description: 'Options de génération PDF',
    type: PdfOptionsDto,
    required: false 
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PdfOptionsDto)
  options?: PdfOptionsDto;
}