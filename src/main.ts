import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
const app = await NestFactory.create(AppModule);
  
  // CORS
  app.enableCors();
  
  // Validation globale
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('PDF Generator API')
    .setDescription('API pour génération dynamique de PDF avec templates Handlebars')
    .setVersion('1.0')
    .addTag('PDF Generation', 'Endpoints pour générer des PDFs')
    .addServer('http://localhost:3000', 'Serveur de développement')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
  console.log('📚 Swagger docs on http://localhost:3000/api');
}
bootstrap();
